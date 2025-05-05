import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { path } from "../../utils/Variables";
import { Eye, Trash2, UserPen } from "lucide-react";
import ProjectModal from "../modals/ProjectModal";
import ProjectDetail from "../modals/ProjectDetail";

const ProjectCard = ({ data, fetchData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const deleteProject = async () => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: `Delete project ${data.code}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmation.isConfirmed) {
      try {
        await axios.delete(`${path}project/one/${data._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        fetchData();
        Swal.fire("Deleted!", "Project removed successfully", "success");
      } catch (error) {
        Swal.fire("Error!", error.message, "error");
      }
    }
  };

  return (
    <>
      <div className="relative w-full flex flex-col gap-4 bg-white p-5 shadow border border-gray-100 rounded-md">
        <div>
          <h3 className="text-lg font-semibold text-primary">{data.code}</h3>
          <div className="flex flex-row gap-1">
            <p className="text-sm text-gray-700 font-semibold">CMN:</p>
            <p className="text-sm text-gray-700">{data.cmn}</p>
          </div>
          <div className="flex flex-row gap-1">
            <p className="text-sm text-gray-700 font-semibold">Ref TSK:</p>
            <p className="text-sm text-gray-700">{data.refTSK}</p>
          </div>
          <div className="flex flex-row gap-1">
            <p className="text-sm text-gray-700 font-semibold">Quantity:</p>
            <p className="text-sm text-gray-700">{data.qte}</p>
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
            onClick={deleteProject}
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
      <ProjectModal
        modalOpen={modalOpen}
        toggleModal={() => setModalOpen(!modalOpen)}
        fetchData={fetchData}
        data={data}
      />

      <ProjectDetail
        modalOpen={detailModalOpen}
        toggleModal={() => setDetailModalOpen(!detailModalOpen)}
        toggleModalUpdate={() => setModalOpen(!modalOpen)}
        deleteProject={deleteProject}
        data={data}
      />
    </>
  );
};

export default ProjectCard;
