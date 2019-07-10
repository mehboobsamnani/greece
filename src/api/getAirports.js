import { pick } from "lodash";
const API_Airport = `${process.env.REACT_APP_API_URL}Airport`;
const marker = {
  iata: null,
  icao: null,
  latitude: null,
  longitude: null,
  name: null
};

export default function getAirports() {
  return new Promise((resolve, reject) => {
    fetch(API_Airport, { cache: "force-cache" })
      .then(response => response.json())
      .then(json => {
        let airports = json.result;
        let filteredAirports = airports.map(airport =>
          pick(airport, Object.keys(marker))
        );
        // {
        //   let { iata, icao, name, latitude, longitude } = airport
        //   return { iata, icao, name, latitude, longitude }
        //   return (({ icao, name , latitude , longitude }) => ({ icao, name , latitude , longitude }))(airport)
        // }

        resolve(filteredAirports);
      })
      .catch(error => {
        console.error("Error:", error);
        reject(error);
      });
  });
}
