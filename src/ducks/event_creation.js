import * as api from '../api/event_creation'

// Actions
const COMPLETE = 'app/event_creation/COMPLETE'


// Reducer
const initialState = {
  payload: [],
  error: false
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case COMPLETE: {
      return { ...state, payload: action.payload, error: action.error }
    }
    default: {
      return state
    }
  }
}

// Action Creator
export function completeEventCreation(payload, error) {
  return {
    type: COMPLETE,
    payload,
    error
  }
}

export function createEvent(values) {
  return async dispatch => {
    try {
      await api.createEvent(values)
      dispatch(completeEventCreation(null, false))
    } catch (e) {
      dispatch(completeEventCreation(e, true))
    }
  }
}