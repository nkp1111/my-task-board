"use client";

import React, { createContext } from 'react'

const AppContext = createContext<any>(null);

const AppProvider = ({ children }: { children: React.ReactNode }) => {


  return (
    <AppContext.Provider
      value={{ key: "e" }}
    >
      {children}
    </AppContext.Provider>
  )
}


export {
  AppProvider,
  AppContext,
}