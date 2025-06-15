import React from "react";
import process from "process";
import { useEffect } from "react";

const UserIdentity = ({ userInfo, roadmaps, pdfs }) => {
  useEffect(() => {
    console.log("user :");
    console.log(userInfo);
  }, []);
  return (
    <div className="h-fit bg-white p-8 rounded-lg w-full mb-4">
      <div className="w-full mx-auto">
        <div className="flex items-start gap-8">
          {/* Profile Image */}
          <div className="w-40 h-40 relative rounded-full overflow-hidden p-1 border-2 border-violet-500">
            <img
              src={`${
                import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"
              }${userInfo?.pfp}`}
              alt={userInfo?.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Information */}
          <div className="flex-1">
            <div className="flex items-baseline justify-between mb-4">
              <h1 className="text-2xl font-semibold text-gray-900">
                {userInfo.name}
              </h1>
              <button className="text-violet-500 hover:text-violet-600 transition-colors text-sm">
                Edit Profile
              </button>
            </div>
            <div className="border p-2 rounded-lg mb-4 text-sm">
              <p className="text-purple-600 font-medium">Bio</p>
              <p className="text-gray-900">{userInfo.bio}</p>
            </div>
            <div className="border p-2 rounded-lg mb-4 text-sm">
              <p className="text-purple-600 font-medium">Email</p>
              <p className="text-gray-900">{userInfo.email}</p>
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm">
              <div
                className="border p-2 rounded-lg"
                style={{ wordWrap: "break-word" }}>
                <p className="text-purple-600 font-medium">Education status</p>
                <p className="text-gray-900">{userInfo.course}</p>
              </div>
              <div className="border p-2 rounded-lg">
                <p className="text-purple-600 font-medium">Study Areas</p>
                <p className="text-gray-900">{roadmaps?.length}</p>
              </div>
              <div className="border p-2 rounded-lg">
                <p className="text-purple-600 font-medium">Pdfs Uploaded</p>
                <p className="text-gray-900">{pdfs?.total_count}</p>
              </div>
              {/* <div
                className="border p-2 rounded-lg text-wrap"
                style={{ wordWrap: "break-word" }}
              >
                <p className="text-black font-medium">Course</p>
                <p className="text-gray-900">{userInfo.course}</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserIdentity;
