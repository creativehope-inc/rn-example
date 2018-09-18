import React from 'react';
import { Provider } from 'react-redux'
import BottomTabNavigator from './src/containers/BottomTabNavigator'
import createStore from './src/store'

const store = createStore()
class App extends React.Component {
  render() {
    return (
      <BottomTabNavigator />
    );
  }
}

export default function () {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}