import React, { useEffect, useState } from "react";
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
import { Route, Routes, useLocation } from "react-router";

const MainRouter = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

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
      {location.pathname === "/login" ? null : <Navbar />}
      <div
        className={` w-full ${
          location.pathname === "/login" ? "" : "pl-56 pt-16"
        }  ${isScrolled ? "" : ""}`}
      >
        {location.pathname === "/login" ? null : <Sidebar />}

        <div className={`${location.pathname === "/login" ? "" : "p-6"}`}>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="login" element={<Auth />} />
            <Route path="users" element={<Users />} />
            <Route path="projects" element={<Projects />} />
            <Route path="equipements" element={<Equipments />} />
            <Route path="interventions" element={<Intervention />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MainRouter;
