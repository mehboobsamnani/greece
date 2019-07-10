import React from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import getAirports from 'api/getAirports'
import { Link } from 'react-router-dom';
import logo from "assets/images/logo_clickgreece_w.png";


class AirportsAutocomplete extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      markers : [{
        iata: "",
        icao: "",
        latitude: "",
        longitude: "",
        name: ""
      }],
      markersFilterd:[]
    };
  }

  searchChange = (v)=> {
    //let v =  e.target.value
    this.setState({ search: v})
    this.filterMarkers(v)
  }

  filterMarkers = (v) => {
    if (v){
      let markersFilterd = this.state.markers
        .filter( marker =>
          marker.icao.toLowerCase().indexOf(v.toLowerCase()) > -1
          || marker.name.toLowerCase().indexOf(v.toLowerCase()) > -1
        )
      this.setState({markersFilterd: markersFilterd})
    }else{
      this.setState({markersFilterd: this.state.markers})
    }
  }

  async componentDidMount() {
    let airports = await getAirports()
    this.setState({ markers: airports , markersFilterd: airports });
  }

  render() {
    const { search } = this.state
    return (
      <><Link to={'/'} className="logoLink"><img src={logo} className="logo" alt="" /></Link>
      <TextField
        onChange={ e => this.searchChange(e.target.value) }
        value={search}
        id="standard-full-width"
        style={{ margin: '32px',width: 'calc(100% - 64px)'}}
        placeholder="type airport ICAO or name"
        margin="normal"
        variant="outlined"
        InputLabelProps={{ shrink: true, }}
        InputProps={{
          endAdornment: (<InputAdornment position="end"><IconButton onClick={ () => this.searchChange('')}><Icon>search</Icon></IconButton></InputAdornment>)
        }}
      /></>);
  }
}

export default AirportsAutocomplete;
