import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import TicketModal from '../components/Modal/TicketModal'
import { axiosInstance } from '../utils/axiosInstance'
import { useLocation, useParams } from 'react-router'

function Ticket() {
    const location = useLocation();
    const ticketId = location.state.ticketId;
    const [event, setEvent] = useState();

    const getTicket = async () => {
        try {
            const response = await axiosInstance.get('/ticket/' + ticketId);
            setEvent(response.data);
        } catch (error) {
            
        }
    }
    

    useEffect(() => {
        getTicket();
    }, [])

  return (
    <div>
        <Header/>
        {event && <TicketModal event={event} setShow={true} isPage={true}/>}
    </div>
  )
}

export default Ticket