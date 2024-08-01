import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import Card from '../Card/Card'
import Loader from '../Loader/Loader'


function RowSlider({title, events}) {


  return (
    <div className='my-8'>
        
        <h2 className='font-bold text-lg'>{title}</h2>
        <div className="flex overflow-x-auto scroll-snap-x gap-6 ">

            {events && events.length > 0 ? events.map((event) => (
                    <div key={event.id} className="flex-shrink-0">
                        <Card event={event} />
                    </div>
                )) : <p>Aucun évènement à venir...</p>}
        </div>
    </div>
  )
}



export default RowSlider