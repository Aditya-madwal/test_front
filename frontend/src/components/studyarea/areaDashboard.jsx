import React, { useState, useEffect } from "react";

import {
  FolderOpen,
  MoreVertical,
  Plus,
  ChevronRight,
  FileText,
  Trash2,
  X,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { StudyAreaService } from "../../lib/api/StudyAreaDashboard.jsx/StudyAreaServices";
import FileUpload from "./FileUpload";
import FlashCard from "../studyarea/Flashcard";
import Roadmap from "./roadmap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FlashcardModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
  const [topic, setTopic] = useState("");
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="rounded-lg bg-white p-8 shadow-2xl max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Generate New Flashcards</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Topic for Flashcards
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., React Hooks, JavaScript Promises"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <p className="mt-2 text-sm text-gray-500">
            This will generate a set of flashcards based on the topic you
            provide.
          </p>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {
              if (topic.trim()) {
                onConfirm(topic);
              }
            }}
            disabled={!topic.trim() || isLoading}
            className="rounded bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Generating...
              </>
            ) : (
              "Generate Flashcards"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const AreaDashboard = ({ setSelectedFile }) => {
  const { uid } = useParams();
  const [roadmapUid] = useState(uid);
  const [subject, setSubject] = useState("");
  const [roadmapPDFs, setRoadmapPDFs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roadmapDetails, setRoadmapDetails] = useState({});
  const [flashcards, setFlashcards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const ondeletePDF = () => {
    fetchData();
  };

  const handleDeletePDF = async (pdfUid) => {
    try {
      await StudyAreaService.deletePDF(roadmapUid, pdfUid);
      ondeletePDF();
    } catch (error) {
      console.error("Error deleting PDF:", error);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [pdfsResponse, detailsResponse, flashcardsResponse] =
        await Promise.all([
          StudyAreaService.get_all_pdfs_for_roadmap(roadmapUid),
          StudyAreaService.getRoadmapDetails(roadmapUid),
          StudyAreaService.getRoadmapFlashcards(roadmapUid),
        ]);

      setRoadmapPDFs(pdfsResponse);
      setRoadmapDetails(detailsResponse);
      setFlashcards(flashcardsResponse);
      setSubject(detailsResponse.subject);
      console.log("flashcards", flashcards);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch roadmap data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Fetched roadmap PDFs:", roadmapPDFs);
  }, [roadmapPDFs]);

  const handleGenerateFlashcards = async (topic) => {
    try {
      setIsGenerating(true);
      const response = await StudyAreaService.createFlashcard(roadmapUid, {
        topic,
      });
      await fetchData();
      setIsModalOpen(false);
      toast.success("Flashcards generated successfully!");
    } catch (error) {
      console.error("Error generating flashcards:", error);
      toast.error("Failed to generate flashcards. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-gray-700 font-medium">
              Loading your study area...
            </p>
          </div>
        </div>
      )}
      <section className="flex flex-col">
        <h1 className="flex items-center text-2xl font-semibold text-gray-800 mb-6">
          Dashboard <ChevronRight />{" "}
          <span className="text-purple-600">{subject}</span>
        </h1>
        <div className="p-6 w-full mx-auto bg-white rounded-lg shadow-md">
          <Roadmap roadmapData={roadmapDetails} fetchRoadmapData={fetchData} />

          <FileUpload fetchRoadmapPDFs={fetchData} />

          <div className="flex justify-between items-center w-full mt-10">
            <h2 className="text-xl font-semibold text-gray-800">
              Your Flashcards
            </h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 bg-purple-100 p-1 px-4 rounded-full">
              <Plus size={20} />
              <span className="text-sm font-medium">Add New Flashcard</span>
            </button>
          </div>

          {/* Flashcard Generation Modal */}
          <FlashcardModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleGenerateFlashcards}
            isLoading={isGenerating}
          />

          {flashcards.length > 0 && (
            <div className="py-6 flex flex-wrap gap-6 mb-10">
              {flashcards.map((flashcard) => (
                <FlashCard content={flashcard.content} uid={flashcard.uid} />
              ))}
            </div>
          )}
          {flashcards.length === 0 && (
            <p className="flex items-center justify-center px-6 py-4 text-sm text-red-500 bg-red-50 my-6 rounded-lg border border-red-200">
              No PDFs uploaded yet.
            </p>
          )}

          {/* Recent PDFs */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Your Roadmap PDFs
            </h2>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-4 px-6 py-3 bg-gray-50 text-sm font-medium text-gray-500">
                <div className="col-span-2">Name</div>
                <div>Uploaded On</div>
                <div>Overview</div>
              </div>

              <div className="divide-y divide-gray-200 bg-white">
                {roadmapPDFs.map((pdf) => (
                  <div
                    key={pdf.uid}
                    className="grid grid-cols-12 px-6 py-4 items-center hover:bg-gray-50 gap-4">
                    <div className="col-span-5 flex items-center gap-3">
                      <FileText
                        className="text-red-400 flex-shrink-0"
                        size={20}
                      />
                      <div className="text-sm text-left font-medium text-gray-700 hover:text-purple-600 break-words whitespace-normal overflow-hidden">
                        <button
                          className="text-left"
                          onClick={() => {
                            setSelectedFile({
                              roadmapUid: roadmapUid,
                              id: pdf.uid,
                              name: pdf.notes.title,
                              topic: pdf.notes.sections[0].title,
                              dateUploaded: formatDate(pdf.date_uploaded),
                              summary:
                                pdf.notes.overview || "No summary available",
                            });
                          }}>
                          {pdf.notes.title}
                        </button>
                      </div>
                    </div>

                    <div className="col-span-3 text-sm text-gray-500">
                      {formatDate(pdf.date_uploaded)}
                    </div>

                    <div className="col-span-4 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs truncate">
                        {pdf.notes.overview}
                      </span>
                      <button
                        onClick={() => handleDeletePDF(pdf.uid)}
                        className="text-gray-400 hover:text-red-500 flex-shrink-0">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
                {roadmapPDFs.length === 0 && (
                  <p className="flex items-center justify-center px-6 py-4 text-sm text-red-500 bg-red-50 ">
                    No PDFs uploaded yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AreaDashboard;
