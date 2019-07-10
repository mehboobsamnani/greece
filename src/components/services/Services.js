import React from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import { uniqBy, orderBy } from "lodash";
import LinearProgress from "@material-ui/core/LinearProgress";
import Aircrafts from "./Aircraft";
import PdfLink from "./Pdf";
import { withRouter } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import { toggleRefresh } from "actions/index.js";
import { connect } from "react-redux";

const API = `${process.env.REACT_APP_API_URL}service/`;
const API_aircraft = `${process.env.REACT_APP_API_URL}Aircraft`;
const API_prices = `${process.env.REACT_APP_API_URL}Service/PriceByAircraft/`;

class Services extends React.Component {
  _isMounted = true;
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      aircraft: [],
      aircraftFlag: false,
      loading: false,
      tceReady: false
    };
    this.getPrices = this.getPrices.bind(this);
  }

  componentDidMount() {
    if (!!localStorage.token) {
      fetch(API_aircraft)
        .then(response => response.json())
        .then(json => {
          let aircraft = json.result.map(aircraft => ({
            value: aircraft.id,
            label: aircraft.aircraftType
          }));
          this.setState({ aircraft: aircraft });
          this.setState({ aircraftFlag: true });
        });
    }

    fetch(API)
      .then(response => response.json())
      .then(json => {
        if (this._isMounted) {
          let services = uniqBy(json.result, "name");
          services = orderBy(services, ["sortOrder"], ["asc"]);
          this.setState({ services: services });
        }
      });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  getPrices(id) {
    this.setState({ loading: true });
    this.props.dispatch(toggleRefresh(true));
    fetch(API_prices + id, {
      method: "GET",
      withCredentials: true,
      credentials: "include",
      headers: {
        Authorization: "Bearer " + localStorage.token,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log("unAuthorized", json);
        // if (json.statusCode === 401){
        //   alert('Session Expired, Please login again')
        //   //this.props.history.push('/')
        // }
        let services = uniqBy(json.result, "name");
        services = orderBy(services, ["sortOrder"], ["asc"]);
        this.setState({ services: services });
        this.setState({ loading: false });
        this.setState({ tceReady: true });
        this.props.dispatch(toggleRefresh(false));
      });
  }

  aircraftSelected = v => {
    console.log("aircraft selected", v);
    this.getPrices(v.value);
  };

  render() {
    const { services } = this.state;
    const icao = this.props.airport.icao;
    return (
      <div>
        <PdfLink
          className={!this.state.tceReady && "hide"}
          data={this.state.services}
        />
        {this.state.loading && (
          <LinearProgress className="queryBottom" variant="query" />
        )}
        {this.state.aircraftFlag && (
          <Aircrafts
            list={this.state.aircraft}
            onSelect={this.aircraftSelected}
          />
        )}

        <Grid
          className="services"
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          {services.length === 0 && <CircularProgress disableShrink />}
          <Grid item xs={12}>
            <ol>
              {services.map((service, i) => {
                if (service.serviceType === "NOE" && service.icao === "LGAV") {
                  return (
                    <li key={i}>
                      {service.name}{" "}
                      {!!service.price && (
                        <span className="right">
                          {service.price + " " + service.currency}
                        </span>
                      )}
                    </li>
                  );
                } else {
                  return (
                    <li key={i}>
                      {service.name}{" "}
                      {!!service.price && (
                        <span className="right">
                          {service.price + " " + service.currency}
                        </span>
                      )}
                    </li>
                  );
                }
              })}
            </ol>
            <p>
              Maintenance services may be arranged and provided in this airport,
              contact us for more information
            </p>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { refreshing } = state.CommonReducer;
  return { refreshing };
}
export default withRouter(connect(mapStateToProps)(Services));
