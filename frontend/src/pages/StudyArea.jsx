import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { MyContext } from "../MyContext";
import DefaultLayout from "../components/layouts/defaultlayout";
import AreaDashboard from "../components/studyarea/areaDashboard";
import FileSidebar from "../components/studyarea/fileSidebar";

const StudyAreaDashboard = () => {
  const { me, setMe } = useContext(MyContext);
  const [myinfo, setMyinfo] = useState(me);
  const [selectedFile, setSelectedFile] = useState({});

  const SidebarWithProps = () => (
    <FileSidebar
      roadmapUid={selectedFile?.roadmapUid || ""}
      fileId={selectedFile?.id || ""}
      fileName={selectedFile?.name || "No file selected"}
      topic={selectedFile?.topic || "No topic"}
      dateUploaded={selectedFile?.dateUploaded || ""}
      summary={selectedFile?.summary || "No summary available"}
    />
  );

  return (
    <>
      <DefaultLayout RightSidebar={SidebarWithProps}>
        <div className="p-6 bg-gray-100 min-h-screen flex  items-center justify-center">
          <AreaDashboard setSelectedFile={setSelectedFile} />
        </div>
      </DefaultLayout>
    </>
  );
};

export default StudyAreaDashboard;
