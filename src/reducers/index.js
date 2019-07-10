import { combineReducers } from 'redux';
import HotelReducer from './HotelReducer';
import CommonReducer from './CommonReducer';
import AirportReducer from './AirportReducer';

export default combineReducers({
  HotelReducer,
  CommonReducer,
  AirportReducer,
});