import { ADD_GAMER, DELETE_GAMER } from '../constants'

export default (state = [], action) => {
  let index = state.map(el => el.id).indexOf(action.payload);
  switch (action.type) {
    case ADD_GAMER:
      return [
        ...state,
        action.payload
      ];
    case DELETE_GAMER:
      if (index !== -1) {
        return state.splice(index, 1);
      } else {
        return state;
      }
    default:
      return state
  }
}
