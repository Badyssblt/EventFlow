import React, { useState } from 'react'
import getUser from '../utils/UserUtils';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

function Header() {
    const [mobileMenu, setMobileMenu] = useState(false);

    const toggleMenu = () => {
        setMobileMenu(!mobileMenu);
    }

    const user = getUser();



  return (
    <>
    {mobileMenu && <div className='fixed top-0 left-0 w-full h-screen bg-white flex justify-center items-center ' style={{ zIndex: 100 }}>
        <button onClick={toggleMenu} className='absolute right-4 top-4'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            
        </button>
        <div className='mb-8'>
                <nav aria-label="Global">
                <ul className="flex flex-col items-start">
                    <li>
                      <Link className="text-gray-500 transition hover:text-gray-500/75 font-bold" to={"/events"}>Tous les évènements</Link>
                    </li>

                    <li>
                    <a className="text-gray-500 transition hover:text-gray-500/75 font-bold" href="#"> Rechercher </a>
                    </li>
                </ul>
                </nav>
            </div>

    </div>}
    <header className="bg-white">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      <div className="md:flex md:items-center md:gap-12">
        <Link to={"/"}>
        EventFlow
        </Link>
      </div>

      <div className="hidden md:block">
        <nav aria-label="Global">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Tous les évènements </a>
            </li>

            <li>
              <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Rechercher </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-4">

        {!user && <div className="sm:flex sm:gap-4">
          <Link to={"/login"} className="rounded-md bg-blue-700 px-5 py-2.5 text-sm font-medium text-white shadow">
            Se connecter
          </Link>


          <div className="hidden sm:flex">
            <a
              className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
              href="#"
            >
              S'inscrire
            </a>
          </div>
        </div>}
        {
          user && 
          <div className="sm:flex sm:gap-4">
            <Link className="rounded-md bg-blue-700 px-5 py-2.5 text-sm font-medium text-white shadow" to="/dashboard">
            Dashboard
            </Link>


        </div>
        }

        <div className="block md:hidden" onClick={toggleMenu}>
          <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</header>
</>
  )
}

export default Header