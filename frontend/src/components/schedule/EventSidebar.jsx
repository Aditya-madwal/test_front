import React, { useState, useRef } from "react";
import {
  Plus,
  ArrowLeftFromLine,
  ArrowRightFromLine,
  Folder,
} from "lucide-react";
import { CalendarDays } from "lucide-react";
import { useEffect } from "react";

const EventSidebar = ({
  eventTitle,
  date,
  colorHex,
  categoryName,
  description,
  uid,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(uid);

  const prevEventUidRef = useRef(null);
  const [eventUid, setEventUid] = useState(uid);

  useEffect(() => {
    if (uid && prevEventUidRef.current === null) {
      setIsOpen(true);
    }
    prevEventUidRef.current = uid;
  }, [uid]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-screen bg-white transition-all duration-300 ${
        isOpen ? "w-72" : "w-12"
      }`}
      style={{ position: "sticky" }}>
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 text-gray-400 hover:text-gray-600">
        {isOpen ? (
          <ArrowRightFromLine size={18} />
        ) : (
          <ArrowLeftFromLine size={18} />
        )}
      </button>

      {isOpen && (
        <div className="h-full flex flex-col pt-14 px-6">
          <div className="flex flex-col items-center mb-6">
            <div
              className="flex items-center justify-center  bg-gray-100 w-16 h-16 font-light text-gray-600 rounded-full mb-4"
              style={{
                backgroundColor: `${colorHex}33`,
                color: `${colorHex}`,
              }}>
              <CalendarDays className="w-10 h-10" />
            </div>
            <h2 className="text-lg font-bold mb-2">{eventTitle}</h2>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Date</span>
              <span className="font-medium">{date}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Color</span>
              <span
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: `${colorHex}33`,
                  border: `1px solid ${colorHex}`,
                }}></span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Category</span>
              <span className="font-medium">{categoryName}</span>
            </div>
          </div>

          {description && (
            <div
              className="bg-green-100 p-3 rounded-lg mt-4"
              style={{
                backgroundColor: `${colorHex}33`,
                color: `${colorHex}`,
              }}>
              <h3 className="text-sm font-medium mb-2">Description</h3>
              <p className="text-xs text-gray-800">{description}</p>
            </div>
          )}

          <div className="mt-auto pb-6">
            <button
              onClick={() => onDeleteEvent(uid)}
              className="w-full border text-pink-600 bg-pink-100 text-sm py-2.5 rounded-full hover:bg-pink-200 transition">
              Delete Event
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventSidebar;
