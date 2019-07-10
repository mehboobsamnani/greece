import Constants from "../constants";

export function toggleRefresh(refreshStatus) {
  return {
    type: Constants.REFRESHING,
    data: refreshStatus
  };
}

export function toggleErrorMessage(errorMessage) {
  return dispatch => {
    dispatch({
    type: Constants.ERROR_MESSAGE,
    data: errorMessage
    });
  };
}

