import React from 'react';

const useStyles = ({
    marginTop: 'auto',
    backgroundColor: 'black',
});

class Catering extends React.Component {
    getMenu(){
      const api = 'http://192.168.1.175/Mach.Click.Greece.API/api/Document/5d25abfa5c2de87cf080a82d';
      const a = 'http://192.168.1.175/Mach.Click.Greece.API/api/Catering';
    }
    render(){
      return (
          <div>
            CATERING
          </div>
      )
    }
}


export default Catering;