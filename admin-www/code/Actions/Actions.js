import {bindActionCreators} from 'redux'
import * as navigator from './Navigator'
import * as user from './User'
import * as post from './Post'

const actions = {
  navigator,
  post,
  user
};

export default function actionsCombine(store) {
  var combinedActions = {};
  for (let key in actions) {
    combinedActions[key] = {};
    for (let name in actions[key]) {
      if (!actions[key].hasOwnProperty(name)) continue;
      combinedActions[key][name] = bindActionCreators(actions[key][name], store.dispatch);
    }
  }
  return combinedActions;
}
