import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { axiosInstance } from '../utils/axiosInstance';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import LoaderButton from '../components/Loader/LoaderButton';
import getUser from '../utils/UserUtils';
import { useNavigate } from 'react-router';
import SuccessNotification from '../components/Notification/SuccessNotification';


function CreateEvent() {


    const [value, onChange] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();



    const handleSubmit = async (event) => {
        event.preventDefault(); 
        const form = event.target;
        const formData = new FormData(form); 
        const localDateString = value.toLocaleString('sv-SE', { timeZoneName: 'short' });
        formData.append('isRecurring', false);
        formData.append('started_at', localDateString);
        setLoading(true);
        try {
            const response = await axiosInstance.post('/event', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                }
            });
            if(response.data){
                setSuccess(true);
            }
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
       

    }

    useEffect(() => {
        if(!getUser().roles.includes("ROLE_CREATOR")){
            navigate('/');
        }
    }, [])

  return (
    <>
    <Header/>
    <div>
        <h2 className='font-bold text-lg text-center'>Créer votre évènement</h2>
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col mx-4'>
                <label htmlFor="name">Nom de l'évènement</label>
                <input type="text" name="name" id="name" placeholder='Nom' className='border px-4 py-2'/>
            </div>
            <div className='flex flex-col mx-4'>
                <label htmlFor="description">Entrer la description de l'évènement</label>
                <textarea name="description" id="description" cols="30" rows="10" className='border px-4 py-2'></textarea>
            </div>
            <div className='flex flex-col mx-4'>
                <label htmlFor="started_at">Date du lancement</label>
                <DateTimePicker onChange={onChange} value={value} />
            </div>
            <div className='flex flex-col mx-4'>
                <label htmlFor="location">Adresse de l'évènement</label>
                <input type="text" name="location" id="location" placeholder='Adresse' className='border px-4 py-2'/>
            </div>
            <div className='flex flex-col mx-4'>
                <label htmlFor="city">Ville de l'évènement</label>
                <input type="text" name="city" id="city" placeholder='Ville' className='border px-4 py-2'/>
            </div>
            <div className='flex flex-col mx-4'>
                <label htmlFor="maxParticipants">Nombre maximum de participants</label>
                <input type="number" name="maxParticipants" id="maxParticipants" placeholder='Nombre de participants' className='border px-4 py-2'/>
            </div>
            <div className='flex flex-col mx-4'>
                <label htmlFor="price">Prix de la place</label>
                <input type="text" name="price" id="price" placeholder='Prix de la place' className='border px-4 py-2'/>
            </div>
            <div className='flex flex-col mx-4'>
                <label htmlFor="image">Image de l'évènement</label>
                <input type='file' name='image'/>
            </div>
            <div className='flex justify-center my-2'>
                <button type="submit" className='bg-blue-600 text-white px-6 py-2 rounded-full flex justify-center gap-2'>Créer l'évènement
                <LoaderButton state={loading}/>
                </button>
            </div>
            

        </form>
        {
            success && 
            <SuccessNotification title={"L'évènement a bien été créer"} subtitle="Votre demande sera examiné au près d'un administrateur"/>}
    </div>
    </>
  )
}

export default CreateEvent
