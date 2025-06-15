import React, { useState, useEffect } from "react";
import { CalendarServices } from "../../lib/api/ScheduleServices/CalendarServices";

const MiniCalendar = () => {
  const [currentDate] = useState(new Date());
  const [events, setEvents] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await CalendarServices.getAllEvents();
        const eventsByDate = response.reduce((acc, event) => {
          if (!acc[event.date]) {
            acc[event.date] = [];
          }
          acc[event.date].push(event);
          return acc;
        }, {});
        setEvents(eventsByDate);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const generateCalendarDays = () => {
    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-8"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1 < 10
          ? "0" + (currentDate.getMonth() + 1)
          : currentDate.getMonth() + 1
      }-${day < 10 ? "0" + day : day}`;
      const hasEvents = events[date] && events[date].length > 0;
      const isToday = day === currentDate.getDate();
      calendarDays.push(
        <div
          key={day}
          className={`h-8 flex items-center justify-center rounded-full
            ${isToday ? "bg-violet-500 text-white" : "hover:bg-gray-100"}
            cursor-pointer text-sm`}
          style={{
            backgroundColor:
              hasEvents && !isToday
                ? `${events[date][0].colorHex}33`
                : isToday
                ? "bg-violet-500 text-white"
                : "#ffffff",
            color:
              hasEvents && !isToday
                ? events[date][0].colorHex
                : isToday
                ? "#ffffff"
                : "#000000",
            cursor: hasEvents ? "pointer" : "default",
          }}>
          {day}
        </div>
      );
    }
    return calendarDays;
  };

  return (
    <div className="bg-white rounded-lg p-6 h-fit w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((day) => (
          <div
            key={day}
            className="h-8 flex items-center justify-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">{generateCalendarDays()}</div>
    </div>
  );
};

export default MiniCalendar;
