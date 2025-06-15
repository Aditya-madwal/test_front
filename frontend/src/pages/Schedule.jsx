import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { MyContext } from "../MyContext";
import DefaultLayout from "../components/layouts/defaultlayout";
import EventSidebar from "../components/schedule/EventSidebar";
import ScheduleDashboard from "../components/schedule/ScheduleDashboard";

const Schedule = () => {
  const { me, setMe } = useContext(MyContext);
  const [myinfo, setMyinfo] = useState(me);

  useEffect(() => {
    me ? setMyinfo(me) : null;
  }, [me]);

  const [eventProps, setEventProps] = useState(null);

  const EventSidebarWithProps = () => (
    <EventSidebar
      eventTitle={eventProps?.eventTitle}
      date={eventProps?.date}
      colorHex={eventProps?.colorHex}
      categoryName={eventProps?.categoryName}
      description={eventProps?.description}
      uid={eventProps?.uid}
    />
  );

  return (
    <>
      <DefaultLayout RightSidebar={EventSidebarWithProps} active="Schedule">
        <div className="p-6 bg-gray-100 min-h-screen flex  justify-center">
          <ScheduleDashboard setEventProps={setEventProps} />
        </div>
      </DefaultLayout>
    </>
  );
};

export default Schedule;
