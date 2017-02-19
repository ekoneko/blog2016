import ActionsType from 'ActionsType'

const initialState = {
  list: [],
  total: 0,
  currentContent: {},
  postState: 'waiting',
  errorMessage: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionsType.POST_ADD_SUCCESS:
      state = Object.assign({}, state, {
        postState: 'success'
      });
      state.list.unshift(action.data);
      break;
    case ActionsType.POST_ADD_FAILED:
      state = Object.assign({}, state, {
        postState: 'failed',
        errorMessage: action.data
      });
      break;
    case ActionsType.POST_ADD_RESET:
      state = Object.assign({}, state, {
        postState: 'waiting',
        errorMessage: ''
      });
      break;
    case ActionsType.POST_LIST:
      if (action.data.length) {
        state = Object.assign({}, state, {
          list: action.data,
          total: action.total
        })
      }
      break;
    case ActionsType.POST_LIST_APPEND:
      if (action.data.length) {
        state = Object.assign({}, state, {
          list: state.list.concat(action.data),
          total: action.total
        })
      }
      break;
    case ActionsType.POST_DELETE:
      if (action.data) {
        state = Object.assign({}, state);
        state.list = state.list.filter(item => {
          return item.id !== action.data;
        });
      }
      break;
    case ActionsType.POST_GET_CURRENT:
      if (action.data) {
        state = Object.assign({}, state, {
          currentContent: action.data
        })
      }
      break;
    case ActionsType.POST_EDIT:
      state = Object.assign({}, state);
      state.postState = 'success';
      state.currentContent = Object.assign(state.currentContent, action.data);
      break;
  }
  return state;
}
