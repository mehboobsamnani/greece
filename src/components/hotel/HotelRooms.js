import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, CircularProgress, Box } from "@material-ui/core";
import { Typography , Icon ,Divider,Avatar  } from "@material-ui/core";
import { fetchHotelRooms,setRoom } from "../../actions/hotel.js";
import { toggleErrorMessage } from "../../actions/";
import Chip from '@material-ui/core/Chip';
import PerfectScrollbar from 'react-perfect-scrollbar';

class HotelRooms extends React.Component {
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.state = {
      tabValue: 0
    };
    this.setSelectedRoom = this.setSelectedRoom.bind(this);

  }

  componentDidMount() {
    this.dispatch(toggleErrorMessage(''));
    this.dispatch(fetchHotelRooms(this.props.hotel));
  }

  setSelectedRoom(e){
    this.dispatch(setRoom(e));
    this.props.history.push(`/hotel/booking/123`)
  }

  render() {
    const { refreshing, rooms, errorMessage } = this.props;

    return (
      <Grid container alignItems="center" justify="center" spacing={2}>
        { !!rooms && rooms.length === 0 && <CircularProgress disableShrink />}
        {!refreshing && (
          <Grid container className="hotel-room">
            <PerfectScrollbar>
            { !!rooms && rooms.map((offer, i) => (
              <Grid style={{ width: "100%" }} key={i} item sm={12}>
                <div onClick={(e)=>  this.setSelectedRoom(offer) } >
                  <Box pt={2} pb={2} className="hotels-list-link">
                    <Grid container>
                      <Grid item sm={9}>
                        <Box display="flex" alignItems="center" mt={1} mb={1}>
                        <Chip
                        avatar={
                          <Avatar>
                            BC
                          </Avatar>
                        }
                        label={offer.products[0].product[0].bookingCode}
                        color="primary"
                      />
                       {/* <Typography variant="subtitle2">
                          {
                            offer.products[0].product[0].roomType.description && offer.products[0].product[0].roomType.description.value
                          }
                        </Typography> */}
                        </Box>
                        
                        <ul>
                        { !!offer.termsAndConditions[0].textBlock && offer.termsAndConditions[0].textBlock[0].textFormatted.map((text, j) => (
                            <li>{text.value}</li> ))}
                        </ul>
                        {offer.termsAndConditions[0].mealsIncluded &&
                          offer.termsAndConditions[0].mealsIncluded
                            .breakfastInd && (
                            <Typography variant="caption">
                              *Breakfast Included
                            </Typography>
                          )}
                        
                      </Grid>
                      <Grid item sm={3}>
                        <Box
                          alignItems="center"
                          justifyContent="flex-end"
                          display="flex"
                        >
                          <Icon style={{ fontSize: "20px" }}>euro_symbol</Icon>
                          <Typography variant="h6">{offer.price.totalPrice[0].total.value}</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </div>
                { !!rooms && rooms.length - 1 !== i && <Divider />}
              </Grid>
            ))}
              { errorMessage.length === 0 && rooms === null && <p>No Rooms Found</p>}
              { errorMessage}
            </PerfectScrollbar>
          
          </Grid>
        )}
      </Grid>
    );
  }
}

HotelRooms.propTypes = {
  rooms: PropTypes.array
};
HotelRooms.defaultProps = {
  rooms: []
};
function mapStateToProps(state) {
  const { rooms, refreshing, errorMessage } = state.HotelReducer;

  return {
    rooms,
    refreshing,
    errorMessage
  };
}

export default withRouter(connect(mapStateToProps)(HotelRooms));
