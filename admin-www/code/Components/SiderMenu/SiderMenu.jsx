import './style.scss'
import React from 'react'
import {Nav, Navbar, NavItem} from 'react-bootstrap'

export default class SiderMenu extends React.Component {
  render() {
    let navItmes = this.props.list.map((item, key) => {
      return <NavItem
        key={key}
        href={`#/${item.id}`}
        active={item.id===this.props.current}
      >{item.name}</NavItem>
    });
    return <div className="ComponentsSiderMenu">
      <Navbar>
        <Nav>
          {navItmes}
        </Nav>
      </Navbar>
    </div>
  }
}
SiderMenu.contextTypes = {
  actions: React.PropTypes.object
};
