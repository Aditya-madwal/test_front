import React, { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

export const ContextProvider = ({ children }) => {
  const [me, setMe] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  return (
    <MyContext.Provider value={{ me, setMe, activeTab, setActiveTab }}>
      {children}
    </MyContext.Provider>
  );
};
