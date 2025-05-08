import { Link, useLocation } from "react-router";
import { BiHomeAlt2 } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import Logo from "../../assets/logo_sebntn.png";
import { FileSpreadsheet, PencilRuler } from "lucide-react";
import { BsDiagram3 } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "../../contextHook/AuthContext";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const iconConfig = {
    size: "1.5em",
    style: { strokeWidth: "0.8" },
  };
  const iconConfigH = {
    size: "1.5em",
    style: { strokeWidth: "0.2" },
  };

  return (
    <div
      className={`bg-white h-full w-56 pl-4 pr-6 pt-8 sm:pt-0 fixed top-0 left-0 overflow-y-auto shadow-special-navbar z-30 transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } sm:translate-x-0`}
    >
      <div className="h-full pb-6 flex flex-col justify-between">
        <div>
          <div className="w-full px-2 h-40 flex items-center">
            <img src={Logo} alt="logo" className="w-full h-auto" />
          </div>
          <div className="flex flex-col gap-3 items-center text-sm text-[#8D8989]">
            {/* Dashboard */}
            {user?.role === "admin" && (
              <Link
                to="/"
                onClick={() => setIsSidebarOpen((prev) => !prev)}
                className={`w-full flex flex-row rounded-md gap-3 px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out duration-500 ${
                  ["/"].includes(location.pathname)
                    ? "bg-primary text-white"
                    : "text-[#8D8989]"
                }`}
              >
                <BiHomeAlt2 {...iconConfigH} />
                <span className="text-base font-semibold">Dashboard</span>
              </Link>
            )}
            {/* Users */}
            {user?.role === "admin" && (
              <Link
                to="/users"
                onClick={() => setIsSidebarOpen((prev) => !prev)}
                className={`w-full flex flex-row rounded-md gap-3 px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out duration-500 ${
                  ["/users"].includes(location.pathname)
                    ? "bg-primary text-white"
                    : "text-[#8D8989]"
                }`}
              >
                <CiUser {...iconConfig} />
                <span className="text-base font-semibold">Employees</span>
              </Link>
            )}
            {/* Equipements */}
            <Link
              to="/equipements"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className={`w-full flex flex-row rounded-md gap-3 px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out duration-500 ${
                ["/equipements"].includes(location.pathname)
                  ? "bg-primary text-white"
                  : "text-[#8D8989]"
              }`}
            >
              <PencilRuler size={20} />
              <span className="text-base font-semibold">Equipements</span>
            </Link>
            {/* Projects */}
            <Link
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              to="/projects"
              className={`w-full flex flex-row rounded-md gap-3 px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out duration-500 ${
                ["/projects"].includes(location.pathname)
                  ? "bg-primary text-white"
                  : "text-[#8D8989]"
              }`}
            >
              <FileSpreadsheet size={20} />
              <span className="text-base font-semibold">Projects</span>
            </Link>
            {/* Interventions */}
            <Link
              to="/interventions"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className={`w-full flex flex-row rounded-md gap-3 px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out duration-500 ${
                ["/interventions"].includes(location.pathname)
                  ? "bg-primary text-white"
                  : "text-[#8D8989]"
              }`}
            >
              <BsDiagram3 {...iconConfigH} />
              <span className="text-base font-semibold">Interventions</span>
            </Link>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <footer className="text-xs font-medium text-gray-600">
            © Copyright 2025 -----
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
