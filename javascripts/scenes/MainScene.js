/*
@flow
*/

'use-strict';

const React = require('react');
const Component = React.Component;

import MarkdownEditor from "../widget/MarkdownEditor";
import NoteScene from "./NoteScene";
import ArticleScene from "./ArticleScene";
import SideBar from "../widget/SideBar";
import constants from "../widget/constants";

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

class MainScene extends Component {

	state: {
    page: String,
	}

	constructor(props) {
		super(props);
		this.state = {
      page: constants.PAGES.MAIN,
		};
	}

  selectBarClick(selector: string) {
    this.setState({
      page: selector
    })
  }

	render() {
    const selectArry =
            [
              {
                key: constants.PAGES.MAIN,
                func: () => {this.selectBarClick(constants.PAGES.MAIN)}
              },
              {
                key: constants.PAGES.NOTE,
                func: () => {this.selectBarClick(constants.PAGES.NOTE)}
              },
              {
                key: constants.PAGES.ARTICLE,
                func: () => {this.selectBarClick(constants.PAGES.ARTICLE)}
              }
            ]
    let pageComponent;
    let page = this.state.page;
    switch (page) {
      case constants.PAGES.MAIN:
        pageComponent = <Main/>
        break;
      case constants.PAGES.NOTE:
        pageComponent = <NoteScene/>
        break;
      case constants.PAGES.ARTICLE:
        pageComponent = <ArticleScene/>
        break;
    }
		return (
      <div>
        <SideBar
          selectArry={selectArry}
        />
        {pageComponent}
        <MarkdownEditor
          shouldDisable={() => {return false;} }
          useExplicitPreviewButton={true}
        />
      </div>
    );
	}
}

export default MainScene;
