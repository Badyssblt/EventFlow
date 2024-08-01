
import React, { useEffect, useState } from 'react';
import DateFormatter from '../../utils/DateFormater';
import { axiosInstance } from '../../utils/axiosInstance';
import { useNavigate } from 'react-router';

function TicketModal({ event, setShow, isPage = false }) {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const navigate = useNavigate();

  const getQrCode = async () => {
    try {
      const response = await axiosInstance.get(`/event/${event.event.id}/generateQrCode/checkIn`, {
        responseType: 'blob'
      });

      const qrCodeBlob = response.data;
      const reader = new FileReader();

      reader.onloadend = () => {
        setQrCodeUrl(reader.result);
      };

      reader.readAsDataURL(qrCodeBlob);
    } catch (error) {
      if(error.response.status === 409) navigate('/');
    }
  };

  useEffect(() => {
    if (event.hasOwnProperty('isIn')) {
        if (event.isIn) {
          getQrCode();
        } else {
          navigate('/'); 
        }
      }else {
        getQrCode();
      }
  }, [event.event.id]);

  return (
    <div className='fixed inset-0 bg-white z-50 flex flex-col' style={{zIndex: 100}}>
        <div className='py-2'>
            <h2 className='font-bold text-center text-lg mt-2'>Mon ticket</h2>
            <p className='text-center text-red-500 text-sm'>Veuillez présenter ce ticket lors de votre présentation à l'évènement</p>
        </div>
      
      <div className='flex-1 overflow-y-auto'>
        <div className='flex flex-col pb-4'>
          <div className='flex justify-center'>
            <div className='bg-white w-3/4 py-4 rounded-lg h-fit'>
              <div className="w-full overflow-hidden">
                <img src={`${import.meta.env.VITE_BASE_URL}/images/events/${event.event.imageName}`} alt="" className="object-cover w-full h-full rounded-xl"/>
              </div>
              <h2 className='text-xl font-semibold text-center my-4'>{event.event.name}</h2>
              <div className='border-t border-b mx-4'>
                <div className='flex justify-between p-2'>
                  <div className='flex flex-col'>
                    <p className='text-gray-400'>Nom:</p>
                    <span className='font-bold'>test</span>
                  </div>
                  <div className='flex flex-col'>
                    <p className='text-gray-400'>Date:</p>
                    <span className='font-bold'><DateFormatter dateIso={event.event.started_at}/></span>
                  </div>
                </div>
                <div className='flex justify-between p-2'>
                  <div className='flex flex-col'>
                    <p className='text-gray-400'>Prix total:</p>
                    <span className='font-bold'>24€</span>
                  </div>
                </div>
                <div className='flex justify-center'>
                  {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!isPage && <div className='px-4 pb-4'>
        <button className='w-full bg-blue-600 py-2 text-white rounded-full' onClick={() => setShow(false)}>Fermer</button>
      </div>}
      {isPage && <div className='px-4 pb-4'>
        <button className='w-full bg-blue-600 py-2 text-white rounded-full' onClick={() => navigate('/dashboard')}>Fermer</button>
      </div>}
    </div>
  );
}

export default TicketModal;
