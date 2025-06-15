import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { CalendarServices } from "../../lib/api/ScheduleServices/CalendarServices";

const AddEventModal = ({ isOpen, onClose, onAddEvent, fetchEvents }) => {
  const [eventTitle, setEventTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [colorHex, setColorHex] = useState("#3A7D44");

  const colors = [
    { name: "Green", value: "#3A7D44" },
    { name: "Red", value: "#D70654" },
    { name: "Blue", value: "#1E90FF" },
    { name: "Orange", value: "#FF5733" },
    { name: "Purple", value: "#8A2BE2" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventTitle || !eventDate) return;

    if (!eventDate || !description || !colorHex || !eventTitle) {
      alert("Please fill in all required fields.");
      return;
    }

    const newEvent = {
      eventTitle,
      description,
      date: eventDate,
      colorHex,
    };

    try {
      const createdEvent = await CalendarServices.createEvent(newEvent);
      onAddEvent(createdEvent);
      resetForm();
      fetchEvents();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const resetForm = () => {
    setEventTitle("");
    setDescription("");
    setEventDate("");
    setColorHex("#3A7D44");
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 relative border border-gray-200">
        <Dialog.Title className="text-left mb-4">
          <h2 className="text-2xl font-semibold text-purple-600">
            Create New Event
          </h2>
        </Dialog.Title>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Name
            </label>
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              style={{
                height: "40px",
                borderRadius: "10px",
                paddingLeft: "15px",
              }}
              placeholder="eg. Workshop on React"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="eg. Attend the workshop on React at KIET"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg h-[100px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
              style={{
                borderRadius: "10px",
                paddingLeft: "15px",
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                required
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Color
            </label>
            <div className="flex space-x-2">
              {colors.map(({ name, value }) => (
                <button
                  key={value}
                  type="button"
                  title={name}
                  onClick={() => setColorHex(value)}
                  className={`w-6 h-6 rounded-full transition-all duration-300 ${
                    colorHex === value
                      ? "ring-2 ring-offset-2 ring-purple-500"
                      : ""
                  }`}
                  style={{ backgroundColor: value }}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 text-gray-600">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-full">
              Create Event
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default AddEventModal;
