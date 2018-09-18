import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import {
  Container,
  Header,
  Icon,
  Button,
  Fab,
  Item,
  Input,
} from 'native-base';
import { Font, Location, Permissions, AppLoading } from "expo";
import { Platform, StatusBar, Slider } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CustomFab from '../components/CustomFab'
import * as eventsActions from '../ducks/events'
import * as homeActions from '../ducks/home'
import SearchBar from '../components/SearchBar'


class Home extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.handleChangeTime = this.handleChangeTime.bind(this)
    this.handleChangeInputSearchWords = this.handleChangeInputSearchWords.bind(this)
  }

  async componentWillMount() {
    await this.getLocationAsync()
  }

  componentDidMount() {
    this.props.fetchEvents()
  }

  handleChangeInputSearchWords(value) {
    this.props.searchEventByWords(value)
  }

  handleChangeTime(value) {
    this.props.searchEventByTime(value)
  }

  async getLocationAsync() {
    await this.props.askLocationPermission()
    await this.props.getCurrentPosition()
  }

  render() {
    const { canUse, isLoading, currentPosition, navigation, events, targetHour, searchWords } = this.props
    const { width, height } = Dimensions.get('window')
    const ratio = width / height
    const coordinates = {
      ...currentPosition.coords,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0922 * ratio,
    }

    console.log(events)

    return (
      (!canUse || isLoading) ? (
        <AppLoading />
      ) : (
        <Container>
          <SearchBar value={searchWords} onChangeText={(value) => this.handleChangeInputSearchWords(value)} />
          <View>
            <Slider
              step={1}
              maximumValue={48}
              value={targetHour}
              onValueChange={(value) => this.handleChangeTime(value)}
            />
            {targetHour !== 0 && (<Text style={styles.sliderText}>{targetHour}時間後</Text>)}
          </View>
          <View style={styles.container}>
            <MapView
              showsCompass
              showsUserLocation
              style={styles.map}
              region={coordinates}
              provider="google"
            >
              {events.map((event, index) => (
                <Marker key={index} title={event.title} coordinate={{ latitude: event.lat, longitude: event.long }} />
              ))}
            </MapView>
          </View>
          <CustomFab onPress={() => navigation.navigate('EventCreation')} />
        </Container>
      )
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  header: (Platform.OS === 'ios') ? {} : {
    paddingTop: StatusBar.currentHeight,
    height: 54 + Number(StatusBar.currentHeight),
  },
  sliderText: {
    textAlign: 'center',
    paddingBottom: 10
  }
});

const mapStateToProps = (state) => {
  return {
    events: state.events.searchedEvents,
    canUse: state.home.canUse,
    currentPosition: state.home.currentPosition,
    isLoading: state.home.isLoading,
    targetHour: state.events.targetHour,
    searchWords: state.events.searchWords
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(eventsActions, dispatch),
    ...bindActionCreators(homeActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)