import React, { Component } from 'react'
import Textarea from 'react-textarea-autosize'
import { activateFocus, deactivateFocus } from '../actions/focus'
import { createSegment, updateSegment, deleteSegment } from '../actions/segments'

class Segment extends Component {
  componentDidUpdate (prevProps) {
    const { props } = this

    if (props.focus === props.segment.id && props.focus !== prevProps.focus) {
      this.textarea.focus()
    }
  }

  handleFocus () {
    const { props } = this
    props.activateFocus(props.segment.id)
  }

  handleBlur () {
    const { props } = this
    props.deactivateFocus(props.segment.id)
  }

  handleKeyDown (event) {
    const { props } = this

    // press down or right at the end of the text
    if (props.nextSegment &&
        event.target.selectionEnd === event.target.value.length &&
        (event.keyCode === 39 || event.keyCode === 40)) {
      props.activateFocus(props.nextSegment.id)
      event.preventDefault()
      return
    }

    // press up or left at the start of the text
    if (props.prevSegment &&
        event.target.selectionEnd === 0 &&
        (event.keyCode === 37 || event.keyCode === 38)) {
      activateFocus(props.prevSegment.id)
      event.preventDefault()
      return
    }

    // press backspace at the start of the text
    if (props.prevSegment && event.target.selectionEnd === 0 && event.keyCode === 8) {
      props.updateSegment(props.prevSegment.id,
        props.prevSegment.value + props.segment.value)
      props.activateFocus(props.prevSegment.id)
      props.deleteSegment(props.segment.id)
      event.preventDefault()
      return
    }

    // press enter at the end of the text
    if (event.target.selectionEnd === event.target.value.length &&
        event.keyCode === 13) {
      props.createSegment('')
      event.preventDefault()
      return
    }
  }

  handleChange (event) {
    const { props } = this
    const paragraphs = event.target.value.split(/[\n\r]{2}/g)

    if (paragraphs.length > 1) {
      paragraphs.forEach((paragraph, i) => {
        if (i === 0) {
          props.updateSegment(props.segment.id, paragraph)
        } else {
          props.createSegment(paragraph)
        }
      })
      return
    }

    props.updateSegment(props.segment.id, event.target.value)
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
