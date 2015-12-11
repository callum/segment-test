export function focusSegment (id) {
  return { type: 'FOCUS_SEGMENT', id }
}

export function blurSegment (id) {
  return { type: 'BLUR_SEGMENT', id }
}
