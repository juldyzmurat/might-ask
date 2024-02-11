import React, { useState, useEffect } from "react";
import { GoogleData } from "../Login/LoginAPI";
import List from "@mui/material/List";
import approveIcon from "./approve.png";
// import { ContactlessRounded } from "@mui/icons-material";
import axios from 'axios';


const OptimizedSchedule = () => {
  const [data, setData] = useState([]);
  const [taskDurations, setTaskDurations] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);

  const formatDateTime = (dateTime) => {
    const formattedDate = dateTime.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
    });
    const formattedTime = dateTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} ${formattedTime}`;
  };

  

  useEffect(() => {
    const fetchAndSortData = async () => {
      try {
        // Fetch tasks from the database
        const response = await fetch(
          `http://localhost:5200/tasks/${GoogleData.profileObj.email}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const sortedData = await response.json();

        function compareByDeadline(a, b) {
          const dateOne = a.due;
          const dateTwo = b.due;
          return dateOne - dateTwo;
        }

        sortedData.sort(compareByDeadline);

        const filteredData = sortedData.filter(
          (task) => task.status === "to do" || task.status === "in progress"
        );

        const updatedData = [];

        //Load Google Calendar events
        // const calendarResponse = await fetch(
        //   `http://localhost:5200/calendar/${GoogleData.profileObj.email}`
        // );

  

        const fetchCalendarEvents = async (accessToken) => {
          try {
            const response = await axios.get(`https://www.googleapis.com/calendar/v3/calendars/primary/events`, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            });
            
            setCalendarEvents(response.data.items);

            // calendarEvents.forEach((event, index) => {
            //   const eventStartTime = new Date(event.start);
            //   const eventEndTime = new Date(event.end);
            
            //   console.log(event);
            //   console.log(event.end.dateTime);
            //   console.log(`Event ${index + 1}:`);
            // });
            // Update your component's state with these events
          } catch (error) {
            console.error("Error fetching calendar data", error);
          }
        };

        fetchCalendarEvents(GoogleData.accessToken);



      

        // Schedule tasks
        let currentTime = new Date();
        currentTime.setHours(6, 0, 0, 0);
        for (const task of filteredData) {
          const taskDuration = task.estDur / 60; // in minutes
          let startTime = new Date(currentTime);
          let endTime = new Date(startTime.getTime() + taskDuration * 60000);

          // Check if the endTime is after 11:59 PM and adjust it if needed
          if (
            endTime > new Date(endTime.getFullYear(), endTime.getMonth(), endTime.getDate(), 0, 0, 0, 0) &&
            endTime <= new Date(endTime.getFullYear(), endTime.getMonth(), endTime.getDate(), 6, 0, 0, 0)
          ) {            // Adjust the endTime to be 11:59 PM
            startTime = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), 23, 59, 0, 0);
          
            // Schedule the task for the next day at 6 AM
            const nextDay = new Date(startTime);
            nextDay.setDate(nextDay.getDate() + 1); // Move to the next day
            nextDay.setHours(6, 0, 0, 0); // Set the time to 6:00 AM
            startTime = new Date(nextDay);
            endTime = new Date(startTime.getTime() + taskDuration * 60000);
          }

          

          // Check for calendar events overlapping with the task
          let isOverlap = false;
          for (const event of calendarEvents) {
            const eventStart = new Date(event.start.dateTime);
            const eventEnd = new Date(event.end.dateTime);

            // Check if the task completely falls within the calendar event's time range
            if (startTime >= eventStart && endTime <= eventEnd) {
              isOverlap = true; // Task completely overlaps with the event
              break; // Exit the loop as there is already an overlap
            }

            // Check if the task starts or ends within the calendar event's time range
            if ((startTime >= eventStart && startTime <= eventEnd) || (endTime >= eventStart && endTime <= eventEnd)) {
              isOverlap = true; // Task partially overlaps with the event
              break; // Exit the loop as there is already an overlap
            }
          }

          if (isOverlap) {
            // If there is an overlap with a calendar event, adjust the task start time
            // and check again recursively for overlaps until there's no overlap
            const adjustTaskStartTime = (newStartTime) => {
              // Check if there is an overlap with another event
              const newEndTime = new Date(newStartTime.getTime() + taskDuration * 60000);
              const isAnotherOverlap = calendarEvents.some((event) => {
                const eventStart = new Date(event.startTime);
                const eventEnd = new Date(event.endTime);
                return newStartTime < eventEnd && newEndTime > eventStart; // Check for overlap
              });

              if (isAnotherOverlap) {
                // If there is still an overlap, adjust the start time and recheck
                const adjustedStartTime = new Date(newEndTime);
                adjustTaskStartTime(adjustedStartTime);
              } else {
                // No more overlaps, update task start and end times
                startTime = newStartTime;
                endTime = new Date(startTime.getTime() + taskDuration * 60000);
              }
            };

            // Adjust the task start time to avoid overlap
            adjustTaskStartTime(endTime);

            // Check if the new end time is before the deadline
            if (endTime <= task.due) {
              // Update current time
              currentTime = endTime;
              task.startTime = startTime;
              task.endTime = endTime;
              updatedData.push(task);
            }
            else{
              console.log(task.name,"cannot be scheudled");
              currentTime = startTime; // Update current time
              task.startTime = null; // Assign start time to the task
              task.endTime = null;   // Assign end time to the task
              updatedData.push(task);

            }
          } else {
            

            // No overlap with any calendar event
            // Update current time
            currentTime = endTime;
            task.startTime = startTime;
            task.endTime = endTime;
            updatedData.push(task);
          }
        }

        const durations = updatedData.map((task) => task.estDur / 60);
        setTaskDurations(durations);

        setData(updatedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchAndSortData();
  }, [calendarEvents]);

  const generateGoogleCalendarLink = (item) => {
    const formatGoogleCalendarDate = (date) => {
      return date.toISOString().replace(/[-:.]/g, "");
    };

    const startTimeUTC = formatGoogleCalendarDate(item.startTime);
    const endTimeUTC = formatGoogleCalendarDate(item.endTime);

    const googleCalendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      item.name
    )}&dates=${startTimeUTC}/${endTimeUTC}&details=${encodeURIComponent(
      item.description
    )}&location=${encodeURIComponent(item.location)}`;

    return googleCalendarLink;
  };

  return (
    <div className="container mt-4 d-flex justify-content-center align-items-center vh-500">
      <List>
        <div style={{ minHeight: "500px", maxHeight: "500px", overflowY: "scroll" }}>
          <table className="table">
            <thead style={{ position: "sticky", top: 0, backgroundColor: "white" }}>
              <tr>
                <th style={{ color: "#0020ff" }}>Task</th>
                <th style={{ color: "#0020ff" }}>Due</th>
                <th style={{ color: "#0020ff" }}>Start Time</th>
                <th style={{ color: "#0020ff" }}>End Time</th>
                <th style={{ color: "#0020ff" }}>Duration</th>
                <th style={{ color: "#0020ff" }}>Add</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={`item-${index}-${item._id}`} className="text-primary">
                  <td style={{ color: "#8200ff" }}>{item.name}</td>
                  <td style={{ color: "#8200ff" }}>
                    {new Date(item.due).toLocaleString()}
                  </td>
                  <td style={{ color: "#8200ff" }}>
                    {formatDateTime(item.startTime)}
                  </td>
                  <td style={{ color: "#8200ff" }}>
                    {formatDateTime(item.endTime)}
                  </td>
                  <td style={{ color: "#8200ff" }}>
                    {`${taskDurations[index]} minutes`}
                  </td>
                  <td>
                    <a
                      href={generateGoogleCalendarLink(item)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        src={approveIcon}
                        alt="Add to Google Calendar"
                        style={{ width: "24px", height: "24px" }}
                      />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </List>
    </div>
  );
  
  
};

export default OptimizedSchedule;


