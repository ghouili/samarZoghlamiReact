import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { X } from "lucide-react";

import { path } from "../../utils/Variables";
import InputField from "../inputFields/InputField";

const ProjectModal = ({ modalOpen, toggleModal, fetchData, data }) => {
  const [formValues, setFormValues] = useState({
    code: "",
    cmn: "",
    refTSK: "",
    qte: "",
    pin: "",
    sap1: "",
    sap2: "",
    refS: "",
  });

  // Update form values when data prop changes
  useEffect(() => {
    if (data) {
      setFormValues({
        code: data.code || "",
        cmn: data.cmn || "",
        refTSK: data.refTSK || "",
        qte: data.qte || "",
        pin: data.pin || "",
        sap1: data.sap1 || "",
        sap2: data.sap2 || "",
        refS: data.refS || "",
      });
    } else {
      setFormValues({
        code: "",
        cmn: "",
        refTSK: "",
        qte: "",
        pin: "",
        sap1: "",
        sap2: "",
        refS: "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      if (data) {
        await axios.put(`${path}project/${data._id}`, formValues, config);
      } else {
        await axios.post(`${path}project/add`, formValues, config);
      }
      fetchData();
      toggleModal();
      Swal.fire("Success!", "Project saved successfully", "success");
    } catch (error) {
      Swal.fire(
        "Error!",
        error.response?.data?.error || error.message,
        "error"
      );
    }
  };

  return (
    <>
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div className="fixed inset-0 bg-gray-900 opacity-30 backdrop-filter backdrop-blur-sm z-0" />
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-3xl z-20">
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <X size={25} strokeWidth={1.75} />
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {data ? "Edit Project" : "Add New Project"}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {/* <SelectField
                label="Code"
                type="text"
                name="code"
                value={formValues.code}
                onChange={handleChange}
                placeholder="Enter project code"
              /> */}
              <InputField
                label="Code"
                type="text"
                name="code"
                value={formValues.code}
                onChange={handleChange}
                placeholder="Enter project code"
              />
              <InputField
                label="CMN"
                type="text"
                name="cmn"
                value={formValues.cmn}
                onChange={handleChange}
                placeholder="Enter CMN"
              />
              <InputField
                label="Ref TSK"
                type="text"
                name="refTSK"
                value={formValues.refTSK}
                onChange={handleChange}
                placeholder="Enter Ref TSK"
              />
              <InputField
                label="Quantity"
                type="number"
                name="qte"
                value={formValues.qte}
                onChange={handleChange}
                placeholder="Enter quantity"
              />
              <InputField
                label="Pin"
                type="text"
                name="pin"
                value={formValues.pin}
                onChange={handleChange}
                placeholder="Enter pin"
              />
              <InputField
                label="SAP1"
                type="text"
                name="sap1"
                value={formValues.sap1}
                onChange={handleChange}
                placeholder="Enter SAP1"
              />
              <InputField
                label="SAP2"
                type="text"
                name="sap2"
                value={formValues.sap2}
                onChange={handleChange}
                placeholder="Enter SAP2"
              />
              <InputField
                label="Ref S"
                type="text"
                name="refS"
                value={formValues.refS}
                onChange={handleChange}
                placeholder="Enter Ref S"
              />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={toggleModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectModal;
