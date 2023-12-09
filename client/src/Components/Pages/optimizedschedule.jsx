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
        const response = await fetch(
          `http://localhost:5200/tasks/${GoogleData.profileObj.email}`,
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

        const filteredData = sortedData.filter((task, index) => {
          return task.status === "to do" || task.status === "in progress";
        });

        const updatedData = filteredData.map((task, index) => {
          const startTime =
            index === 0
              ? new Date(task.due)
              : new Date(filteredData[index - 1].endTime);
          const taskDuration = task.estDur / 60;
          let endTime = new Date(startTime.getTime() + taskDuration * 60000);

          if (endTime > new Date(task.due)) {
            endTime = new Date(task.due);
          }

          if (startTime.getTime() === endTime.getTime()) {
            startTime.setTime(endTime.getTime() - taskDuration * 60000);
          }

          task.startTime = startTime;
          task.endTime = endTime;

          return task;
        });

        const durations = sortedData.map((task) => task.estDur / 60);
        setTaskDurations(durations);

        setData(updatedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchAndSortData();
  }, []);

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
    <div className="container mt-4 d-flex justify-content-center align-items-center vh-500">

      <List>
        <table className="table">
          <thead>
          <tr>
            <th style={{ color: '#0020ff' }}>Task</th>
            <th style={{ color: '#0020ff' }}>Due</th>
            <th style={{ color: '#0020ff'  }}>Start Time</th>
            <th style={{ color: '#0020ff'  }}>End Time</th>
            <th style={{ color:'#0020ff'  }}>Duration</th>
            <th style={{ color: '#0020ff' }}>Add</th>
          </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={`item-${index}-${item._id}`} className="text-primary">
                <td style={{ color: '#8200ff' }}>{item.name}</td>
                <td style={{ color: '#8200ff' }}>
                  {new Date(item.due).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </td>
                <td style={{ color: '#8200ff'  }}>{formatDateTime(item.startTime)}</td>
                <td style={{ color: '#8200ff'  }}>{formatDateTime(item.endTime)}</td>
                <td style={{ color: '#8200ff'  }}>{`${taskDurations[index]} minutes`}</td>
                <td>
                <a
                  href={generateGoogleCalendarLink(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }} // Optional: Remove underline on hover
                >
                  <img
                    src={approveIcon}
                    alt="Add to Google Calendar"
                    style={{ width: "24px", height: "24px"}}
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
