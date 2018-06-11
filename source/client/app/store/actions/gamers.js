import { ADD_GAMER, REMOVE_GAMER } from '../constants'

export const addGamer = (gamer) => ({
  type: ADD_GAMER,
  payload: gamer
})


export const removeGamer = (gamer) => ({
  type: REMOVE_GAMER,
  payload: gamer
})
