import './style.scss'
import React from 'react'
import ContainerRouter from 'Components/ContainerRouter/ContainerRouter'
import Login from 'Components/Login/Login'
import SiderMenu from 'Components/SiderMenu/SiderMenu'

export default class Index extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  componentWillMount() {
    this.context.actions.user.getInfo();
  }
  render() {
    var container;
    let isLogin = false;
    if (!this.props.User.hasRequest) {
      container = <div></div>;
    } else if (this.props.User.isLogin) {
      container = <div className="index-container">
        <div className="sidermenu">
          <SiderMenu
            current={this.props.Navigator.current}
            list={this.props.Navigator.list}
          ></SiderMenu>
        </div>
        <ContainerRouter {...this.props}></ContainerRouter>
      </div>
    } else {
      container = <Login>Loading...</Login>
    }
    return container;
  }
}
Index.contextTypes = {
  actions: React.PropTypes.object
};
