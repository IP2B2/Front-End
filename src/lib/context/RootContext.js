'use client'

import React, { createContext, useState, useContext } from "react";


export const RootContext = createContext();

export const RootContextProvider = ({ children }) => {

  const [showNavbar, setShowNavbar] = useState(true);

  return (
    <RootContext.Provider value={{ showNavbar, setShowNavbar }}>
      {children}
    </RootContext.Provider>
  );
}

export const useRootContext = () => {
  return useContext(RootContext);
};