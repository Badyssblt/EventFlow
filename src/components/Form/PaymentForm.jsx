// src/components/CheckoutForm.js
import React, { useState } from 'react';
import { CardElement, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { axiosInstance } from '../../utils/axiosInstance';
import LoaderButton from '../Loader/LoaderButton';
import { useNavigate } from 'react-router';

const PaymentForm = ({eventId, amount}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [ticketIdentifier, setTicketIdentifier] = useState();
    const navigate = useNavigate();

    const book = async () => {
        try {
            const response = await axiosInstance.post('/event/' + eventId + '/join');
            setTicketIdentifier(response.data.id);
            return response.data.id;
        } catch (error) {
        } finally {
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        try {
            const response = await axiosInstance.post('/create-payment-intent', { amount });
            const { clientSecret } = response.data;

            const cardElement = elements.getElement(CardNumberElement);
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (error) {
                setError(error.message);
            } else {
                const ticketId = await book();
                navigate('/ticket', {state: {ticketId: ticketId}})
            }
        } catch (error) {
            console.error('Error creating payment intent:', error);
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className='px-4 py-2'>
            <div className="flex flex-col space-y-2">
                <label htmlFor="card-number" className="text-gray-700">Numéro de carte</label>
                <div id="card-number" className="p-2 border border-gray-300 rounded-md">
                    <CardNumberElement />
                </div>
            </div>

            <div className="flex space-x-4">
                <div className="flex flex-col space-y-2 flex-1">
                    <label htmlFor="card-expiry" className="text-gray-700">Date d'expiration</label>
                    <div id="card-expiry" className="p-2 border border-gray-300 rounded-md">
                        <CardExpiryElement />
                    </div>
                </div>

                <div className="flex flex-col space-y-2 flex-1">
                    <label htmlFor="card-cvc" className="text-gray-700">CVC</label>
                    <div id="card-cvc" className="p-2 border border-gray-300 rounded-md">
                        <CardCvcElement />
                    </div>
                </div>
            </div>
            <div>
                {error && <p className='text-red-500 text-center mt-4'>{error}</p>}
            </div>
            <button type="submit" className='bg-blue-600 w-full text-white rounded-full py-2 mt-4 flex justify-center gap-2' disabled={!stripe || loading}>
                Payer
                <LoaderButton state={loading}/>
            </button>
        </form>
    );
};

export default PaymentForm;
