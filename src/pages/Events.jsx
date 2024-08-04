import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import RowSlider from '../components/Row/RowSlider';
import { axiosInstance } from '../utils/axiosInstance';
import Loader from '../components/Loader/Loader';

function Events() {

    const [eventsPopular, setEventsPopular] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [eventsByCategory, setEventsByCategory] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/events/popular');
            setEventsPopular(response.data);
        } catch (error) {
            setLoading(false);
        }
        setLoading(false);
    }

    const getEvents = async () => {
        try {
            const response = await axiosInstance.get('/events');
            const events = response.data;
            setEvents(events);
            groupEventsByCategory(events);
        } catch (error) {
            // Handle error
        }
    }

    const groupEventsByCategory = (events) => {
        const groupedEvents = events.reduce((acc, event) => {
            event.categories.forEach(category => {
                if (!acc[category.name]) {
                    acc[category.name] = [];
                }
                acc[category.name].push(event);
            });
            return acc;
        }, {});
        setEventsByCategory(groupedEvents);
    }

    useEffect(() => {
        fetchEvents();
        getEvents();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filterEvents = (events) => {
        if (!searchQuery) return events;
        return events.filter(event => 
            event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    return (
        <>
            <Loader state={loading} />
            <Header />
            <div className='mx-4'>
                <h2 className='font-bold text-lg'>Rechercher</h2>
                <input
                    type="text"
                    placeholder="Rechercher des événements..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className='w-full py-2 border pl-4 rounded-full'
                />
            </div>
            <div className='px-4'>
                <RowSlider title={"Evènement populaire"} events={filterEvents(eventsPopular).slice(0, 5)} />
                {Object.keys(eventsByCategory).map(categoryName => (
                    <RowSlider key={categoryName} title={categoryName} events={filterEvents(eventsByCategory[categoryName]).slice(0, 5)} />
                ))}
            </div>
        </>
    );
}

export default Events;
