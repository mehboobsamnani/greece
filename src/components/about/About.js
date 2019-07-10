import React from 'react';
import './About.scss';

const API = 'http://192.168.1.95/Mach.Click.Greece.API/api/Airport';


class Contact extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        hits: [],
      };
    }

    componentDidMount() {
      fetch(API)
        .then(response => response.json())
        .then(json => this.setState({ hits: json.result }));
    }

    render(){
      const { hits } = this.state;
      return (
        <div className="about">
          <ul>
            {hits.map((hit, i) => { return  <li key={i}>{hit.name}</li> })}
          </ul>
        </div>

      )
    }
}

export default Contact;
