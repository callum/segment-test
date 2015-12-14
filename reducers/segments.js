import { CREATE_SEGMENT, UPDATE_SEGMENT, DELETE_SEGMENT } from '../constants'

const initialSegments = [{
  id: 0,
  kind: 'paragraph',
  value: ''
}]

export default function segmentsReducer (segments = initialSegments, action) {
  switch (action.type) {
  case CREATE_SEGMENT:
    let afterIndex = segments.length

    if (action.afterId) {
      afterIndex = segments.findIndex(segment =>
        segment.id === action.afterId) + 1
    }

    return [...segments.slice(0, afterIndex),
      Object.assign({ id: action.id }, action.data),
      ...segments.slice(afterIndex)]

  case UPDATE_SEGMENT:
    return segments.map(segment =>
      segment.id === action.id ?
        Object.assign({}, segment, action.data) : segment)

  case DELETE_SEGMENT:
    return segments.filter(segment => segment.id !== action.id)

  default:
    return segments
  }
}
