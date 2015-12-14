import React from 'react'
import Textarea from 'react-textarea-autosize'
import focusable from '../focusable'
import { handleChange, handleKeyDown } from '../lib/textEventHandlers'

const Heading = props =>
  <Textarea autoFocus
    style={{ fontSize: '22px', fontWeight: 'bold' }}
    ref={props.setFocusRef}
    value={props.segment.value}
    onFocus={props.handleFocus}
    onBlur={props.handleBlur}
    onChange={event => handleChange(props, event)}
    onKeyDown={event => handleKeyDown(props, event)} />

export default focusable(Heading)

