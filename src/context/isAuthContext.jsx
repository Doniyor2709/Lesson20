import Cookies from "js-cookie";
import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
  const [isAuth, setIsAuth] = useState(Cookies.get("token") || false);
  return (
    <AuthContext.Provider value={{isAuth, setIsAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
