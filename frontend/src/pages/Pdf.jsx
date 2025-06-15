import React, { useState } from "react";
import { ChevronLeft, ChevronDown, Plus, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { PdfServices } from "../lib/api/PdfServices/pdfServices";

const SAMPLE_DATA = {
  document: {
    id: "124",
    title: "Sample Document",
    pdfUrl:
      "https://ipfs.io/ipfs/QmZzDZkU2pQkzMeQ3tKuZKPR2jD5GR5hyjyLuenTWX321h",
  },
  summary: {
    mainPoints: [
      "Exercitation laborum adipisicing excepteur proident ex commodo exercitation ut ex.",
      "Veniam nisi sit minim elit dolore officia.",
      "Enim deserunt elit proident ipsum incididunt officia nostrud dolor.",
    ],
    keyFindings: `Excepteur aute adipisicing commodo cillum Lorem elit laborum eu exercitation fugiat. 
      Aliqua Lorem laboris amet minim sint occaecat in eu.`,
  },
  chat: {
    messages: [
      {
        id: 1,
        sender: "assistant",
        content:
          "Do fugiat commodo veniam ut ad commodo minim ipsum proident quis deserunt.",
      },
      {
        id: 2,
        sender: "user",
        content:
          "Nostrud reprehenderit incididunt minim ea cupidatat eu ut exercitation?",
      },
    ],
  },
};

// Main Component
const PdfPage = () => {
  const [activeTab, setActiveTab] = useState("summary");
  const [pdfData, setPdfData] = useState(null);
  const [chatData, setChatData] = useState(null);
  const [cid, setCid] = useState(null);

  const { roadmapUid, pdfUid } = useParams();
  // console.log(roadmapUid, pdfUid);

  useEffect(() => {
    fetchPdfData();
  }, [roadmapUid, pdfUid]);

  const fetchPdfData = async () => {
    try {
      const data = await PdfServices.getPDFData(roadmapUid, pdfUid);
      setPdfData(data);
      setCid(data.cid);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50">
      <Header title={"Aristotle.ai"} roadmapUid={roadmapUid} />

      <div className="flex flex-1 overflow-hidden">
        <PDFPreview cid={cid} />

        <div className="w-1/2">
          <div className="bg-white h-full flex flex-col shadow-sm border-l">
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="flex-1 overflow-y-auto">
              {activeTab === "summary" ? (
                <Summary notes={pdfData?.notes} />
              ) : (
                <Chat messages={SAMPLE_DATA.chat.messages} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Header Component
const Header = ({ title, roadmapUid }) => (
  <header className="flex items-center justify-between p-4 bg-white border-b">
    <div className="flex items-center gap-4">
      <Link
        to={`/studyarea/${roadmapUid}`}
        className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-md text-sm">
        <ChevronLeft size={16} />
        Back to Dashboard
      </Link>
    </div>
    <h1 className="text-lg font-semibold">{title}</h1>
    <div className="flex items-center gap-4">
      <button className="px-4 py-2 border rounded-md flex items-center gap-2 text-sm">
        Download summary
      </button>
      <button className="p-2 text-sm">
        <span className="sr-only">Help</span>?
      </button>
    </div>
  </header>
);

// PDF Preview Component
const PDFPreview = ({ cid }) => (
  <div className="w-1/2 p-4 overflow-hidden">
    <div className="bg-white rounded-lg h-full shadow-sm border overflow-hidden">
      <iframe
        src={`https://ipfs.io/ipfs/${cid}`}
        title="PDF Preview"
        className="w-full h-full border-0"
      />
    </div>
  </div>
);

const Summary = ({ notes }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <div className="p-6 overflow-y-auto">
      {/* Title and Overview */}
      <h2 className="text-base font-semibold mb-2">{notes?.title}</h2>
      <p className="text-gray-600 text-sm mb-6">{notes?.overview}</p>

      {/* Main Summary */}
      <h3 className="text-purple-600 text-sm font-medium mb-4">Summary</h3>
      <p className="text-gray-600 text-sm mb-6">{notes?.summary}</p>

      {/* Sections */}
      <h3 className="text-purple-600 text-sm font-medium mb-4">Sections</h3>
      <div className="space-y-4">
        {notes?.sections?.map((section, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 bg-white hover:shadow-sm transition-shadow">
            <button
              onClick={() => toggleSection(index)}
              className="w-full text-left flex justify-between items-center">
              <h4 className="text-sm font-medium">{section.title}</h4>
              <motion.span
                initial={{ rotate: 0 }}
                animate={{ rotate: expandedSection === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-purple-600">
                <ChevronDown size={16} />
              </motion.span>
            </button>

            <AnimatePresence>
              {expandedSection === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.1, ease: "easeInOut" }}
                  className="mt-4 space-y-4 overflow-hidden">
                  {/* Section Summary */}
                  {section?.summary && section.summary.trim() !== "" && (
                    <p className="text-sm text-gray-600">{section.summary}</p>
                  )}

                  {/* Key Points */}
                  {section?.key_points?.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-purple-600 mb-2">
                        Key Points
                      </h5>
                      <ul className="list-disc pl-4 text-sm text-gray-600 space-y-1">
                        {section.key_points
                          .filter((point) => point && point.trim() !== "")
                          .map((point, idx) => (
                            <li key={idx}>{point}</li>
                          ))}
                      </ul>
                    </div>
                  )}

                  {/* Details */}
                  {section?.details?.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-purple-600 mb-2">
                        Details
                      </h5>
                      <ul className="list-disc pl-4 text-sm text-gray-600 space-y-1">
                        {section.details
                          .filter((detail) => detail && detail.trim() !== "")
                          .map((detail, idx) => (
                            <li key={idx}>{detail}</li>
                          ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Key Terms */}
      <h3 className="text-purple-600 text-sm font-medium mt-6 mb-4">
        Key Terms
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(notes?.key_terms || {}).map(
          ([term, definition], index) => (
            <div key={index} className="border rounded-lg p-3 bg-white">
              <span className="text-sm font-medium">{term}: </span>
              <span className="text-sm text-gray-600">{definition}</span>
            </div>
          )
        )}
      </div>

      {/* Review Questions */}
      <h3 className="text-purple-600 text-sm font-medium mt-6 mb-4">
        Review Questions
      </h3>
      <ul className="list-decimal pl-4 space-y-2">
        {notes?.review_questions?.map((question, index) => (
          <li key={index} className="text-sm text-gray-600">
            {question}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Chat Message Component
const ChatMessage = ({ message }) => (
  <div
    className={`${
      message.sender === "assistant" ? "bg-purple-50" : "border"
    } p-4 rounded-lg`}>
    <p className="text-xs text-gray-600 mb-1">
      {message.sender === "assistant" ? "Assistant" : "You"}
    </p>
    <p className="text-sm">{message.content}</p>
  </div>
);

// Chat Component
const Chat = ({ messages }) => {
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </div>
      </div>
      {/* chat input */}
      <section className="flex items-center justify-center">
        <div className="relative w-[95%] m-4">
          <input
            type="text"
            placeholder="Add New Task..."
            className="rounded-full pe-15 shadow-sm sm:text-sm p-4"
            style={{
              // backgroundColor: "rgba(250, 245, 255, 0.2)",
              backgroundColor: "rgba(128, 0, 128, 0.1)",
              border: "0px",
              padding: "1.5rem",
              borderRadius: "1000px",
              color: "black",
            }}
          />
          <button className="absolute inset-y-0 end-0 grid w-10 place-content-center text-[#EFB034] pr-4">
            <Send className="text-purple-500" />
          </button>
        </div>
      </section>
    </div>
  );
};

// tab navigation component
const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = ["summary", "chat"];

  return (
    <div className="border-b bg-white">
      <div className="flex gap-8 px-6 relative">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`relative py-4 px-2 text-sm transition-colors duration-300 ${
              activeTab === tab
                ? "text-purple-600 font-medium"
                : "text-gray-500 hover:text-purple-500"
            }`}
            onClick={() => onTabChange(tab)}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}

            {/* Animated Underline */}
            {activeTab === tab && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 bottom-0 h-[2px] bg-purple-600 w-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PdfPage;
