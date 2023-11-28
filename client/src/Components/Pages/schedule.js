import React from 'react';
import OptimizedSchedule from './optimizedschedule';
//import Google from "../Login/LoginAPI";
//import { GoogleOAuthProvider } from '@react-oauth/google'; 
//import gif from '../../80cat.gif';
//import CalendarComponent from '../GoogleCalenderComponents/Calender';      


const Schedule = () => {
    const orderedTasks = OptimizedSchedule;

    return (
        <div>
            <iframe
                src={orderedTasks}
                style={{ border: '0', width: '800px', height: '600px', frameborder: '0', scrolling: 'no' }}
            />
        </div>
    );
};

 
export default Schedule;

