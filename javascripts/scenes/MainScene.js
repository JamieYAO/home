/*
@flow
*/

'use-strict';

const React = require('react');
const Component = React.Component;

import MarkdownEditor from "../widget/MarkdownEditor";
import NoteScene from "./NoteScene";
import ArticleScene from "./ArticleScene";

var Main = React.createClass({
  getInitialState() {
    return {
      left: '500',
    };
  },
  componentDidMount() {
    const timer = setInterval(function() {
      let left = this.state.left;
      left -= 55;
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
  },
  render: function() {
    return (<div className='note-wrapper' style={{
        transition: 'all 1s',
        position: 'relative',
        left: this.state.left + 'px'
      }}><h1>Main</h1></div>)
  }
})

var SelectBar = React.createClass({
  getInitialState: function() {
    return {
      data: {},
      loaded: false,
      page: 'Main',
    };
  },
  componentDidMount() {
    this.setState({
      loaded: true
    })
  },
  selectBarClick(selector: string) {
    this.setState({
      page: selector
    })
  },
  render: function() {

    if (!this.state.loaded) {
      return (<h1 className='loading-hint'>Loading</h1>)
    }

    let pageComponent;
    let page = this.state.page;
    switch (page) {
      case 'Main':
        pageComponent = <Main/>
        break;
      case 'Note':
        pageComponent = <NoteScene/>
        break;
      case 'ArticleWrapper':
        pageComponent = <ArticleScene/>
        break;
    }

    return (	<div className='wrapper' style={{
        overflow: 'hidden'
      }}>
			<button onClick={() => this.selectBarClick('Main')}>Main</button>
			<button onClick={() => this.selectBarClick('Note')}>Note</button>
			<button onClick={() => this.selectBarClick('ArticleWrapper')}>Article</button>
			{pageComponent}
		</div>
    )
  }
});

class MainScene extends Component {

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
        <SelectBar />
        <MarkdownEditor
          shouldDisable={() => {return false;} }
          useExplicitPreviewButton={true}
        />
      </div>
    );
	}
}

export default MainScene;
