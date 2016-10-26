function getMongoDbServerEndPoint() {
  return 'mongodb://localhost:27017/';
}

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const dbname = 'rrate';
const mongodUrl = getMongoDbServerEndPoint() + dbname;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function  guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

MongoClient.connect(mongodUrl, function(err, db) {
  const idSt = 1001, idEd = 2000;
  for (let idToInsert = idSt; idToInsert < idEd; ++idToInsert) {
    const randRate = getRandomInt(1, 5);
    const title = guid();

    const onExecuted = function(err, result) {
      if (err) {
        console.log(err);
        return;
      }
      console.dir(result);
    };

    db.collection('item').insert({
      id: idToInsert,
      rate: randRate,
      title: title
    }, onExecuted);
  }
});
