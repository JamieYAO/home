/*
@flow
*/

'use-strict';

const React = require('react');
const Component = React.Component;

// Refrence https://docs.wilddog.com/quickstart/auth/web.html
// Wilddog auth sys
var config = {
  authDomain: "wild-boar-92305.wilddog.com",
  syncURL: "https://wild-boar-92305.wilddogio.com"
};
wilddog.initializeApp(config);
var rootRef = wilddog.sync().ref();
var ref = wilddog.sync().ref('/article');


/*
wilddog.auth().createUserWithEmailAndPassword(email,pwd)
	.then(function (user) {
    console.info("user created.", user);
	}).catch(function (err) {
    console.info("create user failed.", err);
});
*/

//ref.child('test_sync').set("hello world");
var g_target;
var AddWrapper = React.createClass({
  getInitialState: function() {
    return {
      isShowInput: false,
      opacity: 1.0
    };
  },
  componentDidMount: function() {},
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
      loaded: false,
      left: '500'
    };
  },
  componentDidMount() {
    const timer = setInterval(function() {
      let left = this.state.left;
      left -= 35;
      this.setState({
        left: left
      })
      if (left < 0) {
        this.setState({
          left: '0'
        })
        clearInterval(timer)
      }
    }.bind(this), 10)

	const sceneRef = this;
	wilddog.auth().onAuthStateChanged(function (userInfo) {
	    if(userInfo) {
		    console.info('user login',userInfo, wilddog.auth().currrentUser);
		sceneRef.fetchData();
	    }else {
		    console.info('user logout');
		sceneRef.setState({
			data: null,
			loaded: false
			});
	    }
	});
  },
  fetchData: function() {
    ref.orderByChild('time').on("value", function(snapshot) {
      this.setState({
        data: snapshot.val(),
        loaded: true
      })
    }.bind(this))
  },
  onKeyDown: function(e) {
	const email = '272915189@qq.com';
	const pwd = e.target.value;
	console.log('pwd: ' + pwd)
	console.log('email: ' + email)
	wilddog.auth().signInWithEmailAndPassword(email, pwd)
	    .then(function () {
		console.info("login success, currentUser->",  wilddog.auth().currentUser);
		this.fetchData();
	    }).catch(function (err) {
		console.info('login failed ->',err);
	    });
  },
  onLogoutBtnClicked: function(e) {
	const sceneRef = this;
	wilddog.auth().signOut().then(function () {
	    console.info("user sign out.");
		sceneRef.setState({
			data: null,
			loaded: false
			});
	});
  },
  render: function() {

    if (!this.state.loaded) {
      return (
		<div>
			<div>
				<input onKeyDown={(e) => {if (e.keyCode == 13) this.onKeyDown(e)}}/>
			</div>
		</div>
      );
    }

    var rows = [];

    for (var k in this.state.data) {
      rows.unshift(
        <Article
        data={this.state.data[k]}
        id_key={k}
        key={k}
        />
      );
    }

    return (
	<div  style={{
        transition: 'all 1s',
        position: 'relative',
        left: this.state.left + 'px'
      	}}>
		<button onClick={this.onLogoutBtnClicked}>Logout</button>
		{rows}
		<AddWrapper />
	</div>
    )
  }
});

class ArticleScene extends Component {

	state: {
    key: String
	}

	constructor(props) {
		super(props);
		this.state = {
      key: null
		};
	}

	render() {
		return (
      <div>
        <ArticleWrapper />
      </div>
    );
	}
}

export default ArticleScene;
