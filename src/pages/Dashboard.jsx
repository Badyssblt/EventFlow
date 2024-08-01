import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import TabBar from '../components/dashboard/TabBar';
import Home from './Home';
import HomeDashboard from '../components/dashboard/HomeDashboard';
import EventDashboard from '../components/dashboard/EventDashboard';
import { isTokenExpired } from '../utils/axiosInstance';
import { Navigate, redirect } from 'react-router';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; // Updated import for useNavigate
import TicketDashboard from '../components/dashboard/TicketDashboard';


function Dashboard() {

  const [content, setContent] = useState('home');
  const navigate = useNavigate();

  const renderContent = () => {
    switch(content){
      case 'home':
        return <HomeDashboard/>
      case 'events':
        return <EventDashboard/>
      case 'tickets':
        return <TicketDashboard/>
      default: 
        return <Home/>
    }
  }

  const loader = () => {

  }

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('token');
      if (!token || isTokenExpired(token)) {
        navigate('/login');
      }
    }

    checkAuth();

  }, [])

  return (
    <div className='pb-6'>
    <Header/>
    <div className='px-4'>
      {renderContent()}
    </div>
    <TabBar setContent={setContent}/>
    </div>
  )
}

export default Dashboard