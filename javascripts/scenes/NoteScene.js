/*
@flow
*/

'use-strict';

const React = require('react');
const Component = React.Component;

class NoteScene extends Component {

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
        Note
      </div>
    );
	}
}

export default NoteScene;
