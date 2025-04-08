// import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { BiHomeAlt2 } from "react-icons/bi";
import { CiUser } from "react-icons/ci";

import Logo from "../../assets/logo_sebntn.png";
import { Link, useLocation } from "react-router";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import { FaCodeBranch } from "react-icons/fa";
import { FileSpreadsheet, FolderRoot, PencilRuler } from "lucide-react";
import { BsDiagram3 } from "react-icons/bs";

const Sidebar = () => {
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
    <div className="bg-white h-full w-64 pl-4 pr-6 fixed top-0 left-0 overflow-y-auto shadow-special-navbar">
      <div className="h-full pb-6 flex flex-col justify-between">
        <div className="">
          <div className="w-full px-10 py-6">
            <img src={Logo} alt="logo" className="w-full h-auto" />
          </div>
          <div className="flex flex-col gap-3 items-center mt-4 text-[#8D8989]">
            {/* Dashboard */}
            <Link
              to="/"
              className={`w-full flex flex-row rounded-md gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition-all ease-in-out duration-500 ${
                ["/"].includes(location.pathname)
                  ? "bg-gray-800 text-white"
                  : "text-[#8D8989]"
              }`}
            >
              <BiHomeAlt2 {...iconConfigH} />
              <span className="text-base font-semibold">Dashboard</span>
            </Link>

            {/* Users */}
            <Link
              to="/users"
              className={`w-full flex flex-row rounded-md gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition-all ease-in-out duration-500 ${
                ["/users"].includes(location.pathname)
                  ? "bg-gray-800 text-white"
                  : "text-[#8D8989]"
              }`}
            >
              <CiUser {...iconConfig} />
              <span className="text-base font-semibold">Employees</span>
            </Link>

            {/* Equipements */}
            <Link
              to="/equipements"
              className={`w-full flex flex-row rounded-md gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition-all ease-in-out duration-500 ${
                ["/equipements"].includes(location.pathname)
                  ? "bg-gray-800 text-white"
                  : "text-[#8D8989]"
              }`}
            >
              <PencilRuler size={20}  />
              {/* <TbTools  {...iconConfig} /> */}
              <span className="text-base font-semibold">Equipements</span>
            </Link>

            {/* Projects */}
            <Link
              to="/projects"
              className={`w-full flex flex-row rounded-md gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition-all ease-in-out duration-500 ${
                ["/projects"].includes(location.pathname)
                  ? "bg-gray-800 text-white"
                  : "text-[#8D8989]"
              }`}
            >
              <FileSpreadsheet size={20} />
              {/* <LiaProjectDiagramSolid {...iconConfig} /> */}
              <span className="text-base font-semibold">Projects</span>
            </Link>

            {/* Interventions */}
            <Link
              to="/interventions"
              className={`w-full flex flex-row rounded-md gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition-all ease-in-out duration-500 ${
                ["/interventions"].includes(location.pathname)
                  ? "bg-gray-800 text-white"
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
            &copy; Copyright 2025 -----
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
