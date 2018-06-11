import { ADD_GAMER } from '../constants'

export const addGamer = (gamer) => ({
  type: ADD_GAMER,
  payload: gamer
})
