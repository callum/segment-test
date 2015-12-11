let counter = 0

export function createSegment (value) {
  return { type: 'CREATE_SEGMENT', id: ++counter, value }
}

export function updateSegment (id, value) {
  return { type: 'UPDATE_SEGMENT', id, value }
}

export function deleteSegment (id) {
  return { type: 'DELETE_SEGMENT', id }
}
