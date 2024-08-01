import React, { useEffect } from 'react'
import Card from '../Card/Card'
import TicketCard from '../Card/TicketCard'

function Galery({title, events}) {
    return (
        <div className='my-8'>
            <h2 className='font-bold text-lg'>{title}</h2>
            <div className="flex flex-wrap justify-center gap-12 w-full px-4">
    
                {events && events.length > 0 ? events.map((event) => (
                        <div key={event.id}>
                            <TicketCard event={event}/>
                        </div>
                    )) : <p>Aucun évènement</p>}
            </div>
        </div>
      )
}

export default Galery