"use client"
import { Provider } from "react-redux"
import store from "../redux/store"
import { SessionProvider } from "next-auth/react";
const reduxProvider : React.FC<{children:React.ReactNode}> = ({ children }) => {
    return <SessionProvider><Provider store={store}>{children}</Provider></SessionProvider>;  };
  
  export default reduxProvider;
  