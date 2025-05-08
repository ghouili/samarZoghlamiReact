import React from "react";
import { path } from "../../utils/Variables";
import { Tooltip } from "react-tooltip";
import { LockKeyhole, LockKeyholeOpen, Trash2, UserPen, X } from "lucide-react";

const UserCardDetail = ({
  data,
  toggleModalD,
  modalOpen,
  toggleModal,
  deleteUser,
  ToggleEctiveStatus,
}) => {
  const {
    // id,
    firstName,
    lastName,
    code,
    email,
    post_hr,
    post,
    affectation,
    dept,
    project,
    role,
    picture,
    active,
  } = data;

  const updateUser = () => {
    toggleModalD();
    toggleModal();
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
          <div className="fixed inset-0 bg-gray-900 opacity-30 backdrop-filter backdrop-blur-sm " />
          {/* <div className="fixed inset-0 bg-black opacity-50"></div> */}
          <div className="relative p-4 w-full max-w-xl max-h-full overflow-y-auto overflow-x-hidden">
            <div className="relative bg-white  rounded-lg shadow ">
              {/* <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm "> */}
              <div className="flex justify-end px-4 pt-4">
                <button
                  className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100  focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5"
                  type="button"
                  onClick={toggleModalD}
                >
                  <X size={25} strokeWidth={1.75} />
                </button>
              </div>
              <div className="flex flex-col items-center pb-6 gap-6 ">
                <div className=" flex flex-col items-center gap-2 ">
                  <div className="relative">
                    {picture ? (
                      <img
                        className="w-36 h-36 mb-3 rounded-full shadow-lg"
                        src={`${path}uploads/images/${picture}`}
                        alt="Bonnie image"
                      />
                    ) : (
                      <img
                        className="w-36 h-36 mb-3 rounded-full shadow-lg"
                        src={`${path}uploads/images/avatar.png`}
                        alt="Bonnie image"
                      />
                    )}
                    <button className="absolute right-3 bottom-3 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow cursor-pointer">
                      <UserPen
                        size={22}
                        strokeWidth={1.5}
                        className="ml-1 text-gray-600"
                      />
                    </button>
                  </div>
                  <div className="text-2xl text-center">
                    <h2 className="font-medium text-primary/100 leading-0">
                      {firstName} {lastName}
                    </h2>
                    <span className="font-semibold text-gray-600 text-base ">
                      {role}
                    </span>
                  </div>
                </div>
                <div className=" w-3/4 text-base ">
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="text-gray-800">Code:</h2>
                    <span className="text-gray-500">{code}</span>
                  </div>
                  <div className="w-11/12 border-b border-gray-300 self-center mx-auto my-1" />
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="text-gray-800">Email:</h2>
                    <span className="text-gray-500">{email}</span>
                  </div>
                  <div className="w-11/12 border-b border-gray-300 self-center mx-auto my-1" />
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="text-gray-800">Post:</h2>
                    <span className="text-gray-500">{post}</span>
                  </div>
                  <div className="w-11/12 border-b border-gray-300 self-center mx-auto my-1" />
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="text-gray-800">Position HR Sheet:</h2>
                    <span className="text-gray-500">{post_hr}</span>
                  </div>
                  <div className="w-11/12 border-b border-gray-300 self-center mx-auto my-1" />
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="text-gray-800">Affectation:</h2>
                    <span className="text-gray-500">{affectation}</span>
                  </div>
                  <div className="w-11/12 border-b border-gray-300 self-center mx-auto my-1" />
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="text-gray-800">Departement:</h2>
                    <span className="text-gray-500">{dept}</span>
                  </div>
                  <div className="w-11/12 border-b border-gray-300 self-center mx-auto my-1" />
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="text-gray-800">Project:</h2>
                    <span className="text-gray-500">
                      {project ? project.code : "------"}
                    </span>
                  </div>
                </div>
                {/* <div className="flex mt-4 md:mt-6"> */}
                <div className="w-2/3 grid grid-cols-3 gap-4 text-gray-700 items-center text-sm ">
                  <button
                    onClick={updateUser}
                    data-tooltip-id="EditUser"
                    data-tooltip-content="Edit User"
                    data-tooltip-delay-hide={300}
                    className="h-8 rounded-md  border border-cyan-800 bg-blue-50 hover:bg-cyan-800 text-cyan-800 hover:text-white transition-all ease-in-out duration-500 cursor-pointer flex items-center justify-center"
                  >
                    <UserPen size={22} strokeWidth={1.5} />
                    <Tooltip id="EditUser" />
                  </button>

                  <button
                    onClick={deleteUser}
                    data-tooltip-id="deleteUser"
                    data-tooltip-content="Delete User"
                    data-tooltip-delay-hide={300}
                    className="h-8 rounded-md  border border-red-800 bg-red-50 text-red-800 hover:text-white hover:bg-rose-800 transition-all ease-in-out duration-500 cursor-pointer flex items-center justify-center"
                  >
                    <Trash2 size={22} strokeWidth={1.25} />
                    <Tooltip id="deleteUser" />
                  </button>
                  {/* </div> */}
                  <button
                    onClick={ToggleEctiveStatus}
                    data-tooltip-id="LockUser"
                    data-tooltip-delay-hide={300}
                    className=" h-8 rounded-md  border bg-gray-50 text-gray-700 hover:text-white hover:bg-gray-700 transition-all ease-in-out duration-500 px-2 cursor-pointer flex items-center justify-center"
                  >
                    {active ? (
                      <LockKeyhole size={22} strokeWidth={1.5} />
                    ) : (
                      <LockKeyholeOpen size={22} strokeWidth={1.5} />
                    )}
                    <Tooltip id="LockUser" />
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

export default UserCardDetail;
