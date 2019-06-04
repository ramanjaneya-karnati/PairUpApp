export const Actions = {
  MESSAGES_COMPONENT_INIT: 'MESSAGES_COMPONENT_INIT',
  MATCHES_COMPONENT_INIT: 'MATCHES_COMPONENT_INIT',
  NOTIFICATIONS_COMPONENT_INIT: 'NOTIFICATIONS_COMPONENT_INIT',
};

export function raiseAction(type, payload) {
  return {
    type,
    payload
  }
}
