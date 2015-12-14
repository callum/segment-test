import React from 'react'
import Textarea from 'react-textarea-autosize'
import focusable from '../focusable'
import { handleKeyDown } from '../lib/blockEventHandlers'

function handleSrcChange (props, event) {
  props.updateSegment(props.segment.id, {
    src: URL.createObjectURL(event.target.files[0])
  })
}

function handleCaptionChange (props, event) {
  props.updateSegment(props.segment.id, {
    caption: event.target.value
  })
}

const Image = props => {
  const keyboardProps = {
    onFocus: props.handleFocus,
    onBlur: props.handleBlur,
    ref: ref => props.setFocusRef(ref),
    onKeyDown: event => handleKeyDown(props, event)
  }

  if (!props.segment.src) {
    return <input type="file" onChange={event => handleSrcChange(props, event)}
      {...keyboardProps} />
  }

  return <div>
    <img src={props.segment.src} tabIndex="0" {...keyboardProps} />
    <div>
      <label>Caption
        <Textarea value={props.segment.caption}
          onChange={event => handleCaptionChange(props, event)} />
      </label>
    </div>
  </div>
}

export default focusable(Image)
