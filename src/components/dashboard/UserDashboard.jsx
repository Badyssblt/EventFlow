import React from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router';

function UserDashboard() {

    const navigate = useNavigate();

    const logout = () => {
        Cookies.remove('token');
        navigate('/');
    }

  return (
    <>
    <button onClick={logout}>Se déconnecter</button>
    </>
  )
}

export default UserDashboard