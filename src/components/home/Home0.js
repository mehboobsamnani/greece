import React from "react";
import { connect } from "react-redux";
import { setAirport } from "actions/airport.js";
import MapGreece from "components/common/MapGreece";
import AirportsList from "components/common/AirportsList";
import Grid from "@material-ui/core/Grid";

class HomePage extends React.Component {
  _isMounted = true;

  constructor(props) {
    super(props);
    this.settingAirport = this.settingAirport.bind(this);
    this.dispatch = props.dispatch;
  }

  settingAirport(resp) {
    this.dispatch(setAirport(resp));
    this.props.history.push(`/airport/${resp.icao}/services?lat=${resp.latitude}&lon=${resp.longitude}`);
  }

  render() {
    return (
      <Grid container className="homepage" >
        <AirportsList>intro</AirportsList>
        <MapGreece parentCallback={this.settingAirport} />
      </Grid>
    );
  }
}
export default connect()(HomePage);
