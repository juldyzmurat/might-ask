import React from "react";

const Schedule = () => {
  const calendarUrl =
    "https://calendar.google.com/calendar/embed?src=enh1NEBjYXNlLmVkdQ";

  return (
    <div>
      <iframe
        src={calendarUrl}
        style={{
          border: "0",
          width: "800px",
          height: "600px",
          frameborder: "0",
          scrolling: "no",
        }}
      />
    </div>
  );
};

export default Schedule;
