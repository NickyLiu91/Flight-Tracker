import React from 'react'

const Ticket = (props) => {
  console.log(props.ticket)
  return (
    <div className="ticket">
      <p>Final Ticket Date: {props.ticket.lastTicketingDate}</p>
      <p>Price: {props.ticket.price.total} {props.ticket.price.currency}</p>
      <p>Number of seats: {props.ticket.numberOfBookableSeats}</p>
      <p>Oneway: {`${props.ticket.oneWay}`}</p>
      <p>Type: {props.ticket.type}</p>
      <p>Source: {props.ticket.source}</p>
    </div>
  )
}

export default Ticket
