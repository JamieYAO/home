/*
@flow
*/

'use-strict';

const React = require('react');
const Component = React.Component;

class SideBar extends Component {
  _sideBarRef: Component
	state: {
    show: Boolean,
    key: String
	}
  styles: Object

	constructor(props) {
		super(props);
    this._sideBarRef = null;
		this.state = {
      show: false,
      key: null
		};
    this.styles = {
      sideBarWrapper: {
      },
      btn: {
        position: "absolute",
        right: "-30px",
      },
      logo: {

      }
    }
	}

  hideOrShowBar(cb?: func) {
    if (!cb) {
      return this.setState({
                show: !this.state.show
              })
    };
    this.setState({
      show: !this.state.show
    }, function(cb) {
      return cb();
    })
  }

  onContleClicked() {
    this.hideOrShowBar()
  }

	render() {
    let selectList = [];
    const widgetRef = this;
    if (this.props.selectArry != "") {
      this.props.selectArry.map(function(singleSelect) {
        const singleRow = (
          <button
            style={{
              display: "block"
            }}
            key={singleSelect.key}
            onClick={(e) => {widgetRef.hideOrShowBar(singleSelect.func())}}
          >
            {singleSelect.key}
          </button>
        )
        selectList.push(singleRow);
      })
    }
		return (
      <div
        ref={ (c) => {this._sideBarRef = c}}
        style={{
          width: "135px",
          position: "fixed",
          left: (this.state.show ? "0px" : "-135px"),
          top: 0,
          bottom: 0,
          transition: "1s",
          zIndex: "999",
          background: "burlywood"
        }}
      >
        <button
          style={this.styles.btn}
          onClick={ (e) => { this.onContleClicked() }}
        >
          Contle
        </button>
        <div style={this.styles.sideBarMainWrapper}>
          <div style={this.styles.logo}>
            <img src="./favicon.ico" />
          </div>
          <div>
            {selectList}
          </div>
        </div>
      </div>
    );
	}
}

export default SideBar;
