var CandidatesBox = React.createClass({displayName: "CandidatesBox",
		render: function() {
			return (
				React.createElement('div', {className: "CandidatesBox"}, null,
			  		React.createElement('div', null, '123test')
				)
			);
		}
	})

var HomeBox = React.createClass({displayName: "HomeBox",
		render: function() {
			return (
				React.createElement('div', {className: "HomeBox"}, null,
			  		React.createElement('button', {className: "addBtn", onClick: this.handleClick}, "Add"),
					React.createElement('h1', {className: "userName"}, "UserName"),
					React.createElement('button', {className: "logoutBtn", onClick: this.logoutClick}, "Logout"),
					React.createElement(CandidatesBox, null)
				)
			);
		}
	})


function renderHomePage() {
	ReactDOM.render(
		React.createElement(HomeBox, null),
		document.getElementById('content')
	)
}