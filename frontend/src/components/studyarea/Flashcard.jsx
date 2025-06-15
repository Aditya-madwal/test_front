import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const FlashcardViewer = ({ flashcards, topic, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCard = flashcards[currentIndex];

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + flashcards.length) % flashcards.length
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl h-fit rounded-2xl shadow-xl flex flex-col p-6 relative mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {topic} ({currentIndex + 1} of {flashcards.length})
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="flex-grow flex flex-col bg-[#FAF4CC] rounded-xl p-8 relative">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            {currentCard.heading}
          </h3>
          <ul className="space-y-4">
            {currentCard.points.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-medium">
                  {index + 1}
                </span>
                <p className="text-gray-700 leading-relaxed">{point}</p>
              </li>
            ))}
          </ul>

          <div className="absolute -inset-x-6 top-1/2 -translate-y-1/2 flex justify-between px-4">
            <button
              onClick={goToPrev}
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={goToNext}
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="mt-6 bg-gray-200 h-1.5 rounded-full overflow-hidden flex items-center">
          <div
            className="h-full bg-purple-500 transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / flashcards.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

const FlashCard = ({ content, uid }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const { topic, overview, flashcards, metadata } = content;
  const formattedDate = new Date(metadata.generated_at).toLocaleDateString();

  return (
    <>
      <div
        className="relative w-64 h-72 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}>
        <div
          className={`w-full h-full transition-all duration-500 ${
            isFlipped ? "rotate-y-180" : ""
          } preserve-3d`}>
          <div
            className="absolute w-full h-fit backface-hidden rounded-xl p-6 flex flex-col"
            style={{ backgroundColor: "hsl(47, 100%, 90%)" }}>
            <div className="mb-4">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Topic
              </span>
              <h3 className="text-xl font-bold text-gray-800 mt-1 line-clamp-2">
                {topic}
              </h3>
            </div>

            <div className="mb-4 flex-grow">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Overview
              </span>
              <p className="text-sm text-gray-700 mt-1 line-clamp-4">
                {overview}
              </p>
            </div>

            <div className="mt-auto">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cards
                  </span>
                  <p className="text-xl font-medium text-gray-800 mt-1">
                    {flashcards.length}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider block">
                    Created
                  </span>
                  <p className="text-sm text-gray-700 mt-1">{formattedDate}</p>
                </div>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-10 -translate-y-10">
              <div className="w-full h-full rounded-full bg-white opacity-10"></div>
            </div>
          </div>

          <div className="absolute w-full h-full backface-hidden rounded-xl shadow-lg p-6 flex flex-col rotate-y-180 bg-white">
            <div className="flex-grow overflow-auto">
              <h4 className="text-sm font-semibold text-gray-800 mb-4">
                Preview of Flashcards:
              </h4>
              <ul className="space-y-3 mb-6">
                {flashcards.slice(0, 3).map((card, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    • {card.heading}
                  </li>
                ))}
              </ul>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsViewerOpen(true);
                }}
                className="w-full py-2 px-4 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors text-sm font-medium">
                Open Flashcards
              </button>
            </div>
          </div>
        </div>
      </div>

      {isViewerOpen && (
        <FlashcardViewer
          topic={topic}
          flashcards={flashcards}
          onClose={() => {
            setIsViewerOpen(false);
            setIsFlipped(false);
          }}
        />
      )}
    </>
  );
};

export default FlashCard;
