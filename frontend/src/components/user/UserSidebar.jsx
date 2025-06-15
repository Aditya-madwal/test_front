import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MiniCalendar from "./MiniCalendar";

const UserSidebar = () => {
  return (
    <div
      className={`fixed top-0 right-0 h-screen bg-gray-100 transition-all duration-300 w-72`}
      style={{ position: "sticky" }}
    >
      <div className="h-full flex flex-col pt-14 px-4">
        <MiniCalendar />
      </div>
    </div>
  );
};

export default UserSidebar;
