import React, { useState } from "react";
import swal from "sweetalert";
import { path } from "../../utils/Variables";
import {
  CircleAlertIcon,
  CircleCheckBig,
  Eye,
  LockKeyhole,
  LockKeyholeOpen,
  Trash2,
  UserPen,
} from "lucide-react";
import { CiCrop, CiLock, CiText, CiUnlock } from "react-icons/ci";
import UserCardDetail from "../modals/UserCardDetail";
import UserModal from "../modals/UserModal";
import axios from "axios";
import Swal from "sweetalert2";

const UserCard = ({ data, fetchData }) => {
  const {
    id,
    firstName,
    lastName,
    code,
    email,
    post,
    project,
    role,
    picture,
    active,
  } = data;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenDetails, setModalOpenDetails] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);
  const toggleModalDetails = () => setModalOpenDetails(!modalOpenDetails);

  const deleteUser = async () => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: `Are you sure that you want to delete ${firstName} ${lastName}?`,
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      console.log(id);

      await axios
      .delete(`${path}user/one/${data._id}`)
      .then((res) => {
        if (res.data?.success) {
          Swal.fire({
            title: "Deleted!",
            text: res.data?.message,
            icon: "success",
          });
          fetchData();
        } else {
          Swal.fire({
            title: "Error!",
            text: "somethins with server",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
        // console.log(error);
      });
        fetchData();
    }
  };

  
  const ToggleEctiveStatus = async () => {

    await axios
      .get(`${path}user/activatestatus/${data._id}`)
      .then((res) => {
         if (res.data?.success) {
              Swal.fire({
                title: "Satus Updated!",
                text: res.data?.message,
                icon: "success",
              });
              fetchData();
            } else {
              Swal.fire({
                title: "Error!",
                text: "somethins with server",
                icon: "error",
              });
            }
      })
      .catch((error) => console.log(error));
  }


  return (
    <>
      <div className=" relative w-full flex flex-col gap-4 bg-white p-5 shadow border border-gray-100 rounded-md ">
        <div className="absolute -top-1 -right-1  rounded-full w-8 h-8 bg-gray-f4  flex items-center justify-center">
          {active ? (
            <CircleCheckBig
              color="green"
              size={24}
              className="bg-transparent"
            />
          ) : (
            <CircleAlertIcon color="red" size={24} className="bg-transparent" />
          )}
        </div>
        <div className="flex flex-row items-center gap-2">
          {picture ? (
            <img
              className="w-16 h-16 rounded-lg"
              src={`${path}uploads/images/${picture}`}
              alt="avatar"
            />
          ) : (
            <div className="w-14 h-14 rounded-md bg-gray-100 flex justify-center items-center text-gray-800 font-semibold text-xl">
              <span>
                {!picture ? `${firstName.charAt(0)}${lastName.charAt(0)}` : ""}
              </span>
            </div>
          )}
          <div className="">
            <h2 className="font-medium text-gray-800 leading-0">
              {firstName} {lastName}
            </h2>
            <span className="font-semibold text-xs text-gray-500  ">
              {role}
            </span>
          </div>
        </div>
        <div className="text-sm">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-gray-800 font-semibold">Code:</h2>
            <span className="text-gray-500">{code}</span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-gray-800 font-semibold">Email:</h2>
            <span className="text-gray-500">{email}</span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-gray-800 font-semibold">Post:</h2>
            <span className="text-gray-500">{post}</span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-gray-800 font-semibold">Project:</h2>
            <span className="text-gray-500">{project}</span>
          </div>
        </div>
        <div className="border-b border-gray-300"></div>
        {/* <div className="w-full flex flex-row gap-4 "> */}
        <div className="w-full  grid grid-cols-4 gap-4 text-gray-700 items-center text-sm ">
          <button
            onClick={toggleModal}
            className="h-8 rounded-md  border border-cyan-800 bg-blue-50 hover:bg-cyan-800 text-cyan-800 hover:text-white transition-all ease-in-out duration-500 cursor-pointer flex items-center justify-center"
          >
            <UserPen size={22} strokeWidth={1.5} />
          </button>

          <button
            onClick={deleteUser}
            className="h-8 rounded-md  border border-red-800 bg-red-50 text-red-800 hover:text-white hover:bg-rose-800 transition-all ease-in-out duration-500 cursor-pointer flex items-center justify-center"
          >
            <Trash2 size={22} strokeWidth={1.25} />
          </button>
          {/* </div> */}
          <button
            onClick={ToggleEctiveStatus}
            className=" h-8 rounded-md border bg-gray-50 text-gray-700 hover:text-white hover:bg-gray-700 transition-all ease-in-out duration-500 px-2 cursor-pointer flex items-center justify-center"
          >
            {active ? (
              <LockKeyhole size={22} strokeWidth={1.5} />
            ) : (
              <LockKeyholeOpen size={22} strokeWidth={1.5} />
            )}
          </button>
          <button
            onClick={toggleModalDetails}
            className=" h-8 rounded-md  border bg-purple-50 text-purple-800 hover:text-white hover:bg-purple-800 transition-all ease-in-out duration-500 px-2 cursor-pointer flex items-center justify-center"
          >
            <Eye size={24} strokeWidth={1.25} />
          </button>
        </div>
      </div>
      {/* <AddUserModal
        modalOpen={modalOpen}
        toggleModal={toggleModal}
        fetchData={fetchData}
        data={data}
        /> */}
      <UserModal
        modalOpen={modalOpen}
        toggleModal={toggleModal}
        fetchData={fetchData}
        data={data}
      />
      <UserCardDetail
        modalOpen={modalOpenDetails}
        toggleModalD={toggleModalDetails}
        data={data}
        deleteUser={deleteUser}
        toggleModal={toggleModal}
        ToggleEctiveStatus={ToggleEctiveStatus}
      />
    </>
  );
};

export default UserCard;
