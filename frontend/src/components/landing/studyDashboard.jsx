import React, { useEffect, useState } from "react";
import {
  FolderOpen,
  MoreVertical,
  Plus,
  FileText,
  Trash2,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import HomeServices from "../../lib/api/HomeDashboard.jsx/HomeServices";
import StudyAreaService from "../../lib/api/StudyAreaDashboard.jsx/StudyAreaServices";

const CreateRoadmapModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    duration: "",
    difficulty: "beginner",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSend = {
        topic: formData.topic,
        duration: formData.duration,
        difficulty: formData.difficulty,
      };
      await HomeServices.createRoadmap(dataToSend);
      setShowModal(false);
    } catch (error) {
      console.error("Error creating roadmap:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 bg-purple-100 p-2 px-4 rounded-full"
        onClick={() => setShowModal(true)}>
        <Plus size={20} />
        <span className="text-sm font-medium">Add New Study Area</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-lg mx-4">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Plus className="text-orange-400" size={24} />
                <h2 className="text-xl font-semibold">New Study Area</h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">Topic</label>
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  style={{ height: "40px", borderRadius: "8px" }}
                  placeholder="e.g. Web Development"
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g. 3 months"
                  style={{ height: "40px", borderRadius: "8px" }}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  Difficulty
                </label>
                <div className="space-y-2">
                  {["beginner", "intermediate", "expert"].map((level) => (
                    <label key={level} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="difficulty"
                        value={level}
                        checked={formData.difficulty === level}
                        onChange={handleChange}
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-gray-700 capitalize">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !formData.topic || !formData.duration}
                  className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? "Generating..." : "Generate"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StudyDashboard = () => {
  const [studyAreas, setStudyAreas] = useState([]);
  const [recentPDFs, setRecentPDFs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchData = async () => {
    try {
      const [roadmapsResponse, pdfsResponse] = await Promise.all([
        HomeServices.getAllRoadmaps(),
        HomeServices.getRecentPDFs(),
      ]);

      setStudyAreas(roadmapsResponse);
      setRecentPDFs(pdfsResponse.pdfs || []);
      console.log("studyAreas", studyAreas);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePDF = async (roadmapUid, pdfUid) => {
    try {
      await StudyAreaService.deletePDF(roadmapUid, pdfUid);
      fetchData();
    } catch (error) {
      console.error("Error deleting PDF:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-6 w-full mx-auto bg-white rounded-lg shadow-md">
      <CreateRoadmapModal />

      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Current Study Areas
        </h2>
        <div className="flex flex-wrap gap-5">
          {studyAreas?.map((area) => (
            <div
              key={area.uid}
              className="flex flex-col p-4 rounded-md border border-gray-200 bg-white hover:shadow-sm transition-shadow w-64 h-fit">
              <div className="flex items-center justify-between mb-3">
                <Link
                  className="flex items-center gap-2"
                  to={`/studyarea/${area.uid}`}>
                  <FolderOpen className="text-orange-400" size={20} />
                  <span className="text-sm font-medium text-gray-700">
                    {area.subject}
                  </span>
                </Link>
              </div>
              <div className="text-xs text-gray-500">
                Duration: {area.duration}
              </div>
              {area.status == true ? (
                <span className="mt-2 inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 text-emerald-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="-ms-1 me-1.5 size-4">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="whitespace-nowrap text-sm">Completed</p>
                </span>
              ) : (
                <div className="mt-2 text-xs text-purple-600 bg-purple-50 p-2 rounded">
                  Current: {area.current_milestone?.title}
                </div>
              )}
            </div>
          ))}
          {studyAreas.length === 0 && (
            <div className="flex flex-col p-4 rounded-md border border-gray-200 bg-white hover:shadow-sm transition-shadow w-64">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FolderOpen className="text-orange-400" size={20} />
                  <span className="text-sm font-medium text-gray-700">
                    No Study Areas
                  </span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={18} />
                </button>
              </div>
              <div className="text-xs text-gray-500">Duration: N/A</div>
              <div className="mt-2 text-xs text-purple-600 bg-purple-50 p-2 rounded">
                Current: N/A
              </div>
            </div>
          )}
        </div>
      </div>

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
            {recentPDFs.map((pdf) => (
              <div
                key={pdf.uid}
                className="grid grid-cols-12 px-6 py-4 items-center hover:bg-gray-50 gap-4">
                <div className="col-span-5 flex items-center gap-3">
                  <FileText className="text-red-400 flex-shrink-0" size={20} />
                  <div className="text-sm text-align-left font-medium text-gray-700 hover:text-purple-600 break-words whitespace-normal overflow-hidden">
                    <Link to={`/studyarea/${pdf.parent_roadmap}/${pdf.uid}`}>
                      {pdf.notes.title}
                    </Link>
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
                    onClick={() => handleDeletePDF(pdf.parent_roadmap, pdf.uid)}
                    className="text-gray-400 hover:text-red-500 flex-shrink-0">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyDashboard;
