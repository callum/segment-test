export default function focusedReducer (focused = null, action) {
  switch (action.type) {
  case 'FOCUS_SEGMENT':
    return action.id

  case 'BLUR_SEGMENT':
    return null

  default:
    return focused
  }
}
