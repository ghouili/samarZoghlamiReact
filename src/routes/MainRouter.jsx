import React, { useEffect, useState } from "react";
import { Dashboard, Navbar, Sidebar, Users } from "../containers";
import { Route, Routes } from "react-router";

const MainRouter = () => {
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
      <Navbar />
      <div className={` w-full pl-56 pt-16  ${isScrolled ? "" : ""}`}>
        <Sidebar />

        <div className="p-6">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MainRouter;
