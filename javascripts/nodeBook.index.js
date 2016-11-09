/*
@flow
*/

'use-strict';

import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';

import {MainScene} from './scenes';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
      <MainScene />
    );
	}
}

ReactDOM.render(<App/>, document.getElementById('main_content'));
