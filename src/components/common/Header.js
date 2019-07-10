import React from "react";
import Grid from "@material-ui/core/Grid";
import logo from "assets/images/logo_clickgreece_w.png";
import Login from "components/common/Login";
import LinearProgress from "@material-ui/core/LinearProgress";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link ,withRouter } from 'react-router-dom';

class Header extends React.Component {
  constructor(props){
    super(props);
    this.toHomepage = this.toHomepage.bind(this);
  }
  toHomepage(){
    this.props.history.push('/')
  }

  render() {
    const refreshing = this.props.refreshing;
    return (
      <div>
        { refreshing && <LinearProgress className="queryTop" variant="query" />}
        <header className="header">
          <Grid
            container
            justify="space-between"
            alignItems="center"
          >
          {/*<Link to={'/'} className="logoLink"><img src={logo} className="logo" alt="" /></Link>*/}
            <Login />
          </Grid>
        </header>
      </div>
    );
  }
}
Header.propTypes = {
  refreshing: PropTypes.bool
};
Header.defaultProps = {
  refreshing: false
};
function mapStateToProps(state) {
  const {  refreshing } = state.CommonReducer;
  return {
    refreshing,
  };
}

export default withRouter(connect(mapStateToProps)(Header));
