import React from 'react';

const upcomingEventsDetailsPage = async({params}) => {
    const {id} = await params;

    const res = await fetch(`http://localhost:4000/upcoming-events/${id}`)
    const data = await res.json()
    console.log(data)
    return (
        <div>
            Upcomig Events Details Page
        </div>
    );
};

export default upcomingEventsDetailsPage;