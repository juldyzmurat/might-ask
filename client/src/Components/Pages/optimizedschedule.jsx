import React, { useState, useEffect } from "react";
import { GoogleData } from "../Login/LoginAPI";
import List from "@mui/material/List";
import approveIcon from "./approve.png";

const OptimizedSchedule = () => {
  const [data, setData] = useState([]);
  const [taskDurations, setTaskDurations] = useState([]);
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
        // Fetch tasks based on the logged-in user
        const response = await fetch(
          `http://localhost:5200/tasks/${GoogleData.profileObj.email}`,
        );

        // let userEmail = localStorage.getItem('email');
        // const request = "http://localhost:5200/tasks/".concat(
        //   userEmail,
        // );
        // const response = await fetch(request);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const sortedData = await response.json();

        // Sorting function by deadline
        function compareByDeadline(a, b) {
          const dateOne = a.due;
          const dateTwo = b.due;
          return dateOne - dateTwo;
        }

        sortedData.sort(compareByDeadline);

        // Set start and end times for each task
        const updatedData = sortedData.map((task, index) => {
          const startTime =
            index === 0
              ? new Date(task.due)
              : new Date(sortedData[index - 1].endTime);
          const taskDuration = task.estDur / 60; // Convert task duration to minutes
          let endTime = new Date(startTime.getTime() + taskDuration * 60000); // Convert task duration to milliseconds

          // Ensure that endTime does not exceed the due date
          if (endTime > new Date(task.due)) {
            endTime = new Date(task.due);
          }

          if (startTime.getTime() === endTime.getTime()) {
            // Adjust startTime to be taskDuration minutes before endTime
            startTime.setTime(endTime.getTime() - taskDuration * 60000);
          }

          // Check for overlapping with blocked time slots
          // const isOverlap = blockedTimeSlots.some((slot) => {
          //   const [start, end] = slot.split(',');
          //   const blockStartTime = new Date(start);
          //   const blockEndTime = new Date(end);
          //   return startTime < blockEndTime && endTime > blockStartTime;
          // });

          // Adjust the start time if there is an overlap
          // if (isOverlap) {
          //   const maxEndTime = new Date(Math.max(...blockedTimeSlots.map((slot) => new Date(slot.split(',')[1]))));
          //   startTime.setTime(maxEndTime.getTime());
          //   endTime.setTime(startTime.getTime() + taskDuration * 60000);
          // }

          task.startTime = startTime;
          task.endTime = endTime;

          return task;
        });

        // Set task durations for each task
        const durations = sortedData.map((task) => task.estDur / 60);
        setTaskDurations(durations);

        setData(updatedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchAndSortData();
  });

  const generateGoogleCalendarLink = (item) => {
    const formatGoogleCalendarDate = (date) => {
      return date.toISOString().replace(/[-:.]/g, "");
    };

    const startTimeUTC = formatGoogleCalendarDate(item.startTime);
    const endTimeUTC = formatGoogleCalendarDate(item.endTime);

    const googleCalendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      item.name,
    )}&dates=${startTimeUTC}/${endTimeUTC}&details=${encodeURIComponent(
      item.description,
    )}&location=${encodeURIComponent(item.location)}`;

    return googleCalendarLink;
  };

  return (
    <div>
      <List
        sx={{
          width: "100%",
          maxHeight: "100%",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          "& ul": { padding: 0 },
        }}
      >
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Due</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Duration</th>
              <th>Add </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={`item-${index}-${item._id}`} style={{ color: "blue" }}>
                <td>{item.name}</td>
                <td>
                  {new Date(item.due).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </td>
                <td>{formatDateTime(item.startTime)}</td>
                <td>{formatDateTime(item.endTime)}</td>
                <td>{`${taskDurations[index]} minutes`}</td>
                <td>
                  {/* Add to Google Calendar Link */}
                  <a
                    href={generateGoogleCalendarLink(item)}
                    target="_blank"
                    rel="noopener noreferrer"
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
      </List>
    </div>
  );
};

export default OptimizedSchedule;
