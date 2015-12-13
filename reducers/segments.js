const initialSegments = [{
  id: 'initial',
  value: ''
}]

export default function segmentsReducer (segments = initialSegments, action) {
  switch (action.type) {
  case 'CREATE_SEGMENT':
    return [...segments, { id: action.id, value: action.value }]

  case 'UPDATE_SEGMENT':
    return segments.map(segment =>
      segment.id === action.id ?
        Object.assign({}, segment, { value: action.value }) : segment)

  case 'DELETE_SEGMENT':
    return segments.filter(segment => segment.id !== action.id)

  default:
    return segments
  }
}
