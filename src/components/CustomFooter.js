import React, { Component } from 'react'
import {
  Text,
  Icon,
  Button,
  Footer,
  FooterTab
} from 'native-base';

const isHomeCreator = index => () => (index === 0)

const isEventsCreator = index => () => (index === 1)

export default function CustomeFooter(props) {
  const { navigation } = props
  const { navigate, state } = navigation
  const { index } = state
  const isHome = isHomeCreator(index)
  const isEvents = isEventsCreator(index)
  return (
    <Footer>
      <FooterTab>
        <Button vertical active={isHome()} onPress={() => navigate('Home')}>
          <Icon active={isHome()} name="navigate" />
          <Text>Home</Text>
        </Button>
        <Button vertical active={isEvents()} onPress={() => navigate('Events')}>
          <Icon active={isEvents()} name="calendar" />
          <Text>Events</Text>
        </Button>
      </FooterTab>
    </Footer>
  )
}
