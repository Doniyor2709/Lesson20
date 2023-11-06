import { Fragment, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/isAuthContext";
import { ToastContainer } from "react-toastify";

import HomePage from "./pages/HomePage";
import ClientLayout from "./components/clientlayout";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminLayout from "./components/adminlayout";
import AdminExperiencesPage from "./pages/admin/Experiences";
import AdminUsersPage from "./pages/admin/Users";
import AdminEducationPage from "./pages/admin/Education";


import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { isAuth } = useContext(AuthContext);
  return (
    <Fragment>
      <ToastContainer />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route path="" element={<HomePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin/"
          element={isAuth ? <AdminLayout /> : <Navigate to="/login" />}
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="experiences" element={<AdminExperiencesPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="education" element={<AdminEducationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Fragment>
  );
}

export default App;
