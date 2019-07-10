import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchHotels, setHotel } from "actions/hotel.js";
import { Box, TextField } from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import { CircularProgress, Grid } from "@material-ui/core";
import { Card, CardContent, CardMedia } from "@material-ui/core/";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/lab/Slider";
import { debounce } from "lodash";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import { getParameterByName, isEmpty } from 'helpers';
import { withStyles } from '@material-ui/core/styles';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

import "./Hotel.scss";

const PrettoSlider = withStyles({
  root: {
    
    height: 8,
    marginTop: '10px'
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

class Hotel extends React.Component {
  _isMounted = true;
  constructor(props) {
    super(props);
    const dateFns = new DateFnsUtils();

    this.handleDataChange = this.handleDataChange.bind(this);
    this.generateList = this.generateList.bind(this);
    this.setSelectedHotel = this.setSelectedHotel.bind(this);

    this.dispatch = props.dispatch;
    this.state = {
      startDate: dateFns.format(
        dateFns.addDays(dateFns.date(), +1),
        "yyyy-MM-dd"
      ),
      endDate: dateFns.format(
        dateFns.addDays(dateFns.date(), +2),
        "yyyy-MM-dd"
      ),
      guests: 1,
      rooms: 1,
      radius: 10
    };
  }
  handleDataChange(i, v) {
    const dateFns = new DateFnsUtils();
    let key,
      value = "";
    switch (v) {
      case "startDate":
        i = dateFns.format(dateFns.date(i), "yyyy-MM-dd");
        key = "startDate";
        value = i;
        break;
      case "endDate":
        i = dateFns.format(dateFns.date(i), "yyyy-MM-dd");
        key = "endDate";
        value = i;
        break;
      case "guests":
        key = "guests";
        value = i.target.value;
        break;
      case "rooms":
        key = "rooms";
        value = i.target.value;
        break;
      default:
        this.setState({ radius: v });
        key = "radius";
        value = v;
    }

    this.setState({ [key]: value }, () => this.generateList());
  }

  generateList() {

    const { longitude, latitude } = isEmpty(this.props.airport)
      ?  {
        latitude: getParameterByName("lat"),
        longitude: getParameterByName("lon")
      }
      : this.props.airport ;
    const { startDate, endDate, radius, guests, rooms } = this.state;
    const params = {
      longitude,
      latitude,
      startDate,
      endDate,
      radius,
      guests,
      rooms
    };
    this.dispatch(debounce(fetchHotels(params), 1000));
  }

  setSelectedHotel(e) {
    const { longitude, latitude } = this.props.airport;
    const { startDate, endDate, radius, guests, rooms } = this.state;
    const params = {
      longitude,
      latitude,
      startDate,
      endDate,
      radius,
      guests,
      rooms
    };
    let hotel = { ...e, ...params };
    this.dispatch(setHotel(hotel));
    this.props.history.push(
      `/hotel/detail/${e.property.propertyKey.chainCode}/${
        e.property.propertyKey.propertyCode
      }?checkIn=${startDate}&checkOut=${endDate}&guests=${guests}`
    );
    //to={`/hotel/detail/${hotel.id}`}
  }

  componentDidMount() {
    this.generateList();
  }

  render() {
    const { startDate, endDate, guests, rooms, radius } = this.state;
    const { hotels, refreshing } = this.props;
    return (
      <div className="hotels-list">
        <Grid container alignItems="center" spacing={2}>
          <Grid sm={2} xs={6} item>
          
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                pr={2}
                style={{ width: "100%" }}
                label="Start Date"
                value={startDate}
                onChange={e => this.handleDataChange(e, "startDate")}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid sm={2} xs={6} item>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                pr={2}
                style={{ width: "100%" }}
                label="End Date"
                value={endDate}
                onChange={e => this.handleDataChange(e, "endDate")}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid sm={2} xs={6} item>
            <TextField
              id="standard-number"
              label="Guests"
              xs={6}
              type="number"
              value={guests}
              onChange={e => this.handleDataChange(e, "guests")}
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
            />
          </Grid>
          <Grid sm={2} xs={6} item>
            <TextField
              id="standard-number"
              label="Room"
              xs={6}
              value={rooms}
              type="number"
              onChange={e => this.handleDataChange(e, "rooms")}
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
            />
          </Grid>
          <Grid xs={6} sm={2} item>
            <label id="discrete-slider" data-shrink="true">
              Radius
            </label>
    
            <PrettoSlider
              defaultValue={10}
              aria-labelledby="discrete-slider"
              step={5}
              valueLabelDisplay="auto"
              onChange={this.handleDataChange}
              marks
              min={10}
              max={25}
              value={radius}
            />
          </Grid>
        </Grid>

        <Box mt={2}>
          <Grid container direction="row" justify="center" alignItems="center">
            {refreshing && <CircularProgress disableShrink />}
            <Grid className="hotels-list-container" item xs={12}>
              {!hotels.length && !refreshing && (
                <Typography variant="subtitle1">No Hotels Nearby </Typography>
              )}
              <PerfectScrollbar>
                {!!hotels.length &&
                  hotels.map((hotel, i) => (
                    <Box
                      key={i}
                      className="hotels-list-link"
                      onClick={e => this.setSelectedHotel(hotel)}
                    >
                      <Card className="hotels-list-card">
                        <CardMedia
                          className="hotels-list-card-image"
                          style={{ width: 151 }}
                          image={hotel.property.image[0].value}
                          title={hotel.property.image[0].caption}
                        />
                        <div className="hotels-list-card-detail">
                          <CardContent
                            className="hotels-list-card-content"
                            style={{ flex: "1 0 auto" }}
                          >
                            <Typography>{hotel.property.name}</Typography>
                            <Typography variant="caption">
                              {hotel.distance.value} km away from Airport
                            </Typography>
                            <Typography variant="subtitle1">
                              {[1, 2, 3, 4, 5].map(i =>
                                i <= hotel.property.rating[0].value ? (
                                  <Icon fontSize="small" key={i}>
                                    star
                                  </Icon>
                                ) : (
                                  <Icon fontSize="small" key={i}>
                                    star_border
                                  </Icon>
                                )
                              )}
                            </Typography>
                          </CardContent>
                        </div>
                        <div className="hotels-list-card-button">
                          <Button variant="outlined" size="medium">
                            View Detail
                          </Button>
                        </div>
                      </Card>
                    </Box>
                  ))}
              </PerfectScrollbar>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}

Hotel.propTypes = {
  hotels: PropTypes.array
};
Hotel.defaultProps = {
  hotels: []
};
function mapStateToProps(state) {
  const { hotels, refreshing, errorMessage } = state.HotelReducer;
  return {
    hotels,
    refreshing,
    errorMessage
  };
}
export default connect(mapStateToProps)(Hotel);
