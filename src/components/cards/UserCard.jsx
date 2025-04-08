import React, { useState } from "react";
import swal from "sweetalert";
import { path } from "../../utils/Variables";
import { Lock } from "lucide-react";
import { CiLock, CiUnlock } from "react-icons/ci";

const UserCard = ({ data, fetchData }) => {
  const { id, post, firstName, lastName, email, picture, active, role } = data;

  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const deleteUser = async () => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this Admin?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      //   const result = await axios.delete(`${path}user/${_id}`);
      //   if (result.data.success) {
      //     swal("Success!", result.data.message, "success");
      //     fetchData();
      //   } else {
      //     return swal("Error!", result.adta.message, "error");
      //   }
    }
  };

  return (
    <>
      <div className=" relative w-full flex flex-col gap-4 bg-white p-5 shadow border border-gray-100 rounded-md ">
        {/* <div className="absolute -top-1 -right-1  rounded-full w-7 h-7 bg-red-100  flex items-center justify-center">
            <CiLock className="text-red-900"  size={18} />
            <CiUnlock  size={20} />
        </div> */}
        <div className="$ flex flex-row items-center gap-2">
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
            <span className="font-semibold text-xs text-gray-500  ">{role}</span>
          </div>
        </div>
        <div className="text-sm">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-gray-800">Email:</h2>
            <span className="text-gray-500">{email}</span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-gray-800">Telephone:</h2>
            <span className="text-gray-500">{post}</span>
          </div>
        </div>
          <div className="border-b border-gray-300"></div>
        <div className="grid grid-cols-2 gap-4 w-full text-gray-700 items-center text-sm ">
          <button
            onClick={toggleModal}
            className="w-full py-1 rounded-md  border bg-blue-50 hover:bg-cyan-800 text-cyan-800 hover:text-white transition-all ease-in-out duration-500 "
          >
            Modifier
          </button>

          <button
            onClick={deleteUser}
            className="w-full py-1 rounded-md  border bg-red-50 text-red-800 hover:text-white hover:bg-rose-800 transition-all ease-in-out duration-500"
          >
            Supprimer
          </button>
        </div>
      </div>
      {/* <AddUserModal
        modalOpen={modalOpen}
        toggleModal={toggleModal}
        fetchData={fetchData}
        data={data}
      /> */}
    </>
  );
};

export default UserCard;
