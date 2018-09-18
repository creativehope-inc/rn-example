import * as api from '../api/events'
import { addHours, isWithinRange } from 'date-fns'

// Actions
const REQUEST = 'app/events/REQUEST'
const RECEIVE = 'app/events/RECEIVE'
const REQUEST_FILTER = 'app/events/REQUEST_FILTER'
const INPUT_SEARCH_BAR = 'app/events/INPUT_SEARCH_BAR'


// Reducer
const initialState = {
  isFetching: false,
  events: [],
  error: false,
  searchedEvents: [],
  targetHour: 0,
  searchWords: ''
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST: {
      return { ...state, isFetching: true }
    }
    case RECEIVE: {
      const searchedEvents = filterEvents(action.payload, { hour: state.targetHour, words: state.searchWords })
      return { ...state, isFetching: false, searchedEvents, events: action.payload, error: action.error }
    }
    case REQUEST_FILTER: {
      const searchedEvents = filterEvents(state.events, { hour: action.payload, words: state.searchWords })
      return { ...state, searchedEvents, targetHour: action.payload }
    }
    case INPUT_SEARCH_BAR: {
      const searchedEvents = filterEvents(state.events, { words: action.payload, hour: state.targetHour })
      return { ...state, searchedEvents }
    }
    default: {
      return state
    }
  }
}

// Action Creator
function requestEvents() {
  return {
    type: REQUEST
  }
}

function receiveEvents(payload, error) {
  return {
    type: RECEIVE,
    payload,
    error
  }
}

export function searchEventByWords(words) {
  return {
    type: INPUT_SEARCH_BAR,
    payload: words
  }
}

export function searchEventByTime(num) {
  return {
    type: REQUEST_FILTER,
    payload: num
  }
}

export function fetchEvents() {
  return async dispatch => {
    dispatch(requestEvents())
    try {
      const events = await api.fetchEvents()
      dispatch(receiveEvents(events, false))
    } catch(e) {
      dispatch(receiveEvents(e, true))
    }
  }
}

// Helper
const filterEvents = (events, { hour, words }) => {
  return filterEventsByWords(filterEventsByTime(events, hour), words)
}

const filterEventsByTime = (events, hour) => {
  const targetDateTime = addHours(new Date(), hour)
  const searchedEvents = events.filter((event) => {
    const { start_datetime, end_datetime } = event
    return isWithinRange(targetDateTime, start_datetime, end_datetime)
  })
  
  return searchedEvents
}

const filterEventsByWords = (events, words) => {
  return events.filter((event) => {
    return event.title.includes(words) || event.content.includes(words)
  })
}