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

  fetchApiOne = () => {
    fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${this.state.location}&destinationLocationCode=${this.state.destination}&departureDate=${this.state.departureDate}&adults=${this.state.adults}&nonStop=${this.state.nonStop}&max=${this.state.max}`, {
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

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.fetchApiOne()
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
        <div id="main">
          <form onSubmit={this.handleSubmit}>
            <p>
              Location <input id="location" type="text" value={this.state.location} onChange={this.handleChange}/>
            </p>
            <p>
              Destination <input id="destination" type="text" value={this.state.destination} onChange={this.handleChange}/>
            </p>
            <p>
              DepartureDate <input id="departureDate" type="text" value={this.state.departureDate} onChange={this.handleChange}/>
            </p>
            <p>
              Adults <input id="adults" type="text" value={this.state.adults} onChange={this.handleChange}/>
            </p>
            <p>
              NonStop <input id="nonStop" type="text" value={this.state.nonStop} onChange={this.handleChange}/>
            </p>
            <p>
              Max <input id="max" type="text" value={this.state.max} onChange={this.handleChange}/>
            </p>
            <input type="submit" value="Submit" />
          </form>
          <div id="ticketList">
            {this.generateTickets()}
          </div>
        </div>
      )
    }
  }
}

export default Main
