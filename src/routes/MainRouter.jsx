import React, { useContext, useEffect, useState } from "react";
import {
  Dashboard,
  Navbar,
  Sidebar,
  Users,
  Projects,
  Equipments,
  Intervention,
  Auth,
} from "../containers";
import { Navigate, Route, Routes, useLocation } from "react-router";
import PrivateRoute from "./PrivateRoute ";
import { AuthContext } from "../contextHook/AuthContext";

const MainRouter = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      {location.pathname === "/login" ? null : (
        <Navbar
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
        />
      )}
      <div
        className={` w-full ${
          location.pathname === "/login" ? "" : " sm:pl-56 pt-16"
        }  ${isScrolled ? "" : ""}`}
      >
        {location.pathname === "/login" ? null : (
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        )}

        <div className={`${location.pathname === "/login" ? "" : "p-6"}`}>
          <Routes>
            <Route
              index
              element={
                <PrivateRoute role={"admin"}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="login"
              element={user ? <Navigate to="/" replace /> : <Auth />}
            />
            <Route
              path="users"
              element={
                <PrivateRoute role={"admin"}>
                  <Users />
                </PrivateRoute>
              }
            />
            <Route
              path="projects"
              element={
                <PrivateRoute role={null}>
                  <Projects />
                </PrivateRoute>
              }
            />
            <Route
              path="equipements"
              element={
                <PrivateRoute>
                  <Equipments />
                </PrivateRoute>
              }
            />
            <Route
              path="interventions"
              element={
                <PrivateRoute>
                  <Intervention />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MainRouter;
