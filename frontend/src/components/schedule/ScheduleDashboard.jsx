import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { MyContext } from "../../MyContext";
import { Plus } from "lucide-react";
import Calendar from "./Calendar";
import AddEventModal from "./AddEventModal";
import { CalendarServices } from "../../lib/api/ScheduleServices/CalendarServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ScheduleDashboard = ({ setEventProps }) => {
  const { me, setMe } = useContext(MyContext);
  const [myinfo, setMyinfo] = useState(me);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState({});

  const fetchEvents = () => {
    try {
      CalendarServices.getAllEvents().then((response) => {
        const eventsByDate = response.reduce((acc, event) => {
          if (!acc[event.date]) {
            acc[event.date] = [];
          }
          acc[event.date].push(event);
          return acc;
        }, {});
        setEvents(eventsByDate);
        console.log(eventsByDate);
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddEvent = (newEvent) => {
    console.log("New Event:", newEvent);
    toast.success("Event added successfully!");
    setIsModalOpen(false);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AddEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddEvent={handleAddEvent}
        fetchEvents={fetchEvents}
      />
      <section className="flex flex-col w-full">
        <div className="flex items-center justify-between mb-3">
          <h1 className="flex items-center text-2xl font-semibold text-gray-800">
            {me?.name}'s
            <span className="text-purple-600 ml-2">Schedule</span>
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 bg-purple-100 p-2 px-4 rounded-full">
            <Plus size={20} />
            <span className="text-sm font-medium">Add Event</span>
          </button>
        </div>
        <Calendar setEventProps={setEventProps} events={events} />
      </section>
    </>
  );
};

export default ScheduleDashboard;
