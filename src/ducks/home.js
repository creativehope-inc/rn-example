import * as api from '../api/events'
import { Location, Permissions } from "expo";

// Actions
const RECEIVE_PERMISSION = 'app/home/RECEIVE_PERMISSION'
const REQUEST_CURRENT_POSITION = 'app/home/REQUEST_CURRENT_POSITION'
const RECEIVE_CURRENT_POSITION = 'app/home/RECEIVE_CURRENT_POSITION'


// Reducer
const initialState = {
  isLoading: true,
  canUse: false,
  currentPosition: {},
  error: false
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case RECEIVE_PERMISSION: {
      return { ...state, canUse: action.payload, error: action.error }
    }
    case REQUEST_CURRENT_POSITION: {
      return { ...state, isLoading: true }
    }
    case RECEIVE_CURRENT_POSITION: {
      return { ...state, currentPosition: action.payload, error: action.error, isLoading: false  }
    }
    default: {
      return state
    }
  }
}

// Action Creator
function requestCurrentPosition() {
  return {
    type: REQUEST_CURRENT_POSITION
  }
}

function receivePermission(payload, error) {
  return {
    type: RECEIVE_PERMISSION,
    payload,
    error
  }
}

function receiveCurrentPosition(payload, error) {
  return {
    type: RECEIVE_CURRENT_POSITION,
    payload,
    error
  }
}

export function askLocationPermission() {
  return async dispatch => {
    try {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      const canUse = (status === 'granted')
      dispatch(receivePermission(canUse, false))
    } catch (e) {
      dispatch(receivePermission(e, true))
    }
  }
}

export function getCurrentPosition() {
  return async dispatch => {
    try {
      dispatch(requestCurrentPosition())
      const location = await Location.getCurrentPositionAsync({});
      dispatch(receiveCurrentPosition(location, false))
    } catch (e) {
      dispatch(receiveCurrentPosition(e, true))
    }
  }
}