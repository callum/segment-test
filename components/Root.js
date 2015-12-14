import React from 'react'
import keyname from 'keyname'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators as undoActions } from 'redux-undo'
import * as focusActions from '../actions/focus'
import * as segmentsActions from '../actions/segments'
import Heading from './Heading'
import Image from './Image'
import Paragraph from './Paragraph'
import Toolbar from './Toolbar'

const segmentMap = {
  'heading': Toolbar(Heading),
  'image': Image,
  'paragraph': Toolbar(Paragraph)
}

function handleKeyDown (props, event) {
  if (props.focus !== null && event.metaKey && keyname(event.keyCode) === 'z') {
    if (event.shiftKey) {
      props.redo()
    } else {
      props.undo()
    }
    event.preventDefault()
  }
}

const Root = props =>
  <main onKeyDown={event => handleKeyDown(props, event)}>
    {props.segments.present.map((segment, i) => {
      const Segment = segmentMap[segment.kind]

      return <div key={segment.id}>
        <Segment {...props} segment={segment} segmentMap={segmentMap}
          prevSegment={props.segments.present[i-1]}
          nextSegment={props.segments.present[i+1]} />
      </div>
    })}
  </main>

const state = ({ focus, segments }) => ({ focus, segments })

const dispatchers = dispatch =>
  Object.assign(bindActionCreators(undoActions, dispatch),
                bindActionCreators(focusActions, dispatch),
                bindActionCreators(segmentsActions, dispatch))

export default connect(state, dispatchers)(Root)
