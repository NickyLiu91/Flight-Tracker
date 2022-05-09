import React from 'react';
import Ticket from './ticket'

class Main extends React.Component {

  state = {
    tickets: []
  }

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
    .then(json => {
      this.setState({
        tickets: json.data
      })
    })
  }

  showState = () => {
    console.log(this.state)
  }

  render () {
    return(
      <div>
        <Ticket />
        <button onClick={this.showState}>STATE</button>
      </div>
    )
  }
}

export default Main
