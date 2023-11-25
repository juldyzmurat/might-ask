import React from 'react';
//import Google from "../Login/LoginAPI";
//import { GoogleOAuthProvider } from '@react-oauth/google'; 
//import gif from '../../80cat.gif';
//import CalendarComponent from '../GoogleCalenderComponents/Calender';      


const OptimizedSchedule = () => {
    const calendarUrl = 'https://calendar.google.com/calendar/embed?src=enh1NEBjYXNlLmVkdQ';

    return (
        <div>
            <iframe
                src={calendarUrl}
                style={{ border: '0', width: '800px', height: '600px', frameborder: '0', scrolling: 'no' }}
            />
        </div>
    );
};

 
export default OptimizedSchedule;

