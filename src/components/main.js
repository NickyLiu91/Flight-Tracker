import React from 'react';
// require('dotenv').config();

class Main extends React.Component {

  componentDidMount = () => {
    console.log(process.env.REACT_APP_KEY)
    console.log(process.env.REACT_APP_SECRET)
    // this.fetchApiOne()
  }

  // fetchApiOne = () => {
  //   fetch('https://test.api.amadeus.com/v2/shopping/flight-offers')
  //   .then(res => res.json())
  //   .then(json => console.log(json))
  // }
  //
  // API Key: '2a5nmAm8KDcA4WsvvBBXszQBPXSjmw6v'
  // API Secret: 'jUnbJhzQiJcL1nLD'

  render () {
    return(
      <div>
      test
      </div>
    )
  }
}

export default Main
