import Constants from "../constants/hotel";
import { filter } from "lodash";
import {toggleErrorMessage , toggleRefresh } from './index.js';

export function hoteltoggleRefresh(refreshStatus) {
  return {
    type: Constants.REFRESHING,
    data: refreshStatus
  };
}

export function setHotel(hotel) {
  return dispatch => {
    dispatch({
      type: Constants.SET_HOTEL,
      data: hotel
    });
  };
}


export function setRoom(room) {
  return dispatch => {
    dispatch({
      type: Constants.SET_ROOM,
      data: room
    });
  };
}

export function fetchHotelRooms(hotel) {
    const API = `${process.env.REACT_APP_API_URL}Hotel/rooms?chaincode=${
        hotel.property.propertyKey.chainCode
      }&propertycode=${
        hotel.property.propertyKey.propertyCode
      }&checkin=${hotel.startDate.replace(
        /-/g,
        ""
    )}&checkout=${hotel.endDate.replace(/-/g, "")}&guests=${hotel.guests}&agequalifying=1`;
    

    return dispatch => {
      //dispatch(hoteltoggleRefresh(true));
      var myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
        var myInit = { method: 'GET',
                       headers: myHeaders,
                       mode: 'cors',
                       cache: 'default' };

        var myRequest = new Request(API, myInit);

        fetch(myRequest)
        .then(response => response.json())
        .then(json => {
          dispatch(toggleRefresh(false));
          if(json.statusCode === 401){
            dispatch(toggleErrorMessage("please signin and toggle room tab again."));
            dispatch({
              type: Constants.FETCHED_HOTEL_ROOMS,
              data: null
            });
            return
          }
         
          console.log(json.result);
          dispatch({
            type: Constants.FETCHED_HOTEL_ROOMS,
            data: json.result.offers.offer
          });
        })
        .catch(function(e) {
          console.log(e);
        });
    };
  }

export function fetchHotelDetail(hotel) {

  const API = `${process.env.REACT_APP_API_URL}Hotel/details?chaincode=${
    hotel.property.propertyKey.chainCode
  }&propertycode=${
    hotel.property.propertyKey.propertyCode
  }&checkin=${hotel.startDate.replace(
    /-/g,
    ""
  )}&checkout=${hotel.endDate.replace(/-/g, "")}&guests=${hotel.guests}`;

  return dispatch => {
    dispatch(toggleRefresh(true));
    fetch(API)
      .then(response => response.json())
      .then(json => {
        dispatch(toggleRefresh(false));
        let detail = json.result.propertyDetail;
        const images = filter(detail.image, ["dimensionCategory", "O"]);
        detail.image = images;
        dispatch({
          type: Constants.FETCHED_HOTEL_DETAIL,
          data: json.result.propertyDetail
        });
      })
      .catch(function(e) {
        console.log(e);
      });
  };
}
export function fetchHotels(params) {
  return dispatch => {
    dispatch(toggleRefresh(true));
    dispatch({
      type: Constants.FETCHED_HOTELS,
      data: []
    });
    const API = `${process.env.REACT_APP_API_URL}Hotel/search?checkin=${params.startDate.replace(
      /-/g,
      ""
    )}&checkout=${params.endDate.replace(/-/g, "")}&guests=${
      params.guests
    }&rooms=${params.rooms}&radius=${params.radius}&lat=${
      params.latitude
    }&lon=${params.longitude}&unitOfDistance=Kilometers&paging=0`;

    fetch(API)
      .then(response => response.json())
      .then(json => {
        dispatch(toggleRefresh(false));
        dispatch({
          type: Constants.FETCHED_HOTELS,
          data: json.result.propertyInfo
        });
      })
      .catch(function(e) {
        dispatch(toggleRefresh(false));
        dispatch(
          toggleErrorMessage("Oops! Something went wrong!. Please try again.")
        );
      });
  };
}
