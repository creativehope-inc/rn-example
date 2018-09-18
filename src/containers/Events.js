import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
import { Image } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as eventsActions from '../ducks/events'
import SearchBar from '../components/SearchBar'

class Events extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchEvents()
  }

  render() {
    const { events } = this.props
    return (
      <Container>
        <SearchBar />
        <Content>
          {events.map((event, index) => (
            <Card key={index}>
              <CardItem header>
                <Text>{event.title}</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>
                    {event.content}
                  </Text>
                </Body>
              </CardItem>
              <CardItem cardBody>
                <Image source={{ uri: event.image_url }} style={{ height: 200, width: null, flex: 1 }} />
              </CardItem>
            </Card>
          ))}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events.searchedEvents
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(eventsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)
