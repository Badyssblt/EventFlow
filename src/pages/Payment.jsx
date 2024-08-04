import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../components/Form/PaymentForm';
import Header from '../components/Header';
import { useLocation, useNavigate, useParams } from 'react-router';
import { axiosInstance, isTokenExpired } from '../utils/axiosInstance';
import Cookies from 'js-cookie';

function Payment() {

    const navigate = useNavigate();
    const location = useLocation();
    const { eventId } = useParams();

    if (!location.state) {
        navigate('/');
    }

    const price = location.state ? location.state.price : null;


    const [event, setEvent] = useState();

    const getEvent = async () => {
        try {
            const response = await axiosInstance.get('/event/' + eventId);
            setEvent(response.data);
        } catch (error) {
        }
    }

    useEffect(() => {
        if(location.state == null) navigate('/event/' + eventId);
        if(Cookies.get('token') && isTokenExpired(Cookies.get('token'))) navigate('/login');
        getEvent();
        console.log(price);
    }, [])

    const stripePromise = loadStripe('pk_test_51NiItcEulzwDXkR892rdv8Sz3BbZxi7HESLuwLjYCPfpFY6NUMYWHUIgg9EZGrBYptLX4hMNHOxxzXHX7PT7xoiC00wBw9SrIT');

  return (
    <div>
        <Header/>
        {event && 
        <div>
            <div className='flex justify-between my-4 px-4'>
                <button onClick={() => navigate(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </button>
                <p className='font-semibold text-lg'>Récapitulatif de ma commande</p>
            </div>
            <div className='px-4'>
                <div className="h-64 w-full overflow-hidden">
                    <img src={import.meta.env.VITE_BASE_URL + "/images/events/" + event.event.imageName} alt="" className="object-cover w-full h-full rounded-xl"/>
                </div>
                <div className='border border-gray-300 rounded-lg px-4 py-2 mt-4'>
                    <p className='font-semibold text-lg'>Résumé de la commande</p>
                    <div>
                        <p className='flex justify-between text-gray-500'>Prix de la place: <span className='font-semibold text-black'>{price} €</span></p>
                        <p className='flex justify-between text-gray-500'>Nombre de place: <span className='font-semibold text-black'>1</span></p>
                        <p className='flex justify-between text-gray-500'>Total: <span className='font-semibold text-black'>{price} €</span></p>
                    </div>
                </div>
            </div>
        </div>
        }
        
        <Elements stripe={stripePromise}>

        <PaymentForm eventId={eventId} amount={price}/>
    </Elements>
    </div>
    
  )
}

export default Payment