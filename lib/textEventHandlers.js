import keyname from 'keyname'

export function handleChange (props, event) {
  const paragraphs = event.target.value.split(/[\n\r]{2}/g)

  if (paragraphs.length > 1) {
    paragraphs.forEach((paragraph, i) => {
      if (i === 0) {
        props.updateSegment(props.segment.id, { value: paragraph })
      } else {
        props.createSegment({ kind: 'paragraph', value: paragraph },
          props.segment.id)
      }
    })
    return
  }

  props.updateSegment(props.segment.id, { value: event.target.value })
}

export function handleKeyDown (props, event) {
  const { target, keyCode } = event
  const key = keyname(keyCode)

  const atStart = target.selectionStart === 0 &&
    target.selectionEnd === 0
  const atEnd = target.selectionStart === target.value.length &&
    target.selectionEnd === target.value.length

  if (props.nextSegment && atEnd && (key === 'down' || key === 'right')) {
    props.activateFocus(props.nextSegment.id)
    event.preventDefault()
    return
  }

  if (props.prevSegment && atStart && (key === 'up' || key === 'left')) {
    props.activateFocus(props.prevSegment.id)
    event.preventDefault()
    return
  }

  if (props.prevSegment && atStart && key === 'backspace') {
    props.activateFocus(props.prevSegment.id)
    if (props.prevSegment.kind === 'paragraph' ||
        props.prevSegment.kind === 'heading') {
      props.updateSegment(props.prevSegment.id, {
        value: props.prevSegment.value + props.segment.value
      })
    }
    props.deleteSegment(props.segment.id)
    event.preventDefault()
    return
  }

  if (key === 'enter') {
    const { value } = props.segment
    props.updateSegment(props.segment.id, {
      value: value.slice(0, target.selectionStart)
    })
    props.createSegment({
      kind: 'paragraph',
      value: value.slice(target.selectionEnd)
    }, props.segment.id)
    event.preventDefault()
    return
  }
}
