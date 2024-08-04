import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DateFormatter from '../../utils/DateFormater'
import InvitationModal from '../Modal/InvitationModal'

/**
 * CardEvent
 * @param {any} {event}
 * @returns {any}
 */
function Card({event, admin}) {

    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

  return (
    <>
    <Link to={"/event/" + event.id}>
    <div className='w-60'>
        <div className="h-64 w-full overflow-hidden">
            <img src={import.meta.env.VITE_BASE_URL + "/images/events/" + event.imageName} alt="" className="object-cover w-full h-full rounded-xl"/>
        </div>
        <div className='flex flex-row justify-between mt-2'>
            <h2 className='font-semibold'>{event.name}</h2>
            <h3 className='text-slate-600'>{event.city}</h3>
        </div>
        <div className='mt-2 flex items-end justify-between'>
            <div className='flex flex-row items-end '>
                <div className="h-12 w-12 overflow-hidden">
                    <img className="object-cover w-full h-full rounded-full" src="https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                </div>
                <div className='mb-2 ml-2'>
                <h3 className='font-semibold truncate w-[80px]'>{event.owner.name}</h3>
                </div>
            </div>
            <div className='mb-2'>
                <DateFormatter dateIso={event.started_at}/>
            </div>
        </div>
        

    </div>
    </Link>  
    {admin && <div>
        <button className='bg-blue-600 text-white w-full py-2 mt-2 rounded-full' onClick={toggleModal}>Inviter des personnes</button>
        <InvitationModal open={isOpen} setOpen={setIsOpen}/>
    </div>}
    </>
    )
}

export default Card