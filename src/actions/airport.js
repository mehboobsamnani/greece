import Constants from "../constants/airport";

export function setAirport(airport) {
    return dispatch => {
      dispatch({
        type: Constants.SET_AIRPORT,
        data: airport
      });
    };
  }