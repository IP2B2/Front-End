'use client';
import { createContext, useContext, useState } from 'react';

const LayoutContentContext = createContext();

export function LayoutContentProvider({ children }) {
  const [extraContent, setExtraContent] = useState({ pageTitle: '' });

  return (
    <LayoutContentContext.Provider value={{ extraContent, setExtraContent }}>
      {children}
    </LayoutContentContext.Provider>
  );
}

export function useLayoutContent() {
  return useContext(LayoutContentContext);
}