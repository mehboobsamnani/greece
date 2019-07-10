import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Typography,
  Grid,
  Icon,
  Box,
  CircularProgress
} from "@material-ui/core/";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import { fetchHotelDetail } from "../../actions/hotel.js";
import HotelRooms  from './HotelRooms';
import Lock from "@material-ui/icons/Lock";
import Tooltip from "@material-ui/core/Tooltip";
import Slider from "react-slick";

import "./Hotel.scss";

class HotelDetail extends React.Component {
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.state = {
      tabValue: 0,
      images: [
        {
          caption: "",
          value: ""
        }
      ],
      hotelsDetail: {
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
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, newValue) {
    this.setState({ tabValue: newValue });
  }

  componentDidMount() {
    this.dispatch(fetchHotelDetail(this.props.hotel));
  }

  render() {
    const { tabValue } = this.state;
    const { hotel, hotelDetail, refreshing } = this.props;
    const images = this.props.hotelDetail.image;
    const settings = {
      arrows: true,
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      centerMode: true,
      variableWidth: true,
    };
   
    return (
      <Grid container style={{padding:'19px'}} alignItems="center" justify="center" spacing={2}>
     
        {refreshing && <CircularProgress disableShrink />}
        {!refreshing && (
          <Grid container className="hotel-detail">
            <Grid m="2rem" item display="flex" sm={12}>
              <Typography className="hotel-detail-heading" variant="h5">
                {hotelDetail.name}
              </Typography>
              <Grid container justify="space-between">
                <Grid item>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Icon>location_on</Icon>
                    {hotelDetail.address["address_Line"]}{" "}
                    {hotelDetail.address.city}{" "}
                    {hotelDetail.address.country.name}
                  </Box>
                </Grid>
                <Grid item>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Icon fontSize="small">phone</Icon>
                    {hotelDetail.telephone.toString()}
                  </Box>
                </Grid>
              </Grid>
              <Grid container justify="space-between">
                <Grid item>
                  <Typography>
                    {hotel.distance.value} km away from Airport
                  </Typography>
                </Grid>
                <Grid item>
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
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={12} style={{overflow:'hidden'}}>
            <Slider {...settings}>
              {images.map((image,i) => (<div key={i}>
                <img src={image.value}  alt={image.caption} />
              </div>))}
              
            </Slider>

            </Grid>
            <Box p={2}></Box>
            <Grid item sm={12}>
              <Paper square>
                <Tabs
                  value={tabValue}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={this.handleChange}
                >
                  <Tab label="Description" />
                  <Tab label="Amenities" />
                  <Tooltip title="Sign In to View Rooms">
                    <Tab label="Rooms"  icon={<Lock />} />
                  </Tooltip>
                </Tabs>
              </Paper>
              {tabValue === 0 && (
                <Typography component="div" style={{ padding: 8 * 3 }}>
                  <Typography className="content">
                    {hotelDetail.description}
                  </Typography>
                </Typography>
              )}
              {tabValue === 1 && (
                <Typography component="div" style={{ padding: 8 * 3 }}>
                  <ul className="content amenity">
                    {hotelDetail.amenity.map((amenity, i) => (
                      <li key={i}>{amenity.description}</li>
                    ))}
                  </ul>
                </Typography>
              )}
              {tabValue === 2 && (
                 <Typography component="div" style={{ padding: 8 * 3 }}>
                  <HotelRooms className="content"  hotel={hotel} images={images} />
                </Typography>
              )}
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  }
}
HotelDetail.propTypes = {
  hotel: PropTypes.object,
  hotelDetail: PropTypes.object
};
HotelDetail.defaultProps = {
  hotel: {},
  hotelDetail: {}
};
function mapStateToProps(state) {
  const { hotel, hotelDetail, refreshing, errorMessage } = state.HotelReducer;
  return {
    hotel,
    hotelDetail,
    refreshing,
    errorMessage
  };
}

export default connect(mapStateToProps)(HotelDetail);
