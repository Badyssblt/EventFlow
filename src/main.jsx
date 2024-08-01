import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from "./pages/Home.jsx"
import Dashboard from './pages/Dashboard.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login.jsx'
import Events from './pages/Events.jsx'
import Event from './pages/Event.jsx'
import Payment from './pages/Payment.jsx'
import PaymentValidation from './pages/PaymentValidation.jsx'
import Ticket from './pages/Ticket.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: '/events',
    element: <Events/>
  },
  {
    path: '/event/:eventId',
    element: <Event/>
  },
  {
    path: '/payment/:eventId',
    element: <Payment/>
  },
  {
    path: '/payment/success',
    element: <PaymentValidation/>
  },
  {
    path: '/ticket',
    element: <Ticket/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
