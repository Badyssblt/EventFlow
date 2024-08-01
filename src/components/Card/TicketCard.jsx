import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DateFormatter from '../../utils/DateFormater';
import TicketModal from '../Modal/TicketModal';

/**
 * CardEvent
 * @param {any} {event}
 * @returns {any}
 */
function TiketCard({event}) {

    const [show, setShow] = useState(false);


  return (
    <div className='w-full'>
    <Link to={"/event/" + event.event.id} >
    <div className='w-full'>
        <div className="h-64 w-80 overflow-hidden">
            <img src={import.meta.env.VITE_BASE_URL + "/images/events/" + event.event.imageName} alt="" className="object-cover w-full h-full rounded-xl"/>
        </div>
        <div className='flex flex-row justify-between mt-2'>
            <h2 className='font-semibold'>{event.event.name}</h2>
            <h3 className='text-slate-600'>{event.event.city}</h3>
        </div>
        <div className='mt-2 flex items-end justify-between'>
            <div className='flex flex-row items-end '>
                <div className="h-12 w-12 overflow-hidden">
                    <img className="object-cover w-full h-full rounded-full" src="https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                </div>
                <div className='mb-2 ml-2'>
                    <h3 className='font-semibold'>{event.event.owner.name}</h3>
                </div>
            </div>
            <div className='mb-2'>
                <DateFormatter dateIso={event.event.started_at}/>
            </div>
        </div>


    </div>
    </Link>  
    <div className='w-full mt-2 flex justify-center'>
            <button className='flex w-1/2 justify-center bg-blue-600 text-white rounded-full py-2' onClick={() => setShow(!show)}>Voir le ticket</button>
    </div>
    {show && <TicketModal event={event} setShow={setShow}/>}
    </div>
    )
}

export default TiketCard