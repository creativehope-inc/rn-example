import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation'
import Home from './Home'
import EventCreation from './EventCreation'
import SearchBar from '../components/SearchBar'

const RouteConfigs = {
  Home,
  EventCreation
}

const StackNavigatorConfig = {
  initialRouteName: 'Home',
}

export default createStackNavigator(RouteConfigs, StackNavigatorConfig)
