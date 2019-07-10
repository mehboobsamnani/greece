import React from "react";
// import { render } from "react-dom";

import { Map, Marker, Popup,LayersControl } from "react-leaflet"
import {BingLayer} from 'react-leaflet-bing'
import 'leaflet/dist/leaflet.css';
import "./MapGreece.scss";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconX2 from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Button from "@material-ui/core/Button";

import getAirports from 'api/getAirports'
const BING_KEY = "AlKMmXInLFdVhCeCjVd6zkggdT9-UbKOlYwT2qxnZ50r5oNblJTmH2yhO90aVd1x";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconX2,
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [20, 32],
  shadowSize: [0,0],
  iconAnchor: [10, 32],
  // popupAnchor: [-3, -76],
  // shadowAnchor: [22, 94]
});

class MapGreece extends React.Component {
  constructor() {
    super();
    this.state = {
      markers : [],
      map: null,
      lat: 38,
      lng: 24,
      zoom: 6.75,
      zoomSnap: 0.25
    };

  };

  getAirportsMarkers = async() => {
    let airports = await getAirports()
    this.setState({ markers: airports });
  };

  mapRef = (ref) => {
    this.setState({ map: ref })
    // L.tileLayer
    //   .bing({ bingMapsKey: BING_KEY, imagerySet: "CanvasLight" })
    //   .addTo(ref);
  };

  componentDidMount() {
    this.getAirportsMarkers()
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    const { markers } = this.state;
    const { BaseLayer } = LayersControl;
    return (
      <Map
        className="MapGreece"
        center={position}
        zoom={this.state.zoom}
        zoomSnap={this.state.zoomSnap}
        ref={ this.mapRef }
        >
          <LayersControl >
            <BaseLayer checked name='Bing Maps Roads'>
              <BingLayer  bingkey={BING_KEY} type="Road"/>
            </BaseLayer>
          </LayersControl>
          {markers.map((marker,i) => (
          <Marker key={i}  position={[marker.latitude,marker.longitude]}>
            <Popup>
              {marker.name }<br/>
              {marker.iata +'/'+ marker.icao}<br/>
            <Button size="small" color="primary" onClick={() => { this.props.parentCallback(marker) }}>View Detail</Button>
            </Popup>
          </Marker>
        ))}
        </Map>

    );
  }
}

export default MapGreece;
