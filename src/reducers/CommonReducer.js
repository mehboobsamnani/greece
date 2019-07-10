import produce from "immer";
import Constants from "../constants";

export const defaultState = {
  refreshing: false,
  errorMessage : '',
};
const reducer = (state = defaultState, action) =>
  produce(state, draft => {
    let currentDraft = draft;
    const actionType = action && action.type ? action.type : "";
    
    switch (actionType) {
      case Constants.REFRESHING: {
        currentDraft.refreshing = action.data;
        return;
      }
      case Constants.ERROR_MESSAGE: {
        console.log('in');
        currentDraft.ERROR_MESSAGE = action.data;
        return;
      }
      default: {
        currentDraft = draft;
      }
    }
  });

export default reducer;
