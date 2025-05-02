import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Filter, UploadFileModel, UserCard, UserModal } from "../../components";
import axios from "axios";
import { path } from "../../utils/Variables";



const Users = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [UploadFilemodalOpen, setUploadFileModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const toggleUploadFileModal = () => {
    setUploadFileModalOpen(!UploadFilemodalOpen);
  };

  const fetchData = async () => {
    await axios
      .get(`${path}user`)
      .then((res) => setData(res.data.data))
      .catch((error) => console.log(error));
    console.log("fetch users");
  };
  useEffect(() => {
    fetchData();

    return () => {
      fetchData();
    };
  }, []);

  

  return (
    <>
      <div className="flex flex-col gap-4 pb-9 mb-96">
        <Filter
          toggleModal={toggleModal}
          toggleUploadFileModal={toggleUploadFileModal}
          />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.map((item, idx) => (
            <UserCard key={idx} data={item} fetchData={fetchData}  />
          ))}
        </div>
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
