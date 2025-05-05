import React, { useEffect, useState } from "react";
import {
  Filter,
  InterventionCard,
  InterventionDetailsModal,
  InterventionModal,
  UploadFileModel,
} from "../../components";
import { path } from "../../utils/Variables";
import axios from "axios";
import Swal from "sweetalert2";

const Intervention = () => {
  const [interventions, setInterventions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDetailOpen, setModalDetailOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedIntervention, setSelectedIntervention] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 10; // Define limit for pagination

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${path}intervention?page=${currentPage}&limit=${limit}&search=${searchTerm}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data.data);

      setInterventions(response.data.data);
      setTotalPages(response.data.pages);
      setCurrentPage(Number(response.data.currentPage));
    } catch (error) {
      console.error("Error fetching interventions:", error);
      Swal.fire("Error!", "Failed to fetch interventions", "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, searchTerm]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    setSelectedIntervention(null);
  };

  const toggleModalD = () => {
    setModalDetailOpen(!modalDetailOpen);
    if (modalDetailOpen) setSelectedIntervention(null);
  };

  const handleDelete = async (id) => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmation.isConfirmed) {
      try {
        await axios.delete(`${path}interventions/one/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        fetchData();
        Swal.fire("Deleted!", "Intervention has been deleted.", "success");
      } catch (error) {
        Swal.fire(
          "Error!",
          error.response?.data?.message || error.message,
          "error"
        );
      }
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to page 1 on new search
  };

  return (
    <div className="flex flex-col gap-4 pb-9 mb-96">
      <Filter
        toggleModal={toggleModal}
        toggleUploadFileModal={() => setUploadModalOpen(!uploadModalOpen)}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {interventions.map((intervention) => (
          <InterventionCard
            key={intervention._id}
            data={intervention}
            fetchData={fetchData}
          />
        ))}
      </div>
      <InterventionModal
        modalOpen={modalOpen}
        toggleModal={toggleModal}
        fetchData={fetchData}
        data={selectedIntervention}
      />
      <InterventionDetailsModal
        data={selectedIntervention}
        modalOpen={modalDetailOpen}
        toggleModalD={toggleModalD}
        toggleModal={toggleModal}
        deleteIntervention={() => handleDelete(selectedIntervention?._id)}
      />
      <UploadFileModel
        modalOpen={uploadModalOpen}
        toggleModal={() => setUploadModalOpen(!uploadModalOpen)}
        fetchData={fetchData}
      />
    </div>
  );
};

export default Intervention;
