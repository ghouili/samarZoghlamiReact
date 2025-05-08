import { useLocation } from "react-router";
import { BiHomeAlt2 } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { useState, useContext } from "react";
import {
  Bell,
  FileSpreadsheet,
  Mail,
  PencilRuler,
  Menu,
  EllipsisVertical,
  LogOut,
  Logs,
} from "lucide-react";
import { BsDiagram3 } from "react-icons/bs";
import { AuthContext } from "../../contextHook/AuthContext";
import { path } from "../../utils/Variables";

const Navbar = ({ setIsSidebarOpen, isSidebarOpen }) => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  // const [name, setName] = useState("Ahmed");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const iconConfig = {
    color: "#202020",
    size: "1.2em",
    style: { strokeWidth: "0.8" },
  };

  const iconConfigH = {
    color: "#202020",
    size: "1.2em",
    style: { strokeWidth: "0.2" },
  };

  const routeLabels = {
    "": "Dashboard",
    users: "Employees",
    equipements: "Equipements",
    projects: "Projects",
    interventions: "Interventions",
  };

  const routeIcons = {
    "": <BiHomeAlt2 {...iconConfigH} />,
    users: <CiUser {...iconConfig} />,
    equipements: <PencilRuler size={18} />,
    projects: <FileSpreadsheet size={18} />,
    interventions: <BsDiagram3 {...iconConfigH} />,
  };

  const currentRoute = location.pathname.split("/")[1];
  const currentLabel = routeLabels[currentRoute] || "Unknown";
  const currentIcon = routeIcons[currentRoute] || (
    <BiHomeAlt2 {...iconConfigH} />
  );

  return (
    <div className="h-14 fixed top-4 right-0 left-0 sm:left-56 z-50 px-6">
      <div className="bg-white h-full rounded-md shadow-md flex flex-row items-center justify-between px-6 text-black border border-gray-100">
        <div className="flex flex-row items-center text-gray-700">
          <button
            className="sm:hidden mr-4"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            {isSidebarOpen ? <Logs size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex flex-row gap-2 items-center transition-transform duration-500 ease-in-out transform divide-x-2 divide-blue-[#919191]">
            <div className="flex flex-row items-center gap-4">
              {currentIcon}
              <span className="text-sm font-medium">{currentLabel}</span>
            </div>
            {location.pathname.split("/").length > 2 &&
            location.pathname.split("/")[1] === "patient" ? (
              <span className="text-sm font-medium pl-2">{name}</span>
            ) : null}
          </div>
        </div>
        <div className="pl-6 flex flex-row items-center gap-10">
          <div className="hidden lg:flex flex-row items-center gap-6">
            <Bell size={20} />
            <Mail size={20} />
          </div>
          <div className="relative flex flex-row gap-2 items-center text-xs">
            <img
              className="w-8 h-8 rounded-full hidden sm:block"
              src={`${path}uploads/images/${user?.picture}`}
              alt="Rounded avatar"
            />
            <div className="sm:flex flex-col hidden ">
              <span className="font-semibold">{user?.name}</span>
              <span className="font-medium text-[#33B0C4]">{user?.role}</span>
            </div>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="hidden sm:block"
            >
              <IoIosArrowDown color="#202020" size={18} />
            </button>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="sm:hidden block"
            >
              <EllipsisVertical color="#202020" size={18} />
            </button>
            <div
              className={`border border-gray-200 absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-xl py-2 transition-all duration-300 ease-in-out transform origin-top ${
                isUserMenuOpen
                  ? "opacity-100 scale-y-100"
                  : "opacity-0 scale-y-0 pointer-events-none"
              }`}
            >
              <div className="flex flex-row text-sm items-center gap-2 px-4 py-2 sm:py-0 ">
                <img
                  className="w-8 h-8 rounded-full sm:hidden block"
                  src={`${path}uploads/images/${user?.picture}`}
                  alt="Rounded avatar"
                />
                <div className="flex flex-col sm:hidden ">
                  <span className="font-semibold">{user?.name}</span>
                  <span className="font-medium text-[#33B0C4]">
                    {user?.role}
                  </span>
                </div>
              </div>
              <div className="border-b border-gray-400 mx-2 sm:hidden block" />
              <button
                onClick={logout}
                className=" px-4 py-2 text-sm hover:bg-gray-100 w-full text-left text-red-800 font-medium flex gap-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
