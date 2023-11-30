// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const CalendarEvents = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     // Function to fetch events from Google Calendar API
//     const fetchEvents = async () => {
//       try {
//         const calendarId = 'zxu4@case.edu';
//         const apiKey = 'AIzaSyCtkKfUMT6mTU5QYrNb2qaIIpwAEW04qIg';
//         const currentDate = new Date();
//         const startOfWeek = new Date(
//           currentDate.setDate(currentDate.getDate() - currentDate.getDay())
//         );
//         const endOfWeek = new Date(
//           currentDate.setDate(currentDate.getDate() + 6)
//         );

//         const response = await axios.get(
//           `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
//           {
//             params: {
//               key: apiKey,
//               timeMin: startOfWeek.toISOString(),
//               timeMax: endOfWeek.toISOString(),
//             },
//           }
//         );

//         setEvents(response.data.items);
//       } catch (error) {
//         console.error('Error fetching events:', error);
//       }
//     };

//     fetchEvents();
//   }, []); // Empty dependency array to run the effect only once on component mount

//   return (
//     <div>
//       <h2>Events for the Week</h2>
//       <ul>
//         {events.map((event) => (
//           <li key={event.id}>
//             <strong>{event.summary}</strong>
//             <br />
//             Start Time: {event.start.dateTime}
//             <br />
//             End Time: {event.end.dateTime}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CalendarEvents;
