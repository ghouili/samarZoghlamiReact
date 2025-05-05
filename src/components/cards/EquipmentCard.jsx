import React, { useState } from "react";
import { path } from "../../utils/Variables";
import axios from "axios";
import Swal from "sweetalert2";
import EquipmentDetail from "../modals/EquipmentDetail";
import EquipmentModal from "../modals/EquipmentModal";
import { Eye, Trash2, UserPen } from "lucide-react";

const EquipmentCard = ({ data, fetchData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  console.log(data);
  
  const deleteEquipment = async () => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: `Delete equipment ${data.assetNumber}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmation.isConfirmed) {
      try {
        await axios.delete(`${path}equipment/one/${data._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        fetchData();
        Swal.fire("Deleted!", "Equipment removed successfully", "success");
      } catch (error) {
        Swal.fire(
          "Error!",
          error.response?.data?.message || error.message,
          "error"
        );
      }
    }
  };

  return (
    <>
      <div className="relative w-full flex flex-col gap-4 bg-white p-5 shadow border border-gray-100 rounded-md">
        <div>
          <h3 className="text-lg font-semibold text-primary">
            {data.assetNumber}
          </h3>
          {data.project ? (
            <div className="flex flex-row gap-1">
              <p className="text-sm text-gray-700 font-semibold">Project:</p>
              <p className="text-sm text-gray-700">{data.project?.code}</p>
            </div>
          ) : (
            <div className="flex flex-row gap-1">
              <p className="text-sm text-gray-700 font-semibold">Project:</p>
              <p className="text-sm text-gray-700">-------</p>
            </div>
          )}
          <div className="flex flex-row gap-1">
            <p className="text-sm text-gray-700 font-medium">Module:</p>
            <p className="text-sm text-gray-700">{data.module}</p>
          </div>
          <div className="flex flex-row gap-1">
            <p className="text-sm text-gray-700 font-medium">Size: </p>
            <p className="text-sm text-gray-700">{data.size}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-gray-700 items-center text-sm">
          <button
            onClick={() => setModalOpen(true)}
            className="h-8 rounded-md border border-cyan-800 bg-blue-50 hover:bg-cyan-800 text-cyan-800 hover:text-white transition-all ease-in-out duration-500 cursor-pointer flex items-center justify-center"
          >
            <UserPen size={22} strokeWidth={1.5} />
          </button>
          <button
            onClick={deleteEquipment}
            className="h-8 rounded-md border border-red-800 bg-red-50 text-red-800 hover:text-white hover:bg-rose-800 transition-all ease-in-out duration-500 cursor-pointer flex items-center justify-center"
          >
            <Trash2 size={22} strokeWidth={1.25} />
          </button>
          <button
            onClick={() => setDetailModalOpen(true)}
            className="h-8 rounded-md border bg-purple-50 text-purple-800 hover:text-white hover:bg-purple-800 transition-all ease-in-out duration-500 px-2 cursor-pointer flex items-center justify-center"
          >
            <Eye size={24} strokeWidth={1.25} />
          </button>
        </div>
      </div>
      <EquipmentModal
        modalOpen={modalOpen}
        toggleModal={() => setModalOpen(!modalOpen)}
        fetchData={fetchData}
        data={data}
      />
      <EquipmentDetail
        modalOpen={detailModalOpen}
        deleteEquipment={deleteEquipment}
        toggleModalUpdate={() => setModalOpen(!modalOpen)}
        toggleModal={() => setDetailModalOpen(!detailModalOpen)}
        data={data}
      />
    </>
  );
};

export default EquipmentCard;
