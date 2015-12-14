import { ACTIVATE_FOCUS, DEACTIVATE_FOCUS } from '../constants'

export function activateFocus (id) {
  return { type: ACTIVATE_FOCUS, id }
}

export function deactivateFocus (id) {
  return { type: DEACTIVATE_FOCUS, id }
}
