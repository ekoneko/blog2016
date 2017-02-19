import './style.scss'
import React from 'react'
import {FormControl, Button} from 'react-bootstrap'

export default class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: '',
      password: ''
    }
  }
  changeHandle(type, event) {
    let changeState = {};
    changeState[type] = event.target.value;
    this.setState(changeState)
  }
  submitHandle() {
    this.context.actions.user.login(this.state.email, this.state.password);
  }
  render() {
    return <div className="login-form container">
      <div className="form-group">
        <FormControl
          type="text"
          value={this.email}
          placeholder="Email"
          onChange={this.changeHandle.bind(this, 'email')}
        />
      </div>
      <div className="form-group">
        <FormControl
          type="password"
          value={this.password}
          placeholder="Password"
          onChange={this.changeHandle.bind(this, 'password')}
        />
      </div>
      <Button bsStyle="primary" onClick={this.submitHandle.bind(this)}>Login</Button>
    </div>
  }
}
Login.contextTypes = {
  actions: React.PropTypes.object
};
