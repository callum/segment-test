import { ACTIVATE_FOCUS, DEACTIVATE_FOCUS } from '../constants'

export default function focusReducer (focus = null, action) {
  switch (action.type) {
  case ACTIVATE_FOCUS:
    return action.id

  case DEACTIVATE_FOCUS:
    return null

  default:
    return focus
  }
}
