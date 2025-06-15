import React, { useEffect, useState } from "react";
import api from "../lib/api/apiConfig";
import { useContext } from "react";
import { MyContext } from "../MyContext";
import DefaultLayout from "../components/layouts/defaultlayout";
import StudyDashboard from "../components/landing/studyDashboard";
import TaskSidebar from "../components/landing/todo";

const Home = () => {
  const { me, setMe } = useContext(MyContext);
  const [myinfo, setMyinfo] = useState(me);
  useEffect(() => {
    me ? setMyinfo(me) : null;
  }, [me]);

  return (
    <>
      <DefaultLayout RightSidebar={TaskSidebar} active="dashboard">
        <div className="p-6 bg-gray-100 min-h-screen flex  justify-center">
          <StudyDashboard />
        </div>
      </DefaultLayout>
    </>
  );
};

export default Home;
