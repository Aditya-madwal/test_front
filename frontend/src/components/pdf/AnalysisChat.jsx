import React from "react";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Send, Info, X, Star } from "lucide-react";

const AnalysisReport = ({ pdfData, tab, setTab }) => {
  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Sample file #124</h2>
        <button className="text-gray-400 hover:text-gray-600">&times;</button>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-purple-600 mb-4">Summary</h3>
          <p className="text-gray-700 mb-4">
            Excepteur aute adipisicing commodo cillum Lorem elit laborum...
          </p>
        </section>

        <section>
          <h3 className="text-purple-600 mb-4">Points to be noted</h3>
          <ul className="space-y-4 text-gray-700">
            <li>
              Exercitation laborum adipisicing excepteur proident ex commodo...
            </li>
            <li>Enim deserunt elit proident ipsum...</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

const ChatMessage = ({ isUser, message, sender }) => {
  return (
    <div className="mb-6">
      <div className="text-sm text-gray-600 mb-2">{sender}</div>
      <div className={`p-4 rounded-lg ${isUser ? "bg-white" : "bg-purple-50"}`}>
        <p className="text-gray-800">{message}</p>
      </div>
    </div>
  );
};

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [messages] = useState([
    {
      sender: "genaiedu",
      message:
        "Do fugiat commodo veniam ut ad commodo minim ipsum proident quis deserunt. Labore aliquip ullamco consequat velit aliquip duis elit cupidatat sit nostrud aliqua et est minim eiusmod elit. Consequat reprehenderit ipsum aliqua cillum qui dolore fugiat i",
      isUser: false,
    },
    {
      sender: "You",
      message:
        "Nostrud reprehenderit incididunt minim ea cupidatat eu ut exercitation reprehenderit ad consequat amet labore Lorem anim occaecat. Pariatur non exercitation non reprehenderit adipisicing ad esse laborum adipisicing eu in incididunt officia ?",
      isUser: true,
    },
    {
      sender: "genaiedu",
      message:
        "Do fugiat commodo veniam ut ad commodo minim ipsum proident quis deserunt. Labore aliquip ullamco consequat velit aliquip duis elit cupidatat sit nostrud aliqua et est minim eiusmod elit. Consequat reprehenderit ipsum aliqua cillum qui dolore fugiat i",
      isUser: false,
    },
    {
      sender: "You",
      message:
        "Nostrud reprehenderit incididunt minim ea cupidatat eu ut exercitation reprehenderit ad consequat amet labore Lorem anim occaecat. Pariatur non exercitation non reprehenderit adipisicing ad esse laborum adipisicing eu in incididunt officia ?",
      isUser: true,
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessage("");
  };

  return (
    <div className="bg-white rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <span className="text-gray-700">Sample file #124</span>
        </div>
        <div className="flex items-center gap-4">
          <Star className="text-yellow-400 cursor-pointer" size={20} />
          <X className="text-gray-400 cursor-pointer" size={20} />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b">
        <div className="flex gap-6 px-4">
          <button className="py-2 text-gray-500">Summary</button>
          <button className="py-2 text-purple-600 border-b-2 border-purple-600">
            Chat
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            message={msg.message}
            sender={msg.sender}
            isUser={msg.isUser}
          />
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your question here..."
            className="w-full px-4 py-3 bg-purple-50 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-600">
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export { AnalysisReport, ChatComponent };
