import React from 'react';
import Ticket from './ticket'

class Main extends React.Component {

  state = {
    tickets: [],
    location: '',
    destination: '',
    departureDate: '',
    adults: '',
    nonStop: '',
    max: ''

  }

  componentDidMount = () => {
    // this.fetchApiOne()
  }

  fetchApiOne = () => {
    fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${this.state.location}&destinationLocationCode=${this.state.destination}&departureDate=${this.state.departureDate}&adults=${this.state.adults}&nonStop=${this.state.false}&max=${this.state.max}`, {
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

  generateTickets = () => {
    return this.state.tickets.map(ticketObj =>
      <Ticket key={ticketObj.id} ticket={ticketObj}/>
    )
  }

  render () {
    if (this.state.tickets.length == true) {
      return(
        <div>
        LOADING
        </div>
      )
    } else {
      return(
        <div>
          <form>
            <p>
              Location <input type="text"/>
            </p>
            <p>
              Destination <input type="text"/>
            </p>
            <p>
              DepartureDate <input type="text"/>
            </p>
            <p>
              Adults <input type="text"/>
            </p>
            <p>
              NonStop <input type="text"/>
            </p>
            <p>
              Max <input type="text"/>
            </p>
          </form>
          <div>
            {this.generateTickets()}
          </div>
        </div>
      )
    }
  }
}

export default Main
