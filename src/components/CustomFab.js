import React, { Component } from 'react'
import { Fab, Icon } from 'native-base'

export default function CustomFab({ onPress }) {
  return (
    <Fab
      onPress={onPress}
      containerStyle={{}}
      style={{ backgroundColor: '#5067FF' }}
      position="bottomRight">
      <Icon name="add" />
    </Fab>
  )
}