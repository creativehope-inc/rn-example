import React, { Component } from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import HomeNavigator from './HomeNavigator'
import Events from './Events'
import CustomFooter from '../components/CustomFooter'

const RouteConfigs = {
  Home: HomeNavigator,
  Events
}

const BottomTabNavigatorConfig = {
  tabBarComponent: props => <CustomFooter {...props} />
}

export default createBottomTabNavigator(RouteConfigs, BottomTabNavigatorConfig)