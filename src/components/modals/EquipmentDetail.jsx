import { Trash2, UserPen, X } from "lucide-react";
import React from "react";
import { Tooltip } from "react-tooltip";

const EquipmentDetail = ({
  data,
  toggleModalUpdate,
  modalOpen,
  toggleModal,
  deleteEquipment,
}) => {
  const {
    project,
    number,
    tableNumber,
    assetNumber,
    module,
    size,
    versionWin,
    versionCswin,
    versionDongle,
    nomPc,
  } = data;

  const updateEquipment = () => {
    toggleModalUpdate();
    toggleModal();
  };

  // const deleteEquipment = async () => {
  //   const confirmation = await Swal.fire({
  //     title: "Are you sure?",
  //     text: `Delete equipment ${assetNumber}?`,
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#d33",
  //     cancelButtonColor: "#3085d6",
  //     confirmButtonText: "Yes, delete it!",
  //   });

  //   if (confirmation.isConfirmed) {
  //     try {
  //       await axios.delete(`${path}equipments/one/${data._id}`, {
  //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //       });
  //       fetchData();
  //       toggleModal();
  //       Swal.fire("Deleted!", "Equipment removed successfully", "success");
  //     } catch (error) {
  //       Swal.fire(
  //         "Error!",
  //         error.response?.data?.message || error.message,
  //         "error"
  //       );
  //     }
  //   }
  // };

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
                    {assetNumber}
                  </h2>
                  <span className="font-semibold text-gray-600 text-sm">
                    Equipment
                  </span>
                </div>
                <div className="w-3/4 text-base">
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="text-gray-800">Project:</h2>
                    {project?
                    <span className="text-gray-500">{project.code}</span>
                    :
                    <span className="text-gray-500">------</span>
                    }
                  </div>
                  <div className="w-11/12 border-b border-gray-300 self-center mx-auto my-1" />
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="text-gray-800">Number:</h2>
                    <span className="text-gray-500">{number}</span>
                  </div>
                  <div className="w-11/12 border-b border-gray-300 self-center mx-auto my-1" />
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="text-gray-800">Table Number:</h2>
                    <span className="text-gray-500">{tableNumber}</span>
                  </div>
                  <div className="w-11/12 border-b border-gray-300 self-center mx-auto my-1" />
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="text-gray-800">Module:</h2>
                    <span className="text-gray-500">{module}</span>
                  </div>
                  <div className="w-11/12 border-b border-gray-300 self-center mx-auto my-1" />
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="text-gray-800">Size:</h2>
                    <span className="text-gray-500">{size}</span>
                  </div>
                  <div className="w-11/12 border-b border-gray-300 self-center mx-auto my-1" />
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="text-gray-800">Version WIN:</h2>
                    <span className="text-gray-500">{versionWin}</span>
                  </div>
                  <div className="w-11/12 border-b border-gray-300 self-center mx-auto my-1" />
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="text-gray-800">Version CSWIN:</h2>
                    <span className="text-gray-500">{versionCswin}</span>
                  </div>
                  <div className="w-11/12 border-b border-gray-300 self-center mx-auto my-1" />
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="text-gray-800">Version Dongle:</h2>
                    <span className="text-gray-500">{versionDongle}</span>
                  </div>
                  <div className="w-11/12 border-b border-gray-300 self-center mx-auto my-1" />
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="text-gray-800">Nom PC:</h2>
                    <span className="text-gray-500">{nomPc}</span>
                  </div>
                </div>
                <div className="w-2/3 grid grid-cols-2 gap-4 text-gray-700 items-center text-sm">
                  <button
                    onClick={updateEquipment}
                    data-tooltip-id="EditEquipment"
                    data-tooltip-content="Edit Equipment"
                    data-tooltip-delay-hide={300}
                    className="h-8 rounded-md border border-cyan-800 bg-blue-50 hover:bg-cyan-800 text-cyan-800 hover:text-white transition-all ease-in-out duration-500 cursor-pointer flex items-center justify-center"
                  >
                    <UserPen size={22} strokeWidth={1.5} />
                    <Tooltip id="EditEquipment" />
                  </button>
                  <button
                    onClick={() => {
                      deleteEquipment();
                      toggleModal();
                    }}
                    data-tooltip-id="deleteEquipment"
                    data-tooltip-content="Delete Equipment"
                    data-tooltip-delay-hide={300}
                    className="h-8 rounded-md border border-red-800 bg-red-50 text-red-800 hover:text-white hover:bg-rose-800 transition-all ease-in-out duration-500 cursor-pointer flex items-center justify-center"
                  >
                    <Trash2 size={22} strokeWidth={1.25} />
                    <Tooltip id="deleteEquipment" />
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
export default EquipmentDetail;
