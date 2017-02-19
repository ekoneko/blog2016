import ActionsType from 'ActionsType'

const initialState = {
  hasRequest: false,
  isLogin: false,
  info: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionsType.USER_GET_INFO:
      if (!action.value) {
        state = {
          hasRequest: true,
          isLogin: false,
          info: {}
        };
      } else {
        state = {
          hasRequest: true,
          isLogin: true,
          info: action.value
        }
      }
      break;
  }
  return state;
}
