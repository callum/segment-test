import React from 'react'

function handleClick (props, event, kind) {
  props.updateSegment(props.segment.id, { kind })
  event.preventDefault()
}

const Toolbar = Child => props =>
  <div>
    <Child {...props} />
    {props.focus === props.segment.id ?
      Object.keys(props.segmentMap).map(kind => {
        if (props.segment.kind === kind) return null
        return <button key={kind} onClick={event => handleClick(props, event, kind)}>
          {kind}
        </button>
      }) : null}
  </div>

export default Toolbar
