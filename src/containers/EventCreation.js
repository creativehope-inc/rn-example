import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Formik } from 'formik'
import * as eventCreationActions from '../ducks/event_creation'
import EventCreationForm from '../components/EventCreationForm'

const today = new Date()

class EventCreation extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(values) {
    this.props.createEvent(values)
  }

  render() {
    return (
      <Container>
        <Content>
          <Formik onSubmit={(values) => this.handleSubmit(values)}>
            {(props) => <EventCreationForm {...props} />}
          </Formik>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(eventCreationActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(EventCreation)