import MiniCalendar from "./MiniCalendar";
import React from "react";
import UserIdentity from "./UserIdentity";
import SubjectStats from "./RoadmapProgress";
import { UserServices } from "../../lib/api/UserServices/UserServices";
import { useEffect, useState } from "react";

function UserDashboard() {
  const [userInfo, setUserInfo] = useState({});
  const [roadmaps, setRoadmaps] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [progress, setProgress] = useState({});

  const fetchRoadmaps = async () => {
    try {
      const roadmaps = await UserServices.getAllRoadmaps();
      setRoadmaps(roadmaps);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const userInfo = await UserServices.getUserInfo();
      setUserInfo(userInfo);
      console.log(userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPDFs = async () => {
    try {
      const pdfs = await UserServices.getAllPDFs();
      setPdfs(pdfs);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProgress = async () => {
    try {
      const progress = await UserServices.getRoadmapProgress();
      setProgress(progress);
      console.log(progress);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchRoadmaps();
    fetchPDFs();
    fetchProgress();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="h-full lg:col-span-2 gap-4">
          <UserIdentity userInfo={userInfo} roadmaps={roadmaps} pdfs={pdfs} />
          <SubjectStats data={progress} />
        </div>
        <div className="h-full">
          <MiniCalendar />
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
