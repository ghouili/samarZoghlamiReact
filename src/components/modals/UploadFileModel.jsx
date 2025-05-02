import React, { useState } from "react";
import { path } from "../../utils/Variables";
import { Upload } from "lucide-react";
import Swal from "sweetalert2";

const UploadFileModel = ({ modalOpen, toggleModal, fetchData }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const closeModal = () => {
    toggleModal();
    setFile(null);
    setError(null);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Please select a valid Excel file (.xlsx).");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      droppedFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setFile(droppedFile);
      setError(null);
    } else {
      setError("Please drop a valid Excel file (.xlsx).");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("data", file);

    try {
      const response = await fetch(`${path}user/import`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        if (result.success) {
          let message = `${result.message} (${result.data.imported} users imported)`;
          if (result.data.errors && result.data.errors.length > 0) {
            message += "\n\nErrors: \n" + result.data.errors.join("\n");
          }
          Swal.fire({
            title: "Success!",
            text: message,
            icon: "success",
            whiteSpace: "pre-wrap",
          });
          fetchData();
          closeModal();
        } else {
          Swal.fire({
            title: "Error!",
            text: result.message,
            icon: "error",
          });
        }
      } else {
        if (result.errors && result.errors.length > 0) {
          const errorMessages = result.errors.join("\n");
          Swal.fire({
            title: "Error!",
            text: errorMessages,
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: result.message || "Failed to import employees.",
            icon: "error",
          });
        }
      }
    } catch (err) {
      console.error("Upload error:", err);
      Swal.fire({
        title: "Error!",
        text: "Failed to upload file. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <>
      {/* Main modal */}
      {modalOpen && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center"
        >
          <div className="fixed inset-0 bg-gray-900 opacity-30 backdrop-filter backdrop-blur-sm"></div>
          <div className="relative p-4 w-full max-w-xl max-h-full overflow-y-auto overflow-x-hidden">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow">
              {/* Modal header */}
              <div className="flex items-center justify-between p-1 pl-4 border-b border-gray-400 rounded-t">
                <div>
                  <h3 className="text-xl font-semibold text-primary/90">
                    Upload File
                  </h3>
                </div>
                <button
                  onClick={closeModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5 space-y-4 flex flex-col items-center justify-center">
                <label
                  htmlFor="fileInput"
                  className="border-2 mx-auto border-dashed border-gray-300 py-10 px-10 flex flex-col items-center gap-4 text-gray-500"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <span className="text-center">
                    Drag and drop your Excel file here <br /> OR <br /> click to
                    select
                  </span>
                  <input
                    id="fileInput"
                    type="file"
                    accept=".xlsx"
                    onChange={handleFileChange}
                    className="mt-2 mx-auto border w-fit hidden"
                  />
                </label>
                {file && (
                  <p className="text-primary">File selected: {file.name}</p>
                )}
                {error && <p className="text-red-600">{error}</p>}
              </div>
              {/* Modal footer */}
              <div className="w-full border flex items-center justify-end gap-6 p-2 border-t border-gray-200 rounded-b">
                <button
                  onClick={closeModal}
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadFileModel;
