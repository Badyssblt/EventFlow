import React, { useEffect, useState } from 'react'
import RowSlider from '../Row/RowSlider'
import Loader from '../Loader/Loader';
import { axiosInstance } from '../../utils/axiosInstance';

function HomeDashboard() {

    const [eventToCome, setEventToCome] = useState([]);
    const [userEvent, setUserEvent] = useState([]);
    const [loading, setLoading] = useState(false);


    const getUserEvents = async () => {
        setLoading(true)

        try {
            const response = await axiosInstance.get('/myevents');
            setUserEvent(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }


    const getEventsToCome = async () => {
        setLoading(true)
        try {
            const response = await axiosInstance.get('/events/user');
            setEventToCome(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        getEventsToCome();
        getUserEvents();
   }, [])


  return (
    <>
    <div>
        <h2 className='font-bold text-xl'>Bon retour !</h2>
        <p>John Doe</p>
    </div>
        <Loader state={loading}/>
       <RowSlider title={"Evènements à venir"} events={eventToCome}/>
       <RowSlider title={"Mes évènements"} events={userEvent}/>
    </>
  )
}

export default HomeDashboard