import React from 'react'
import Header from '../components/Header'

function PaymentValidation() {
  return (
    <div>
      <Header/>
      <div className='flex flex-col justify-center h-screen pb-40'>
        <div className='flex justify-center '>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" className="w-32">
                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
            </svg>
        </div>
        <div>
          <p className='text-xl font-bold text-center'>Merci !</p>
        </div>
        <div>
          <p className='text-lg font-bold text-center'>Le paiement bien a bien été effectué</p>
          <p className='text-center text-sm'>Vous allez reçevoir votre facture par mail. Votre ticket est disponible dans votre espace Mon Compte</p>
          <p className='text-center font-bold'>Ou</p>
          <div className='mx-4'>
            <button className='bg-blue-600 w-full text-white py-2 rounded-full'>Voir mon ticket</button>
          </div>
        </div>
      </div>
      
        
    </div>
  )
}

export default PaymentValidation