import produce from "immer";
import Constants from "../constants/hotel";

export const defaultState = {
  hotels: [],
  hotel: {},
  rooms: [],
  room:{},
  hotelDetail: {
    telephone: [],
    address: {
      address_Line: [""],
      city: "",
      country: {
        name: "",
        value: ""
      },
      postalCode: ""
    },
    amenity: [],
    image: [
      {
        caption: "",
        value: ""
      }
    ]
  },
  refreshing: false,
  errorMessage: ""
};
const reducer = (state = defaultState, action) =>
  produce(state, draft => {
    let currentDraft = draft;
    const actionType = action && action.type ? action.type : "";

    switch (actionType) {
      case Constants.FETCHED_HOTELS: {
        currentDraft.hotels = action.data;
        return;
      }
      case Constants.SET_ROOM: {
        currentDraft.room = action.data;
        return;
      }
      case Constants.SET_HOTEL: {
        currentDraft.hotel = action.data;
        return;
      }
      case Constants.FETCHED_HOTEL_DETAIL: {
        currentDraft.hotelDetail = action.data;
        return;
      }
      case Constants.FETCHED_HOTEL_ROOMS: {
        currentDraft.rooms = action.data;
        return;
      }

      case Constants.REFRESHING: {

        currentDraft.refreshing = action.data;
        return;
      }
      case Constants.ERROR_MESSAGE: {
        console.log('in');
        currentDraft.errorMessage = action.data;
        return;
      }
      default: {
        currentDraft = draft;
      }
    }
  });

export default reducer;
