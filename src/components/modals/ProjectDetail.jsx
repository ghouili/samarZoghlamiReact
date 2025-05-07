import { Trash2, UserPen, X } from "lucide-react";
import React from "react";
import { Tooltip } from "react-tooltip";

const ProjectDetail = ({
  data,
  toggleModalUpdate,
  modalOpen,
  toggleModal,
  deleteProject,
}) => {
  const { code, cmn, refTSK, qte, pin, sap1, sap2, refS, status } = data;

  const updateProject = () => {
    toggleModal();
    toggleModalUpdate();
  };

  return (
    <>
      {modalOpen && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center"
        >
          <div className="fixed inset-0 bg-gray-900 opacity-30 backdrop-filter backdrop-blur-sm" />
          <div className="relative p-4 w-full max-w-xl max-h-full overflow-y-auto overflow-x-hidden">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex justify-end px-4 pt-4">
                <button
                  className="inline-block text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5"
                  type="button"
                  onClick={toggleModal}
                >
                  <X size={25} strokeWidth={1.75} />
                </button>
              </div>
              <div className="flex flex-col items-center pb-6 gap-6">
                <div className="flex flex-col items-center gap-2">
                  <h2 className="font-medium text-primary/100 leading-0 text-3xl">
                    {code}
                  </h2>
                  <span className="font-semibold text-gray-600 text-sm">
                    Project
                  </span>
                </div>
                <div className="w-3/4 text-base">
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="text-gray-800">CMN:</h2>
                    <span className="text-gray-500">{cmn}</span>
                  </div>
                  <div className="w-11/12 border-b border-gray-300 self-center mx-auto my-1" />
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="text-gray-800">Ref TSK:</h2>
                    <span className="text-gray-500">{refTSK}</span>
                  </div>
                  <div className="w-11/12 border-b border-gray-300 self-center mx-auto my-1" />
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="text-gray-800">Quantity:</h2>
                    <span className="text-gray-500">{qte}</span>
                  </div>
                  <div className="w-11/12 border-b border-gray-300 self-center mx-auto my-1" />
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="text-gray-800">Pin:</h2>
                    <span className="text-gray-500">{pin}</span>
                  </div>
                  <div className="w-11/12 border-b border-gray-300 self-center mx-auto my-1" />
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="text-gray-800">SAP1:</h2>
                    <span className="text-gray-500">{sap1 || "N/A"}</span>
                  </div>
                  <div className="w-11/12 border-b border-gray-300 self-center mx-auto my-1" />
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="text-gray-800">SAP2:</h2>
                    <span className="text-gray-500">{sap2 || "N/A"}</span>
                  </div>
                  <div className="w-11/12 border-b border-gray-300 self-center mx-auto my-1" />
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="text-gray-800">Ref S:</h2>
                    <span className="text-gray-500">{refS}</span>
                  </div>
                  <div className="w-11/12 border-b border-gray-300 self-center mx-auto my-1" />
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="text-gray-800">Status:</h2>
                    <span className="text-gray-500">{status ? status : "-------"}</span>
                  </div>
                </div>
                <div className="w-2/3 grid grid-cols-2 gap-4 text-gray-700 items-center text-sm">
                  <button
                    onClick={updateProject}
                    data-tooltip-id="EditProject"
                    data-tooltip-content="Edit Project"
                    data-tooltip-delay-hide={300}
                    className="h-8 rounded-md border border-cyan-800 bg-blue-50 hover:bg-cyan-800 text-cyan-800 hover:text-white transition-all ease-in-out duration-500 cursor-pointer flex items-center justify-center"
                  >
                    <UserPen size={22} strokeWidth={1.5} />
                    <Tooltip id="EditProject" />
                  </button>
                  <button
                    onClick={() => {
                      deleteProject();
                      toggleModal();
                    }}
                    data-tooltip-id="deleteProject"
                    data-tooltip-content="Delete Project"
                    data-tooltip-delay-hide={300}
                    className="h-8 rounded-md border border-red-800 bg-red-50 text-red-800 hover:text-white hover:bg-rose-800 transition-all ease-in-out duration-500 cursor-pointer flex items-center justify-center"
                  >
                    <Trash2 size={22} strokeWidth={1.25} />
                    <Tooltip id="deleteProject" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectDetail;
