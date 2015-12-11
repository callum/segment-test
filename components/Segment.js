import React, { Component } from 'react'
import Textarea from 'react-textarea-autosize'
import { focusSegment, blurSegment } from '../actions/focused'
import { createSegment, updateSegment, deleteSegment } from '../actions/segments'

class Segment extends Component {
  componentDidUpdate (prevProps) {
    const { focused, segment } = this.props

    if (focused === segment.id && focused !== prevProps.focused) {
      this.textarea.focus()
    }
  }

  handleFocus () {
    const { segment, dispatch } = this.props
    dispatch(focusSegment(segment.id))
  }

  handleBlur () {
    const { segment, dispatch } = this.props
    dispatch(blurSegment(segment.id))
  }

  handleKeyDown (event) {
    const { segment, prevSegment, nextSegment, dispatch } = this.props

    // press down or right at the end of the text
    if (nextSegment &&
        event.target.selectionEnd === event.target.value.length &&
        (event.keyCode === 39 || event.keyCode === 40)) {
      dispatch(focusSegment(nextSegment.id))
      event.preventDefault()
      return
    }

    // press up or left at the start of the text
    if (prevSegment &&
        event.target.selectionEnd === 0 &&
        (event.keyCode === 37 || event.keyCode === 38)) {
      dispatch(focusSegment(prevSegment.id))
      event.preventDefault()
      return
    }

    // press backspace at the start of the text
    if (prevSegment && event.target.selectionEnd === 0 && event.keyCode === 8) {
      dispatch(updateSegment(prevSegment.id, prevSegment.value + segment.value))
      dispatch(focusSegment(prevSegment.id))
      dispatch(deleteSegment(segment.id))
      event.preventDefault()
      return
    }

    // press enter at the end of the text
    if (event.target.selectionEnd === event.target.value.length &&
        event.keyCode === 13) {
      dispatch(createSegment(''))
      event.preventDefault()
      return
    }
  }

  handleChange (event) {
    const { segment, dispatch } = this.props
    const paragraphs = event.target.value.split(/[\n\r]{2}/g)

    if (paragraphs.length > 1) {
      paragraphs.forEach((paragraph, i) => {
        if (i === 0) {
          dispatch(updateSegment(segment.id, paragraph))
        } else {
          dispatch(createSegment(paragraph))
        }
      })
      return
    }

    dispatch(updateSegment(segment.id, event.target.value))
  }

  render () {
    return <div>
      <Textarea autoFocus value={this.props.segment.value}
        ref={ref => this.textarea = ref}
        onFocus={this.handleFocus.bind(this)}
        onBlur={this.handleBlur.bind(this)}
        onKeyDown={this.handleKeyDown.bind(this)}
        onChange={this.handleChange.bind(this)} />
    </div>
  }
}

export default Segment
