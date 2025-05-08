import axios from "axios";
import React, { useEffect, useState } from "react";
import { path } from "../../utils/Variables";
import Swal from "sweetalert2";
import SelectField from "../inputFields/SelectField";
import { X } from "lucide-react";
import TextAreaField from "../inputFields/TextAreaField";

const InterventionModal = ({ data, modalOpen, fetchData, toggleModal }) => {
  const [formValues, setFormValues] = useState({
    userId: "",
    projectId: "",
    description: "",
    type: "",
    status: "",
  });
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  let statusOptions = [
    { label: "Pending", value: "pending" },
    { label: "In Progress", value: "in-progress" },
    { label: "Completed", value: "completed" },
  ];

  let typeOptions = [
    { label: "Repair", value: "repair" },
    { label: "Inspection", value: "inspection" },
    { label: "Setup", value: "setup" },
    { label: "Test", value: "test" },
    { label: "Other", value: "other" },
  ];
  // Fetch users and projects from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${path}user`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const userOptions = response.data.data.map((user) => ({
          label: `${user.code} - ${user.firstName} ${user.lastName}`,
          value: user._id,
        }));
        setUsers(userOptions);
      } catch (error) {
        console.error("Error fetching users:", error);
        Swal.fire("Error!", "Failed to load users", "error");
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${path}project`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
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

    fetchUsers();
    fetchProjects();
  }, []);

  // Set form values when data changes
  useEffect(() => {
    if (data) {
      setFormValues({
        userId: data.user?._id || "",
        projectId: data.project?._id || "",
        description: data.description || "",
        type: data.type || "",
        status: data.status || "",
      });
    } else {
      setFormValues({
        userId: "",
        projectId: "",
        description: "",
        type: "",
        status: "",
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
        await axios.put(`${path}intervention/${data._id}`, formValues, config);
      } else {
        await axios.post(`${path}intervention`, formValues, config);
      }
      fetchData();
      toggleModal();
      Swal.fire("Success!", "Intervention saved successfully", "success");
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
              {data ? "Edit Intervention" : "Add New Intervention"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="User"
                name="userId"
                value={formValues.userId}
                onChange={handleChange}
                options={users}
                disabled={false}
              />
              <SelectField
                label="Project"
                name="projectId"
                value={formValues.projectId}
                onChange={handleChange}
                options={projects}
                disabled={false}
              />
              <SelectField
                label="Type"
                name="type"
                value={formValues.type}
                onChange={handleChange}
                options={typeOptions}
                disabled={false}
              />
              <SelectField
                label="Status"
                name="status"
                value={formValues.status}
                onChange={handleChange}
                options={statusOptions}
                disabled={false}
              />
              <div className="col-span-2">
                <TextAreaField
                  label="Description"
                  name="description"
                  value={formValues.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  required
                />
              </div>
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
export default InterventionModal;
