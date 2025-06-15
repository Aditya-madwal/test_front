import React, { useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  subMonths,
  addMonths,
} from "date-fns";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarServices } from "../../lib/api/ScheduleServices/CalendarServices";

const Calendar = ({ setEventProps, events }) => {
  console.log("events ==> ", events);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  let today = new Date();
  today = today.toISOString().split("T")[0];
  const currentDate = today;

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center p-4">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
          <ChevronLeft />
        </button>
        <h2 className="text-lg font-medium">
          {format(currentMonth, "MMMM, yyyy")}
        </h2>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
          <ChevronRight />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div
        className={`grid grid-cols-7 mt-2 text-center font-medium text-gray-600 pb-2 bg-purple-100 pt-2 rounded-t-lg mb-2`}>
        {days.map((day, index) => (
          <div
            key={index}
            className={`${"Sun" == day ? "text-purple-500" : ""}`}>
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "yyyy-MM-dd");
        const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
        days.push(
          <div
            key={day}
            className={`p-2 min-h-[100px] h-fit m-1 rounded-lg ${
              isCurrentMonth ? "text-black border" : "text-gray-400 bg-white"
            } ${
              "Sunday" == format(day, "EEEE")
                ? "bg-purple-100 text-purple-900"
                : ""
            }`}>
            <span
              className={`text-sm ${
                currentDate == formattedDate
                  ? "text-white bg-purple-900 p-1 rounded-full w-6 h-6 flex justify-center items-center"
                  : ""
              }`}
              // onClick={() => alert(`${formattedDate}, ${currentDate}`)}
            >
              {format(day, "d")}
            </span>
            <div className="mt-1">
              {events &&
                events[formattedDate]?.map((event, index) => (
                  <div
                    key={event.uid}
                    style={{
                      backgroundColor: `${event.colorHex}33`,
                      color: event.colorHex,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      cursor: "pointer",
                    }}
                    className={`text-xs p-1 rounded-lg mb-1 ${
                      event.status ? "opacity-50" : ""
                    }`}
                    onClick={() => setEventProps(event)}>
                    {event.eventTitle}
                  </div>
                ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="w-full mx-auto p-4 bg-white rounded-lg">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
