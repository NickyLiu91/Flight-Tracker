import React from 'react';
import Ticket from './ticket'

class Main extends React.Component {

  componentDidMount = () => {
    // console.log(process.env.REACT_APP_KEY)
    // console.log(process.env.REACT_APP_SECRET)
    this.fetchApiOne()
    // this.getToken()
  }

  fetchApiOne = () => {
    fetch('https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=JFK&destinationLocationCode=HND&departureDate=2022-11-05&adults=1&nonStop=false&max=50', {
      method: 'GET',
      headers: {
        Authorization: `Bearer wyfEZvHYJuWSemS15T9qM41FSkJf`
      }
    })
    .then(res => res.json())
    .then(json => console.log(json))
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
