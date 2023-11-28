import React from "react";
import OptimizedSchedule from "./optimizedschedule";
import PinnedSubheaderList from "../TaskVisComponents/listscroller";
//import Google from "../Login/LoginAPI";
//import { GoogleOAuthProvider } from '@react-oauth/google';
//import gif from '../../80cat.gif';
//import CalendarComponent from '../GoogleCalenderComponents/Calender';

const Schedule = () => {
    
  return (
    <div className="Schedule">
        <div style={{
            border: "0",
            width: "800px",
            height: "600px",
            frameborder: "0",
            scrolling: "no",
            }}
        >
        <OptimizedSchedule/>
        </div>
    </div>
  );
};

export default Schedule;
