import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import Navigator from './Navigator'
import Post from './Post'
import User from './User'

const reducers = {
  Navigator,
  Post,
  User
};

/**
 * 根据 reducers 生成 store
 * @return {Store}
 */
export default function storeGenerator() {
  const combinedReducer = combineReducers(reducers);
  return createStore(
    combinedReducer,
    applyMiddleware(thunkMiddleware)
  );
}
