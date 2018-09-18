import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import events from './ducks/events'
import event_creation from './ducks/event_creation'
import home from './ducks/home'

const reducer = combineReducers({
  events,
  event_creation,
  home
})

const middleware = applyMiddleware(thunk)

export default () => {
  const store = createStore(reducer, composeWithDevTools(middleware))

  return store
}