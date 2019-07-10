import React from 'react';

const useStyles = ({
    marginTop: 'auto',
    backgroundColor: 'black',
});

class Footer extends React.Component {
    render(){

      return (
        <footer style={useStyles}  className="footer">Footer</footer>
      )
    }
}


export default Footer;