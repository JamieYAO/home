var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var dbname = 'test';
var mongodUrl = 'mongodb://localhost:27017/' + dbname;

var connectionToPlayerIdDict = {};

app.use(express.static('client'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/html/main.html');
});

io.on('connection', function(sk) {
  var uponPlayerIdFound = function(playerId) {
    // socket id reference https://github.com/socketio/socket.io/blob/master/lib/socket.js
    connectionToPlayerIdDict[sk.id] = playerId; // cache the connection
    sk.on('create', function(msg) {
      var echo = {
        'player_id': playerId,
        'msg': msg
      };
      io.emit('echo', echo);
    });
  };

  var authenticated = function(result) {
    io.emit('checkToken', result)
  }

  var findLoggedInPlayer = function(db, token, cb) {
    db.collection('login').findOne({
      'token': token
    }, function(err, doc) {
      console.dir(doc)
      if (doc != null && doc.player_id != undefined && doc.player_id != null) {
        authenticated(true);
        cb(doc.player_id);
        db.close(); // TODO: don't always close the connection 
      } else {
        // reference https://github.com/socketio/socket.io/blob/master/lib/socket.js, "Socket.prototype.disconnect"
        console.log("Token " + token + " not authenticated, about to disconnect.");
        authenticated(false);
        sk.disconnect(true);
        db.close();
      }
    });
  };

  // authentication
  var token = sk.handshake.query.token;
  MongoClient.connect(mongodUrl, function(err, db) {
    assert.equal(null, err);
    findLoggedInPlayer(db, token, uponPlayerIdFound);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
