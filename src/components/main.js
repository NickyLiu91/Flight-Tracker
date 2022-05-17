import React from 'react';
import Ticket from './ticket'

class Main extends React.Component {

  state = {
    tickets: [],
    originLocationCode: '',
    destinationLocationCode: '',
    departureDate: '',
    adults: '',
    children: '',
    infants: '',
    nonStop: '',
    max: ''
  }

  // originLocationCode=JFK
  // destinationLocationCode=HND
  // departureDate=2022-11-05
  // adults=1
  // children=1
  // infants=1
  // nonStop=false
  // max=50

  // ${base}originLocationCode=${this.state.originLocationCode}&destinationLocationCode=HND&departureDate=${this.state.departureDate}&adults=${this.state.adults}&nonStop=${this.state.nonStop}&max=${this.state.max}

  fetchApiOne = () => {
    let base = `https://test.api.amadeus.com/v2/shopping/flight-offers?`
    let stateObj = this.state
    for (const key in stateObj) {
      if (key == 'originLocationCode') {
        base += `${key}=${stateObj[key]}`
      } else if (key != 'tickets' && stateObj[key] != '') {
        base += `&${key}=${stateObj[key]}`
      }
    }
    console.log(base)
    fetch(`${base}`, {
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
              Location <input id="originLocationCode" type="text" value={this.state.originLocationCode} onChange={this.handleChange} placeHolder={"i.e.: JWD"}/>
            </p>
            <p>
              Destination <input id="destinationLocationCode" type="text" value={this.state.destinationLocationCode} onChange={this.handleChange} placeHolder={"i.e.: HND"}/>
            </p>
            <p>
              DepartureDate <input id="departureDate" type="text" value={this.state.departureDate} onChange={this.handleChange} placeHolder={"2022-05-16"}/>
            </p>
            <p>
              Adults <input id="adults" type="text" value={this.state.adults} onChange={this.handleChange} placeHolder={"i.e.: 1"}/>
            </p>
            <p>
              Children <input id="children" type="text" value={this.state.children} onChange={this.handleChange} placeHolder={"i.e.: 1"}/>
            </p>
            <p>
              Infants <input id="infants" type="text" value={this.state.infants} onChange={this.handleChange} placeHolder={"i.e.: 1"}/>
            </p>
            <p>
              NonStop <input id="nonStop" type="text" value={this.state.nonStop} onChange={this.handleChange} placeHolder={"i.e.: false"}/>
            </p>
            <p>
              Max <input id="max" type="text" value={this.state.max} onChange={this.handleChange} placeHolder={"i.e.: 50"}/>
            </p>
            <input type="submit" value="Submit"/>
          </form>
          {this.state.tickets.length > 0 ? <div id="ticketList">{this.generateTickets()}</div> : null}

        </div>
      )
    }
  }
}

export default Main
