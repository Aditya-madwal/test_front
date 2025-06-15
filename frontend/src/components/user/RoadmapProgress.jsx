import React from "react";

const SubjectStats = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Roadmaps Progress
      </h2>
      <div className="space-y-4">
        {data.length > 0 &&
          data.map((subject) => (
            <div key={subject.roadmap}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {subject.roadmap}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {subject.progress}%
                </span>
              </div>
              <div
                className={`w-full rounded-full h-2.5 ${
                  subject.progress <= 25
                    ? "bg-red-200"
                    : subject.progress <= 50
                    ? "bg-yellow-200"
                    : subject.progress <= 75
                    ? "bg-blue-200"
                    : "bg-green-200"
                }`}
              >
                <div
                  className={`h-2.5 rounded-full ${
                    subject.progress <= 25
                      ? "bg-red-500"
                      : subject.progress <= 50
                      ? "bg-yellow-500"
                      : subject.progress <= 75
                      ? "bg-blue-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${subject.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SubjectStats;
