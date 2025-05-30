'use client'

import React, { createContext, useState, useContext } from "react";


export const RootContext = createContext();

export const RootContextProvider = ({ children }) => {

  const [testState, setTestState] = useState("test");

  return (
    <RootContext.Provider value={{ testState, setTestState }}>
      {children}
    </RootContext.Provider>
  );
}

export const useRootContext = () => {
  return useContext(RootContext);
};