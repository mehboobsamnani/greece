import produce from "immer";
import Constants from "../constants/airport";

export const defaultState = {
  airport: {},
};
const reducer = (state = defaultState, action) =>
  produce(state, draft => {
    let currentDraft = draft;
    const actionType = action && action.type ? action.type : "";

    switch (actionType) {
      case Constants.SET_AIRPORT: {
        currentDraft.airport = action.data;
        return;
      }
      default: {
        currentDraft = draft;
      }
    }
  });

export default reducer;
