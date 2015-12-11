import React from 'react'
import Segment from './Segment'

const Segments = props =>
  <div>
    {props.segments.map((segment, i) => {
      return <div key={segment.id}>
        <Segment {...props} segment={segment}
          prevSegment={props.segments[i-1]}
          nextSegment={props.segments[i+1]} />
      </div>
    })}
  </div>

export default Segments
