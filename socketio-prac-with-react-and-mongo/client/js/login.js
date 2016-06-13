var LoginBox = React.createClass({displayName: 'LoginBox',
  handleClick: function(event) {
  	console.log('clicked');
  	var socket = io({query:"token=" + this.refs.loginText.value});
  	socket.on('checkToken', function(result){
	  	console.log(result);
	  	if (result) {
	    	renderHomePage();
		} else {
			socket = null;
		}
  	});
  },
  render: function() {
    return (
    	React.createElement('div', {className: "loginBox"}, null,
      		React.createElement('input', {className: "loginInput", ref: "loginText"}),
			React.createElement('button', {className: "loginBtn", onClick: this.handleClick}, "login")
    	)
    );
  }
});

ReactDOM.render(
  React.createElement(LoginBox, null),
  document.getElementById('content')
);
