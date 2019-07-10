import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TextField, Button, Grid, Typography ,Box ,Container } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";

class HotelBooking extends React.Component {
  // constructor(props) {
  //   super(props);
   
  // }

  render() {
    const { hotel, hotelDetail, room } = this.props;

    return (
      <div>
        {/* <form noValidate> */}
        <Container maxWidth="md">
          <Grid container className="hotel-booking" spacing={2}>
            <Grid item sm={12}>
              <Typography variant="h6">
                {hotelDetail.name}
           
              </Typography>
              {/* <Typography variant="subtitle1">
                {room.products[0].product[0].roomType.description.value}
              </Typography> */}
              <ul>
                        { !!room.termsAndConditions[0].textBlock && room.termsAndConditions[0].textBlock[0].textFormatted.map((text, j) => (
                            <li>{text.value}</li> ))}
                        </ul>
            </Grid>
            <Grid item sm={6}>
              <Grid container spacing={2}>
                <Grid item sm={12}>
                  <TextField
                    required
                    fullWidth
                    id="bkname"
                    label="Booking Name"
                    name="bkname"
                    autoFocus
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="fname"
                    label="First Name"
                    name="fname"
                    autoFocus
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lname"
                    label="Last Name"
                    name="fname"
                    autoFocus
                  />
                </Grid>

                <Grid item sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="fname"
                    label="telephone"
                    name="fname"
                    autoFocus
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="fname"
                    autoFocus
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={6}>
              
              <Grid container style={{fontSize:'1rem'}}>
              <Grid item sm={12}>
                 <Typography>Booking Code : <b>{room.products[0].product[0].bookingCode}</b> </Typography> 
                </Grid>
                <Grid item sm={12}>
                  <Box mt={3}  display="flex" alignItems="flex-end"  variant="subtitle1">
                    <Icon style={{paddingRight:'5px'}}>calendar_today</Icon> {hotel.startDate} - {hotel.endDate}
                  </Box>
                </Grid>
                <Grid item sm={3}>
                  <Box mt={3}  display="flex" alignItems="flex-end">
                    <Icon style={{paddingRight:'5px'}}>meeting_room</Icon> {hotel.rooms} Rooms.
                  </Box>
                </Grid>
                <Grid item sm={3}>
                  <Box mt={3}  display="flex" alignItems="flex-end">
                    <Icon style={{paddingRight:'5px'}}>people_outline</Icon> {hotel.guests} Guests
                  </Box>
                </Grid>
                <Grid item sm={12}>
                  <Box mt={3}  display="flex" alignItems="center">
                  <Icon style={{ fontSize: "1.25rem" }}>euro_symbol</Icon>
                  <Typography variant="h6">{room.price.totalPrice[0].total.value}</Typography> 
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={3}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Book
              </Button>
            </Grid>
          </Grid>
          </Container>
        {/* </form> */}
      </div>
    );
  }
}

HotelBooking.propTypes = {
  room: PropTypes.object,
  hotel: PropTypes.object,
  hotelDetail: PropTypes.object
};
HotelBooking.defaultProps = {
  room: {},
  hotel: {},
  hotelDetail: {}
};
function mapStateToProps(state) {
  const {
    hotelDetail,
    hotel,
    room,
    refreshing,
    errorMessage
  } = state.HotelReducer;
  return {
    hotel,
    hotelDetail,
    room,
    refreshing,
    errorMessage
  };
}

export default connect(mapStateToProps)(HotelBooking);
