import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Filter,
  NoData,
  UploadFileModel,
  UserCard,
  UserModal,
} from "../../components";
import axios from "axios";
import { path } from "../../utils/Variables";

const Users = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [UploadFilemodalOpen, setUploadFileModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 10; // Define limit for pagination
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const toggleUploadFileModal = () => {
    setUploadFileModalOpen(!UploadFilemodalOpen);
  };

  const fetchData = async () => {
    await axios
      .get(
        `${path}user?page=${currentPage}&limit=${limit}&search=${searchTerm}`
      )
      .then((res) => {
        setData(res.data.data);
        setTotalPages(res.data.pages);
        setCurrentPage(Number(res.data.currentPage));
      })
      .catch((error) => console.log(error));
    console.log("fetch users");
  };
  useEffect(() => {
    fetchData();

    return () => {
      fetchData();
    };
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
          toggleModal={toggleModal}
          toggleUploadFileModal={toggleUploadFileModal}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onSearch={handleSearch}
        />
        {data.length != 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.map((item, idx) => (
              <UserCard key={idx} data={item} fetchData={fetchData} />
            ))}
          </div>
        ) : (
          <NoData />
        )}
      </div>
      <UserModal
        modalOpen={modalOpen}
        toggleModal={toggleModal}
        fetchData={fetchData}
        data={null}
      />
      <UploadFileModel
        modalOpen={UploadFilemodalOpen}
        toggleModal={toggleUploadFileModal}
        fetchData={fetchData}
      />
    </>
  );
};

export default Users;
