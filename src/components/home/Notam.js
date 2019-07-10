import React from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
const API = `${process.env.REACT_APP_API_URL}Airport/notam/`;

class Notam extends React.Component {
  _isMounted = true;
  constructor(props) {
    super(props);
    this.state = { notam: [] };
  }

  componentDidMount() {
    const icao = this.props.match.params.icao;
    fetch(API + icao)
      .then(response => response.json())
      .then(json => {
        if (this._isMounted) {
          this.setState({ notam: json.result });
        }
      });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { notam } = this.state;
    return (
      <Grid
        className="notam"
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        {notam.length === 0 && <CircularProgress disableShrink />}
        <Grid item xs={12}>
          {notam.map((notam, i) => (
            <p key={i}>
              <b>{notam.id}</b> - {notam.message}
            </p>
          ))}
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(Notam);
