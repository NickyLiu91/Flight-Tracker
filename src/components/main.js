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
    max: '',
    locationName: '',
    allAirports: []
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

  searchLocationName = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    }, () => {
      fetch(`https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=${this.state.locationName}&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_LOCATION_ACCESS}`
        }
      })
      .then(res => res.json())
      .then(res => {
        let allCodes = res.data.map(obj => {return {name: obj.name, code: obj.iataCode}})

        this.setState({
          allAirports: allCodes
        }, () => {console.log(this.state.allAirports)})
      })
    })
  }

  generateListOfCodes = () =>  {
    this.state.allAirports.map(city =>
      <li>{city.name}</li>
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
        <div id="main">
          <form onSubmit={this.handleSubmit}>
            <p>
              Location <input id="originLocationCode" type="text" value={this.state.originLocationCode} onChange={this.handleChange} placeholder={"i.e.: JWD"}/>
            </p>
            <p>
              Destination <input id="destinationLocationCode" type="text" value={this.state.destinationLocationCode} onChange={this.handleChange} placeholder={"i.e.: HND"}/>
            </p>
            <p>
              DepartureDate <input id="departureDate" type="text" value={this.state.departureDate} onChange={this.handleChange} placeholder={"2022-05-16"}/>
            </p>
            <p>
              Adults <input id="adults" type="text" value={this.state.adults} onChange={this.handleChange} placeholder={"i.e.: 1"}/>
            </p>
            <p>
              Children <input id="children" type="text" value={this.state.children} onChange={this.handleChange} placeholder={"i.e.: 1"}/>
            </p>
            <p>
              Infants <input id="infants" type="text" value={this.state.infants} onChange={this.handleChange} placeholder={"i.e.: 1"}/>
            </p>
            <p>
              NonStop <input id="nonStop" type="text" value={this.state.nonStop} onChange={this.handleChange} placeholder={"i.e.: false"}/>
            </p>
            <p>
              Max <input id="max" type="text" value={this.state.max} onChange={this.handleChange} placeholder={"i.e.: 50"}/>
            </p>
            <input type="submit" value="Submit"/>
          </form>
          <button onClick={this.test}>Click</button>
          <p>
            Location Name <input id="locationName" type="text" value={this.state.locationName} onChange={this.searchLocationName} placeholder={"i.e.: New York"}/>
          </p>
          <ul>
            {this.generateListOfCodes()}
          </ul>
          {this.state.tickets.length > 0 ? <div id="ticketList">{this.generateTickets()}</div> : null}

        </div>
      )
    }
  }
}

export default Main
