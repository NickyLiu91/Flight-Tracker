import React from 'react';
import Ticket from './ticket'

class Main extends React.Component {

  // this.state = {
  //   flights: []
  // }

  componentDidMount = () => {
    this.fetchApiOne()
  }

  fetchApiOne = () => {
    fetch('https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=JFK&destinationLocationCode=HND&departureDate=2022-11-05&adults=1&nonStop=false&max=50', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS}`
      }
    })
    .then(res => res.json())
    // .then(json => {
    //   this.setState({
    //     flights: json.data
    //   })
    // })
  }

  render () {
    return(
      <div>
        <Ticket />
      </div>
    )
  }
}

export default Main
