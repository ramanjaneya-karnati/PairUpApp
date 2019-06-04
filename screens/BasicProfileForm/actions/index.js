export const Actions = {
  BASIC_PROFILE_COMPONENT_INIT: 'BASIC_PROFILE_COMPONENT_INIT',
  BASIC_PROFILE_DATA_SUCCESS: 'BASIC_PROFILE_DATA_SUCCESS'
};

export function raiseAction(type, payload) {
  return {
    type,
    payload
  }
}
