import React from "react";
import { connect } from "react-redux";
import { setAirport } from "actions/airport.js";
import MapGreece from "components/common/MapGreece";
import AirportsAutocomplete from "components/common/AirportsAutocomplete";
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
      <div className="homeBg">
        <AirportsAutocomplete>intro</AirportsAutocomplete>
        <div className="mainText">
          Click Aviation Network Greece is the region’s premier aviation services provider. We proudly offer our dedicated services at airports throughout
          Greece, helping you fly with ease and peace of mind.
          From a single piston engine to a wide-body aircraft, Click Aviation
          Network Greece is here to support you every step of the trip.
        </div>
      </div>
    );
  }
}
export default connect()(HomePage);
