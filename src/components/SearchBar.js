import React, { Component } from 'react'
import { Header, Item, Icon, Input, Button, Text } from 'native-base'

export default function SearchBar({ value, onChangeText}) {
  return (
    <Header searchBar rounded>
      <Item>
        <Icon name="ios-search" />
        <Input placeholder="Search" value={value} onChangeText={onChangeText} />
        <Icon name="ios-people" />
      </Item>
      <Button transparent>
        <Text>Search</Text>
      </Button>
    </Header>
  )
}