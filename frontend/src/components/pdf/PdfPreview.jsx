import React from "react";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

// PDF Viewer Component
const PDFViewer = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <div className="bg-white p-6 rounded-lg shadow-sm min-h-[600px] w-full">
        <h2 className="text-lg font-semibold mb-4">Sample file #124</h2>
        <p className="text-gray-700 mb-4">
          Quis esse cillum pariatur id veniam officia consequat ea qui...
        </p>
      </div>
    </div>
  );
};

export default PDFViewer;
