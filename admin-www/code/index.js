import $ from 'jquery'
import 'initialize-css'
import 'bootstrap/dist/css/bootstrap.css'
import 'imports-loader?jQuery!bootstrap/dist/js/bootstrap'
import 'bootstrap-material-design/dist/css/bootstrap-material-design.css'
import 'imports-loader?jQuery!bootstrap-material-design/dist/js/material'
import 'whatwg-fetch'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'
import IndexC from 'Components/Index/Index'
import storeGenerator from 'Reducers/Reducers'
import actionsCombine from 'Actions/Actions'

$.material.init();

const rootDOM = document.createElement('div');
document.body.appendChild(rootDOM);

const store = storeGenerator();
const Index = connect(state => state)(IndexC);
const actions = actionsCombine(store);
Index.childContextTypes = {
  actions: React.PropTypes.object
};
Index.prototype.getChildContext = function() {
  return {actions}
};
ReactDOM.render(
  <Provider store={store}>
    <Index></Index>
  </Provider>, rootDOM
);
