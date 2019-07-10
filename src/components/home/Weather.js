import React from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { withRouter } from "react-router-dom";

const API = `${process.env.REACT_APP_API_URL}Airport/weatherMetar/`;

class Weather extends React.Component {
  _isMounted = true;

  constructor(props) {
    super(props);
    this.state = {
      airport: props.airport,
      data_fetch: false,
      weather: [
        {
          wind: { degrees: "", speed_kts: "", speed_mph: "", speed_mps: "" },
          temperature: { celsius: "", fahrenheit: "" },
          dewpoint: { celsius: "", fahrenheit: "" },
          humidity: { percent: "" },
          barometer: { hg: "", hpa: "", kpa: "", mb: "" },
          visibility: {
            miles: "",
            miles_float: "",
            meters: "",
            meters_float: ""
          },
          elevation: { feet: "", meters: "" },
          location: { coordinates: [0, 0], type: "Point" },
          icao: "LGAL",
          observed: "2019-06-25T14:50:00Z",
          raw_text: "",
          station: { name: "" },
          heat: {
            index: {
              celsius: "",
              fahrenheit: ""
            }
          },
          clouds: [{ code: "", text: "" }],
          flight_category: "",
          conditions: []
        }
      ]
    };
  }

  componentDidMount() {
    const icao = this.props.match.params.icao;
    fetch(API + icao)
      .then(response => response.json())
      .then(json => {
        if (this._isMounted) {
          this.setState({ data_fetch: true });
          this.setState({
            weather: Object.assign(this.state.weather, json.result)
          });
        }
      });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { weather, data_fetch } = this.state;

    return (
      <Grid
        className="Weather"
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        {!data_fetch && <CircularProgress disableShrink />}
        {data_fetch && (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="weather-property"
                  align="left"
                >
                  {weather[0].raw_text}{" "}
                </TableCell>
              </TableRow>
              {!!weather[0].wind && (
                <TableRow>
                  <TableCell className="weather-property" align="left">
                    wind
                  </TableCell>
                  <TableCell align="left">
                    from the {weather[0].wind.degrees} degrees at{" "}
                    {weather[0].wind.speed_mph} MPH ({weather[0].wind.speed_kts}{" "}
                    knots; {weather.speed_mps} m/s)
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell className="weather-property" align="left">
                  temperature
                </TableCell>
                <TableCell align="left">
                  {weather[0].temperature.celsius}°C (
                  {weather[0].temperature.fahrenheit}°F)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="weather-property" align="left">
                  dewpoint
                </TableCell>
                <TableCell align="left">
                  {weather[0].dewpoint.celsius}°C (
                  {weather[0].dewpoint.fahrenheit}°F)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="weather-property" align="left">
                  humidity
                </TableCell>
                <TableCell align="left">
                  {weather[0].humidity.percent}%{" "}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="weather-property" align="left">
                  barometer
                </TableCell>
                <TableCell align="left">
                  {weather[0].barometer.hg} inches Hg ({weather[0].barometer.mb}{" "}
                  mb)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="weather-property" align="left">
                  visibility
                </TableCell>
                <TableCell align="left">
                  {weather[0].visibility.miles} or more miles{" "}
                  {weather[0].visibility.miles_float} km)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="weather-property" align="left">
                  elevation
                </TableCell>
                <TableCell align="left">
                  {weather[0].elevation.feet} feet /{" "}
                  {weather[0].elevation.meters} meters
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="weather-property" align="left">
                  location
                </TableCell>
                <TableCell align="left">
                  Latitude: {weather[0].location.coordinates[0]}, Longitutde{" "}
                  {weather[0].location.coordinates[1]}{" "}
                </TableCell>
              </TableRow>
              {!!weather[0].heat && (
                <TableRow>
                  <TableCell className="weather-property" align="left">
                    heat Index
                  </TableCell>
                  <TableCell align="left">
                    {weather[0].heat.index.celsius}°C (
                    {weather[0].heat.index.fahrenheit}°F)
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell className="weather-property" align="left">
                  Clouds
                </TableCell>
                <TableCell align="left">
                  {weather[0].clouds[0].code} ({weather[0].clouds[0].text})
                </TableCell>
              </TableRow>
              {weather[0].conditions.length > 1 && (
                <TableRow>
                  <TableCell align="left">conditions:</TableCell>
                  <TableCell align="left" />
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </Grid>
    );
  }
}

export default withRouter(Weather);
