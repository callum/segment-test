import React from 'react'
import { connect } from 'react-redux'
import Segments from './Segments'

const Root = props =>
  <main>
    <Segments {...props} />
  </main>

const state = ({ focused, segments }) => ({ focused, segments })

export default connect(state)(Root)
