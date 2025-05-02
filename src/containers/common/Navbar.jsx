import { useLocation } from "react-router";

import { BiHomeAlt2 } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { useState } from "react";
import { Bell, FileSpreadsheet, Mail, PencilRuler, Search } from "lucide-react";
import { BsDiagram3 } from "react-icons/bs";
// import axios from "axios";
// import { path } from "../../utils/Variables";

const Navbar = () => {
  const location = useLocation();
  const [name, setName] = useState("Ahmed");

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
  //   const currentRoute =
  //     location.pathname.split("/").length > 2
  //       ? location.pathname.split("/")[1]
  //       : location.pathname.split("/");
  const currentLabel = routeLabels[currentRoute] || "Unknown";

  const currentIcon = routeIcons[currentRoute] || (
    <BiHomeAlt2 {...iconConfigH} />
  );

  // useEffect(() => {
  //   const fetchPatientData = async () => {
  //     const result = await axios.get(
  //       `${path}patient/${
  //         location.pathname.split("/")[location.pathname.split("/").length]
  //       }`
  //     );
  //     // console.log(result.data.data.prenom);
  //     setName(result.data.data.nom + " " + result.data.data.prenom);
  //   };
  //   if (
  //     location.pathname.split("/").length > 2 &&
  //     location.pathname.split("/")[1] === "patient"
  //   ) {
  //     fetchPatientData();
  //   }
  // }, [location.pathname]);

  return (
    <div className="h-14 fixed top-4 right-0 left-56 z-50 px-6">
      <div className="bg-white h-full rounded-md shadow-md flex flex-row items-center justify-between pl-6 pr-4 text-black border border-gray-100 ">
        <div className=" flex flex-row items-center justify-between w-2/3 ">
          <div className="flex flex-row gap-2 items-center transition-transform duration-500 ease-in-out transform divide-x-2 divide-blue-[#919191]">
            <div className="flex flex-row items-center gap-4">
              {currentIcon}
              <span className="text-sm font-medium ">{currentLabel}</span>
            </div>
            {location.pathname.split("/").length > 2 &&
            location.pathname.split("/")[1] === "patient" ? (
              <span className="text-sm font-medium pl-2">{name}</span>
            ) : null}
          </div>

          {/* <form className="">
            <label
              htmlFor="search"
              className=" text-sm font-medium text-gray-900 sr-only "
            >
              Search
            </label>
            <div className="relative ">
              <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
                <svg
                  className="w-3 h-3 text-gray-500 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="search"
                className="block w-56 p-1.5 ps-7 text-xs text-gray-900 shadow rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none d"
                placeholder="Trouver un patient ou un rapport"
                required
              />
            </div>
          </form> */}
        </div>
        <div className=" pl-6 flex flex-row items-center gap-10 ">
          {/* <label
            htmlFor="search"
            className="hidden sm:block border border-gray-300 rounded-md relative pl-8 pr-2 py-1"
          >
            <Search
              size={20}
              strokeWidth={1.5}
              className="absolute left-1.5 top-1.5 "
            />
            <input
              id="search"
              placeholder="Search.."
              type="search"
              className="outline-none"
            />
          </label> */}
          <div className="flex flex-row items-center gap-6">
            <Bell size={20} className="" />
            <Mail size={20} className="" />
          </div>
          <div className="flex flex-row gap-2 items-center text-xs">
            {/* <span className="border rounded-full">bull</span> */}
            <img
              className="w-8 h-8 rounded-full"
              src="https://i.pinimg.com/564x/3a/f1/c7/3af1c73dd7fe817a9e02a94562662e78.jpg"
              alt="Rounded avatar"
            />
            <div className="flex flex-col">
              <span className="font-semibold">{name}</span>
              <span className="font-medium text-[#33B0C4]">Administrator</span>
            </div>
            <button>
              <IoIosArrowDown color="#202020" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
