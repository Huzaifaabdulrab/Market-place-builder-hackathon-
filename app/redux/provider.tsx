"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "../redux/store"; // Adjust the path to import your Redux store

interface ProviderProps {
  children: ReactNode; // Fixed typo in "children"
}

const Prvider: React.FC<ProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Prvider;
