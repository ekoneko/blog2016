import ActionsType from 'ActionsType'

const initialState = {
  list: [
    {id: 'post', name: 'Post'}
  ],
  current: 'post'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionsType.NAVIGATOR_CHANGE:
      if (state.current !== action.value) {
        state = Object.assign({}, state, {current: 'post'});
      }
      break;
  }
  return state;
}
