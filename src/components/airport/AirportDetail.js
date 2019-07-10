import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Notam from "../home/Notam";
import Weather from "../home/Weather";
import Hotel from "../hotel/Hotel";
import Services from "../services/Services";
import Catering from "../catering/Catering";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography"; 
import AppBar from '@material-ui/core/AppBar';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

class AirportDetail extends React.Component {
  constructor(props) {
    super(props);

    const tab = this.props.match.params.tab;

    this.state = {
      airport: { latitude: "", longitude: "" },
      open: false,
      value: tab
    };
    
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, newValue) {
    const icao = this.props.match.params.icao;
    const queryStrings = this.props.location.search;

    this.props.history.push(`/airport/${icao}/${newValue}${queryStrings}`);
    this.setState({ value: newValue });
  }

  render() {
    const { value } = this.state;
    const { airport ,history } = this.props;
    return (
      <div>
        <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab value="services" label="SERVICES" />
          <Tab value="hotel" label="HOTEL" />
          <Tab value="notam" label="NOTAM" />
          <Tab value="weather" label="WEATHER" />
          <Tab value="catering" label="CATERING" />
        </Tabs>
      </AppBar>
      
        <TabContainer dir="ltr">
          {value === "services" && <Services airport={airport} />}
          {value === "hotel" && <Hotel airport={airport} history={history} />}
          {value === "notam" && <Notam airport={airport} />}
          {value === "weather" && <Weather airport={airport} />}
          {value === "catering" && <Catering airport={airport} />}
        </TabContainer>
      </div>
    );
  }
}

AirportDetail.propTypes = {
  airport: PropTypes.object
};

AirportDetail.defaultProps = {
  airport: {}
}

function mapStateToProps(state) {
  const { airport } = state.AirportReducer;
  return {
    airport,
  };
}

export default withRouter(connect(mapStateToProps)(AirportDetail));

