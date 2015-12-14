import keyname from 'keyname'

export function handleKeyDown (props, event) {
  const key = keyname(event.keyCode)

  if (props.nextSegment && (key === 'down' || key === 'right')) {
    props.activateFocus(props.nextSegment.id)
    event.preventDefault()
    return
  }

  if (props.prevSegment && (key === 'up' || key === 'left')) {
    props.activateFocus(props.prevSegment.id)
    event.preventDefault()
    return
  }

  if (props.prevSegment && key === 'backspace') {
    props.activateFocus(props.prevSegment.id)
    props.deleteSegment(props.segment.id)
    event.preventDefault()
    return
  }

  if (key === 'enter') {
    props.createSegment({ kind: 'paragraph', value: '' }, props.segment.id)
    event.preventDefault()
    return
  }
}
