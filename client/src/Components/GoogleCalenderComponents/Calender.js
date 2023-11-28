import React, { useState, useEffect } from "react";
import { Calendar } from "react-calendar";
import { google } from "googleapis";

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchEvents = async () => {
      // Set up Google Calendar API credentials
      const clientId = "the sercret codes";
      const clientSecret = "the sercret codes";
      const redirectUri = "http://localhost:3000";

      const oauth2Client = new google.auth.OAuth2(
        clientId,
        clientSecret,
        redirectUri,
      );

      // Set your access token (you should implement OAuth in a production environment)
      const accessToken = "YOUR_ACCESS_TOKEN";
      oauth2Client.setCredentials({ access_token: accessToken });

      // Set up the Google Calendar API
      const calendar = google.calendar({ version: "v3", auth: oauth2Client });

      // Fetch events from the primary calendar
      const response = await calendar.events.list({
        calendarId: "primary",
        timeMin: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
        ).toISOString(),
        timeMax: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + 1,
        ).toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      });

      const fetchedEvents = response.data.items || [];
      setEvents(fetchedEvents);
    };

    fetchEvents();
  }, [date]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div>
      <h1>Google Calendar</h1>
      <Calendar onChange={handleDateChange} value={date} />
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.summary}</li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarComponent;
