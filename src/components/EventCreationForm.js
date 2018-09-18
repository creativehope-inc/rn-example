import React from 'react'
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { View, StyleSheet } from 'react-native'

const EventCreationForm = ({ handleChange, handleSubmit, values }) => (
  <Form>
    <View>
      <Item floatingLabel>
        <Label>イベント名</Label>
        <Input onChangeText={handleChange('title')} value={values.title} />
      </Item>
      <Item floatingLabel>
        <Label>内容</Label>
        <Input multiline numberOfLines={5} style={{ height: 200 }} onChangeText={handleChange('content')} value={values.content} />
      </Item>
      <Item floatingLabel>
        <Label>場所</Label>
        <Input onChangeText={handleChange('location_name')} value={values.location_name} />
      </Item>
      <Item floatingLabel>
        <Label>画像URL</Label>
        <Input onChangeText={handleChange('image_url')} value={values.image_url} />
      </Item>
      <Item floatingLabel>
        <Label>開始時間</Label>
        <Input onChangeText={handleChange('start_datetime')} value={values.start_datetime} />
      </Item>
      <Item floatingLabel>
        <Label>終了時間</Label>
        <Input onChangeText={handleChange('end_datetime')} value={values.end_datetime} />
      </Item>
    </View>
    <View style={styles.sendButtonBox}>
      <Button full style={styles.sendButton} onPress={handleSubmit}>
        <Text>投稿する</Text>
      </Button>
    </View>
  </Form>
)

const styles = StyleSheet.create({
  sendButtonBox: {
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10
  },
  sendButton: {
    borderRadius: 5,
  }
})


export default EventCreationForm