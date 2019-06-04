import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Actions, raiseAction} from '../actions'

class App extends Component {

  constructor() {
    super()
  }

  componentDidMount() {
    const {
      actions
    } = this.props
    actions.raiseAction(Actions.COMPONENT_INITIALIZING)
  }

  render() {
    return (<HomeScreen {...props}/>)
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    ...state,
  }
}

function mapDispatchToProps(dispatch, ownprops) {
  return {
    actions: bindActionCreators({raiseAction}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
