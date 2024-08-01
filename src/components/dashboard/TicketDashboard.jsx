import React, { useEffect, useState } from 'react'
import {axiosInstance} from "../../utils/axiosInstance"
import RowSlider from "../Row/RowSlider"
import Galery from '../Row/Galery';

function TicketDashboard() {

  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    try {
      const response = await axiosInstance.get('/events/participated');
      setEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getEvents();
  }, [])

  return (
    <>
        <div>
          {events && <Galery title={"Mes participations"} events={events}/>}
        </div>
    </>
  )
}

export default TicketDashboard