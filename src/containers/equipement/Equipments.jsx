import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { path } from "../../utils/Variables";
import {
  EquipmentCard,
  EquipmentModal,
  Filter,
  NoData,
  UploadFileModel,
} from "../../components";

const Equipments = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 10; // Define limit for pagination

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${path}equipment?page=${currentPage}&limit=${limit}&search=${searchTerm}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setData(res.data.data);
      setTotalPages(res.data.pages);
      setCurrentPage(Number(res.data.currentPage));
    } catch (error) {
      console.error("Error fetching equipments:", error);
      Swal.fire("Error!", "Failed to fetch equipments", "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to page 1 on new search
  };

  return (
    <>
      <div className="flex flex-col gap-4 pb-9 mb-96">
        <Filter
          toggleModal={() => setModalOpen(!modalOpen)}
          toggleUploadFileModal={() => setUploadModalOpen(!uploadModalOpen)}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onSearch={handleSearch}
        />
        {data.length != 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.map((item, idx) => (
              <EquipmentCard key={idx} data={item} fetchData={fetchData} />
            ))}
          </div>
        ) : (
          <NoData />
        )}
      </div>
      <EquipmentModal
        modalOpen={modalOpen}
        toggleModal={() => setModalOpen(!modalOpen)}
        fetchData={fetchData}
        data={null}
      />
      <UploadFileModel
        modalOpen={uploadModalOpen}
        toggleModal={() => setUploadModalOpen(!uploadModalOpen)}
        fetchData={fetchData}
      />
    </>
  );
};

export default Equipments;
