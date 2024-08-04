import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../utils/axiosInstance'
import { useLocation, useNavigate, useParams } from 'react-router'
import Header from '../components/Header';
import SuccessCheck from '../components/Notification/SuccessCheck';

function CheckVerification() {

    let { eventId, userId } = useParams();
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const check = async () => {
        try {
            const response = await axiosInstance.post('/event/' + eventId + '/checkIn/' + userId);
            setSuccess(true);
        } catch (error) {
            navigate('/');
        }
    }

    useEffect(() => {
        check();
       
    })

  return (
    <>
    <Header/>
    <div>
        {success && <div>
            <SuccessCheck/>
            </div>}
    </div>
    </>
  )
}

export default CheckVerification