/*
@flow
*/

'use-strict';

const React = require('react');
const Component = React.Component;

class SideBar extends Component {
  _sideBarRef: Component
  static propTypes: {
    shouldShow: React.propTypes.func.isRequired,
    key: String
  }
  styles: Object

	constructor(props) {
		super(props);
    this._sideBarRef = null;
    this.styles = {
      sideBarWrapper: {
          width: "155px",
          position: "fixed",
          top: 0,
          bottom: 0,
          transition: "600ms cubic-bezier(0, 0.18, 0, 1.47)",
          zIndex: "999",
          background: "burlywood",
          textAlign: "center"
      },
      btn: {
        position: "absolute",
        right: "-30px",
      },
      logo: {

      }
    }
	}

	render() {
    const widgetRef = this;
    const {shouldShow, toggleSidebar, selectArry} = widgetRef.props;
    
    let selectList = [];
    if (selectArry != "") {
      selectArry.map(function(singleSelect) {
        const singleRow = (
            <div
            key={singleSelect.key}
            >
          <button
            style={{
              display: "inline-block"
            }}
            onClick={(e) => singleSelect.func()}
          >
            {singleSelect.key}
          </button>
          </div>
        )
        selectList.push(singleRow);
      })
    }
		return (
      <div
        ref={ (c) => {widgetRef._sideBarRef = c}}
        style={
          Object.assign({ left: (shouldShow ? "-20px" : "-155px") }, widgetRef.styles.sideBarWrapper)
        }
      >
        <button
          style={widgetRef.styles.btn}
          onClick={ (e) => { toggleSidebar() }}
        >
          Contle
        </button>
        <div style={widgetRef.styles.sideBarMainWrapper}>
          <div style={widgetRef.styles.logo}>
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
