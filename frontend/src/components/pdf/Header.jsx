import React from "react";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center p-4 bg-white">
      <button
        className="flex items-center gap-2 text-purple-600 px-4 py-2 rounded-lg bg-purple-100"
        onClick={() => navigate(-1)}>
        <ArrowLeft size={20} />
        <Link to="/">Back to Dashboard</Link>
      </button>
      <div className="text-xl font-semibold">Aristotle</div>
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200">
        <span>Download summary</span>
      </button>
    </div>
  );
};

export default Header;
