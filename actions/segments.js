import { CREATE_SEGMENT, UPDATE_SEGMENT, DELETE_SEGMENT } from '../constants'

let counter = 0

export function createSegment (data, afterId) {
  return { type: CREATE_SEGMENT, id: ++counter, data, afterId }
}

export function updateSegment (id, data) {
  return { type: UPDATE_SEGMENT, id, data }
}

export function deleteSegment (id) {
  return { type: DELETE_SEGMENT, id }
}
