import React, { useEffect, useState } from "react";
import InputField from "../inputFields/InputField";
import Swal from "sweetalert2";
import axios from "axios";
import { path } from "../../utils/Variables";
import { X } from "lucide-react";
import SelectField from "../inputFields/SelectField";

const EquipmentModal = ({ modalOpen, toggleModal, fetchData, data }) => {
  const [formValues, setFormValues] = useState({
    project: "",
    number: "",
    tableNumber: "",
    assetNumber: "",
    module: "",
    size: "",
    versionWin: "",
    versionCswin: "",
    versionDongle: "",
    nomPc: "",
  });
  const [projects, setProjects] = useState([]);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${path}project`);
        const projectOptions = response.data.data.map((project) => ({
          label: project.code,
          value: project._id,
        }));
        setProjects(projectOptions);
      } catch (error) {
        console.error("Error fetching projects:", error);
        Swal.fire("Error!", "Failed to load projects", "error");
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (data) {
      setFormValues({
        project: data.project || "",
        number: data.number || "",
        tableNumber: data.tableNumber || "",
        assetNumber: data.assetNumber || "",
        module: data.module || "",
        size: data.size || "",
        versionWin: data.versionWin || "",
        versionCswin: data.versionCswin || "",
        versionDongle: data.versionDongle || "",
        nomPc: data.nomPc || "",
      });
    } else {
      setFormValues({
        project: "",
        number: "",
        tableNumber: "",
        assetNumber: "",
        module: "",
        size: "",
        versionWin: "",
        versionCsw: "",
        versionDongle: "",
        nomPc: "",
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
        await axios.put(`${path}equipment/${data._id}`, formValues, config);
      } else {
        await axios.post(`${path}equipment/add`, formValues, config);
      }
      fetchData();
      toggleModal();
      Swal.fire("Success!", "Equipment saved successfully", "success");
    } catch (error) {
      Swal.fire(
        "Error!",
        error.response?.data?.message || error.message,
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
              {data ? "Edit Equipment" : "Add New Equipment"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="Project"
                name="project"
                value={formValues.project}
                onChange={handleChange}
                options={projects}
              />
              <InputField
                label="Number"
                type="number"
                name="number"
                value={formValues.number}
                onChange={handleChange}
                placeholder="Enter number"
              />
              <InputField
                label="Table Number"
                type="text"
                name="tableNumber"
                value={formValues.tableNumber}
                onChange={handleChange}
                placeholder="Enter table number"
              />
              <InputField
                label="Asset Number"
                type="text"
                name="assetNumber"
                value={formValues.assetNumber}
                onChange={handleChange}
                placeholder="Enter asset number"
              />
              <InputField
                label="Module"
                type="text"
                name="module"
                value={formValues.module}
                onChange={handleChange}
                placeholder="Enter module"
              />
              <InputField
                label="Size"
                type="text"
                name="size"
                value={formValues.size}
                onChange={handleChange}
                placeholder="Enter size"
              />
              <InputField
                label="Version WIN"
                type="text"
                name="versionWin"
                value={formValues.versionWin}
                onChange={handleChange}
                placeholder="Enter Version WIN"
              />
              <InputField
                label="Version CSWIN"
                type="text"
                name="versionCswin"
                value={formValues.versionCswin}
                onChange={handleChange}
                placeholder="Enter Version CSWIN"
              />
              <InputField
                label="Version Dongle"
                type="text"
                name="versionDongle"
                value={formValues.versionDongle}
                onChange={handleChange}
                placeholder="Enter Version Dongle"
              />
              <InputField
                label="Nom PC"
                type="text"
                name="nomPc"
                value={formValues.nomPc}
                onChange={handleChange}
                placeholder="Enter Nom PC"
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

export default EquipmentModal;
