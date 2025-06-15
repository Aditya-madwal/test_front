import React, { useEffect, useState } from "react";
import api from "../lib/api/apiConfig";
import { useContext } from "react";
import { MyContext } from "../MyContext";
import DefaultLayout from "../components/layouts/defaultlayout";
import UserDashboard from "../components/user/UserDashboard";

const User = () => {
  const { me, setMe } = useContext(MyContext);
  const [myinfo, setMyinfo] = useState(me);
  useEffect(() => {
    me ? setMyinfo(me) : null;
  }, [me]);

  return (
    <>
      <DefaultLayout RightSidebar={null} active="profile">
        <div className="p-6 bg-gray-100 min-h-screen flex  justify-center">
          <UserDashboard />
        </div>
      </DefaultLayout>
    </>
  );
};

export default User;
