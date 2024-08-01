import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { axiosInstance } from '../utils/axiosInstance';
import Loader from '../components/Loader/Loader';
import Header from '../components/Header';
import EventMap from '../components/EventMap';
import LoaderButton from '../components/Loader/LoaderButton';
import SuccessNotification from '../components/Notification/SuccessNotification';
import ErrorNotification from '../components/Notification/ErrorNotification';
import { Link } from 'react-router-dom';

function Event() {

    let { eventId } = useParams();
    const [event, setEvent] = useState();
    const [loading, setLoading] = useState(false);
    const [loadingBook, setLoadingBook] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [available, setAvailable] = useState(true);
    const [showErrorNotification, setShowErrorNotification] = useState("");

    const navigate = useNavigate();

    const getEvent = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/event/' + eventId);
            setEvent(response.data);
            if(response.data.last <= 0){
                setAvailable(false);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
        setLoading(false);
    }



    useEffect(() => {
        eventId = parseInt(eventId);
        getEvent();
        
    }, [])

  return (
    <>
    <Loader state={loading}/>
    <Header/>
    {showNotification && <SuccessNotification title={"La réservation a été prise en compte"} />}
    {showErrorNotification && <ErrorNotification title={showErrorNotification}/> }
    {event && event.event && <div className='flex flex-col px-4 mt-2 pb-24'>
        <div className='flex justify-between'>
            <button onClick={() => navigate(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
            </button>
            <h2 className='font-semibold'>Information de l'évènement</h2>
            <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
            </svg>
            </button>
        </div>
        <div className='relative mt-4'>
            <div className="h-64 w-full overflow-hidden">
                <img src={import.meta.env.VITE_BASE_URL + "/images/events/" + event.event.imageName} alt="" className="object-cover w-full h-full rounded-xl"/>
            </div>
            <div className='bg-white w-11/12 h-fit absolute bottom-2 left-1/2 transform -translate-x-1/2 px-4 rounded-md py-2 flex gap-4'>
                <div>
                <h2 className='font-semibold'>{event.event.name}</h2>
                <p>Place restante: {event.last}</p>
                </div>
            </div>
        </div>
        <div>
            <h2 className='font-semibold text-lg mt-2'>{event.event.name}</h2>
            <div className='mt-4'>
                <h2 className='font-semibold'>Description</h2>
                <p>{event.event.description ? event.event.description : 'Pas de description pour cet évènement'}</p>
            </div>
        </div>
        <div className='mt-4'>
            <div>
                <p className='flex'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {event.event.city}
                </p>
            </div>
            <div>
                <EventMap
                address={event.event.location}
                />
            </div>
        </div>
        <div className='fixed bottom-0 left-0  border w-full py-4 z-50 bg-white'>
            <div className='flex justify-between px-4'>
                <div>
                    <div>
                        <p className='text-sm text-gray-500 font-semibold'>Prix total</p>
                    </div>
                    <div>
                        <p><span className='text-xl font-bold text-blue-600'>{event.event.price} €</span> /Personne</p>
                    </div>
                </div>
                {event.isIn && <Link className='bg-blue-600 text-white px-6 py-1 rounded-full flex items-center gap-2' to={"/dashboard"}>Mon ticket</Link>}

                {  available && !event.isIn && <Link to={`/payment/${event.event.id}`} state={{price: event.event.price}} className='bg-blue-600 text-white px-6 py-1 rounded-full flex items-center gap-2' >
                    Je réserve
                    <LoaderButton state={loadingBook}/>
                </Link>}
                {  !available && !event.isIn && <button className='bg-gray-300 text-gray-600 px-6 py-1 rounded-full flex items-center gap-2'>
                    Je réserve
                    <LoaderButton state={loadingBook}/>
                </button>}
            </div>
        </div>
    </div>}
    </>
  )
}

export default Event