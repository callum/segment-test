import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as focusActions from '../actions/focus'
import * as segmentsActions from '../actions/segments'
import Segment from './Segment'

const Root = props =>
  <main>
    {props.segments.map((segment, i) => {
      return <div key={segment.id}>
        <Segment {...props} segment={segment}
          prevSegment={props.segments[i-1]}
          nextSegment={props.segments[i+1]} />
      </div>
    })}
  </main>

const state = ({ focus, segments }) => ({ focus, segments })

const dispatchers = dispatch =>
  Object.assign(bindActionCreators(focusActions, dispatch),
                bindActionCreators(segmentsActions, dispatch))

export default connect(state, dispatchers)(Root)
