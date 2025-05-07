import { FileUp, UserPlus } from "lucide-react";
import React, { useState } from "react";
import { useLocation } from "react-router";

const Filter = ({
  toggleModal,
  toggleUploadFileModal,
  currentPage,
  totalPages,
  onPageChange,
  onSearch,
}) => {
  const location = useLocation();
  const [searchInput, setSearchInput] = useState("");
  const searchData = (e) => {
    setSearchInput(e.target.value);
    onSearch(e.target.value);
  };
  return (
    <div className="bg-white shadow border border-gray-100 rounded-md flex flex-row items-center justify-between py-2 px-6">
      <div className=" flex fle-row items-center gap-4">
        {location.pathname === "/interventions" ? null : (
          <button
            onClick={toggleUploadFileModal}
            className="text-xs flex items-center gap-1 font-semibold text-primary border border-primary hover:bg-primary hover:text-white rounded-md px-2 py-1.5 transition ease-in-out duration-300 cursor-pointer"
          >
            <FileUp strokeWidth={1.75} size={16} /> <p>Excel File</p>
          </button>
        )}
        <button
          onClick={toggleModal}
          className="text-xs flex items-center gap-1 font-semibold text-primary border border-primary hover:bg-primary hover:text-white rounded-md px-2 py-1.5 transition ease-in-out duration-300 cursor-pointer"
        >
          <UserPlus strokeWidth={1.75} size={16} />
          <p>Nouveau {location.pathname.split("/")[1]}</p>
        </button>
        <div className="relative">
          <input
            onChange={searchData}
            value={searchInput}
            // onkey
            // onKeyPress={(e) => {
            //   if (e.key === "Enter") {
            //     onSearch(searchInput);
            //   }
            // }}
            type="search"
            id="floating_outlined"
            className="block px-2.5 py-1 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_outlined"
            className="absolute text-xs text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Search All {location.pathname.split("/")[1]}
          </label>
        </div>
        {/* <button className="flex items-center justify-center px-3 h-8 leading-tight text-blue-600 bg-blue-50 border rounded border-gray-300 hover:bg-blue-100 hover:text-blue-700">
          All
        </button> */}
      </div>
      <div className="">
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px text-sm">
            <li>
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
              >
                Previous
              </button>
            </li>
            <li className="flex flex-row items-center gap-0">
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <span key={page}>
                    <button
                      onClick={() => onPageChange(page)}
                      className={`flex items-center justify-center px-3 h-8 leading-tight ${
                        currentPage === page
                          ? "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                          : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                      }`}
                    >
                      {page}
                    </button>
                  </span>
                );
              })}
            </li>

            <li>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Filter;
