import { ADD_GAMER, REMOVE_GAMER } from '../constants'

export default (state = [], action) => {
  switch (action.type) {
    case ADD_GAMER:
      return [
        ...state,
        action.payload
      ];
    case REMOVE_GAMER:
      return state.filter(gamer => gamer.steamid !== action.payload.steamid);
    default:
      return state
  }
}
