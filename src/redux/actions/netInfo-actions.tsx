import * as types from './action-list';

// For the set network availability e.g. true, false
export const toggleNetState = value => {
  return dispatch => {
    dispatch({
      type: types.TOGGLE_CONNECTIVITY,
      value,
    });
  };
};

// For set network type e.g. wifi, 4g, 3g ...
export const setConnectionType = connectionType => ({
  type: types.SET_CONNECTION_TYPE,
  connectionType,
});
