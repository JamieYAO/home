/*
@flow
*/

'use-strict';

const React = require('react');
const Component = React.Component;

const Remarkable = require('remarkable');

class MarkdownEditor extends Component {
	static propTypes: {
		shouldDisable: React.PropTypes.func.isRequired,
		useExplicitPreviewButton: React.PropTypes.boolean,
	}

	_md: any
	_inputRef: Component
	_previewRef: Component
	
	state: {
		cachedContent: React.PropTypes.string.isRequired
	}

	constructor(props) {
		super(props);
 		this._md = new Remarkable();
		this._inputRef = null;
		this._previewRef = null;
		this.state = {
			cachedContent: ''
		};
	} 

	getRawMarkup() {
		const widgetRef = this;
    return { __html: widgetRef._md.render(widgetRef.state.cachedContent) };
  }

	render() {
		const widgetRef = this;
		const input = (
			<textarea
			style={{
				width: 256,
				height: 256,
				overflowY: 'auto',
			}}
			ref={ function(c) {
				if (undefined === c || null === c) return;
				widgetRef._inputRef = c;
			}}
			disabled={widgetRef.props.shouldDisable()}
			value={widgetRef.state.cachedContent}
			onChange={ (evt) => {
				widgetRef.setState({
					cachedContent: evt.target.value
				});
			}}
			/>
		);

		const preview = (
			<div
			style={{
				width: 256,
				height: 256,
				overflowY: 'auto',
			}}
			dangerouslySetInnerHTML={widgetRef.getRawMarkup()}
			ref={ function(c) {
				if (undefined === c || null === c) return;
				widgetRef._previewRef = c;
			}}>
			</div>
		);

		const container = (
			<div>
				{input}
				{preview}
			</div>
		);

		return container;
	}
}

export default MarkdownEditor;
