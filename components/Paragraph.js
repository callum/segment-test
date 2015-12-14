import React from 'react'
import Textarea from 'react-textarea-autosize'
import focusable from '../focusable'
import { handleChange, handleDrop, handleKeyDown } from '../lib/textEventHandlers'

const Paragraph = props =>
  <Textarea autoFocus
    ref={props.setFocusRef}
    value={props.segment.value}
    onFocus={props.handleFocus}
    onBlur={props.handleBlur}
    onChange={event => handleChange(props, event)}
    onDrop={event => handleDrop(props, event)}
    onKeyDown={event => handleKeyDown(props, event)} />

export default focusable(Paragraph)
