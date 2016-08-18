import React, { Component } from 'react';
import ReactDOM from 'react-dom';

var ref = new Wilddog("https://wild-boar-92305.wilddogio.com/article");
//ref.child('test_sync').set("hello world");
var g_target;

var AddWrapper = React.createClass({
  getInitialState: function() {
    return {
      isShowInput: false,
      opacity: 1.0
    };
  },
  componentDidMount: function() {
    var timer = function() {
      this.timer = setInterval(function() {
        var opacity = this.state.opacity;
        opacity -= .1;
        if (opacity < 0.1) {
          clearInterval(this.timer)
          timerUp();
        }
        this.setState({
          opacity: opacity
        });
      }.bind(this), 100);
    }.bind(this)
    var timerUp = function() {
      this.timerUp = setInterval(function() {
        var opacity = this.state.opacity;
        opacity += .1;
        if (opacity > 1.0) {
          clearInterval(this.timerUp)
          timer();
        }
        this.setState({
          opacity: opacity
        });
      }.bind(this), 100);
    }.bind(this)
    timer();
  },
  handlerAdd: function(e) {
    this.setState({
      isShowInput: !this.state.isShowInput
    })
  },
  handlerComfirm: function(e) {
    var currentTime = new Date().toLocaleString();
    var title = this.refs.title.value;
    var content = this.refs.content.value;
    ref.push({
      'title': title,
      'time': currentTime,
      'content': content
    });
    this.refs.title.value = "";
    this.refs.content.value = "";
    this.handlerAdd();
  },
  render: function() {
    var display;
    if (this.state.isShowInput) {
      display = "block"
    } else {
      display = "none"
    }
    return (
	<div id="add">
		<button id="add-btn" onClick={this.handlerAdd} style={{
			float: 'right',
			opacity: this.state.opacity
		      }}>ADD</button>
					<div id="input-wrapper" className={display}>
						<input id="title" placeholder="title" ref="title"></input>
						<textarea id="content" placeholder="content" ref="content"></textarea>
						<button id="add-btn" onClick={this.handlerComfirm}>Comfirm</button>
					</div>
				</div>
	)
  }
});

var Article = React.createClass({
  handlerRemove: function(e) {
    console.log(this.props.id_key);
    var url = "https://wild-boar-92305.wilddogio.com/article/" + this.props.id_key;
    console.log(url);
    var refRemove = new Wilddog(url);
    refRemove.set(null);
  },
  render: function() {
    return (<div className="single-content">
					<p>{this.props.data.title}</p>
					<p>{this.props.data.time}</p>
					<p>{this.props.data.content}</p>
					<button onClick={this.handlerRemove}> X </button>
				</div>
	)
  }
});

var ArticleWrapper = React.createClass({
  getInitialState: function() {
    return {
      data: {},
      loaded: false
    };
  },
  componentDidMount() {
    this.fetchData();
  },
  fetchData: function() {
    ref.orderByChild('time').on("value", function(snapshot) {
      this.setState({
        data: snapshot.val(),
        loaded: true
      })
    }.bind(this))
  },
  render: function() {

    if (!this.state.loaded) {
      return (
      React.createElement('h1', {
        className: "loading-hint"
      }, 'Loading ...')
      );
    }

    var rows = [];

    for (var k in this.state.data) {
      rows.push(React.createElement(Article, {
        data: this.state.data[k],
        id_key: k
      }));
    }


    return (<div>
					{rows}
					<AddWrapper />
				</div>
	)
  }
});

function main() {
	ReactDOM.render(
	  <ArticleWrapper />,
	  document.getElementById('main_content')
	);
}

main();
