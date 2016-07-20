  var ref = new Wilddog("https://wild-boar-92305.wilddogio.com/article");
  //ref.child('test_sync').set("hello world");


  var wrapper = $("#main_content");
  function onValue() {
	ref.on("value", function(snapshot) {
	    var article = snapshot.val();
	    for (var k in article) {
		  var title = $('<p>', {
				'class': 'single-content-title'
		  }).appendTo(wrapper);
		title.text(article[k].title);
		  var time = $('<p>', {
				'class': 'single-content-time'
		  }).appendTo(wrapper);
		time.text(article[k].time);
		  var content = $('<div>', {
				'class': 'single-content'
		  }).appendTo(wrapper);
		content.text(article[k].content);
	    }
	});
  }

var addBtn = $('#add-btn');
addBtn.on('click', function(){

	$('#input-wrapper').toggle();
	/*
	ref.push({
		'title': '++++++++',
		'time': '2016-07-19',
		'content': '++_+_+_+_+_+_+_+_+!!!!'
	})
	*/
});

$(document).ready(function() {
	onValue();
})

var Article = React.createClass({
	render: function() {
		return <div class="single-content">
				<p>{this.props.title}</p>
			</div>
	}
});

var HelloMessage = React.createClass({
	getInitialState: function() {
		return {
			data: {}
		};
	},
	componentDidMount() {
		this.fetchData();
	},
	fetchData: function() {
		ref.on("value", function(snapshot) {
			this.setState({
				data: snapshot.val()
			})
		}.bind(this))		
	},
	render: function() {
		var rows = [];

/*
		for(var k in this.state.data) {
			rows.push(React.createElement(Article, {articles : this.state.data[k]}));
		}
*/
		if (!!this.state.data) {
		console.log(this.state.data);
			var commentNodes = this.state.data.map(function (comment) {
					return (
						<Comment author={comment.title}>
						{comment.content}
						</Comment>
					       );
					});
		}
		
		return <div>
			{commentNodes}
			</div>;
	}
});
ReactDOM.render(
	<HelloMessage name="John" />,
	document.getElementById('example')
);

