import { useEffect, useRef, useState } from "react";
import InputField from "../inputFields/InputField";
import SelectField from "../inputFields/SelectField";
import FileField from "../inputFields/FileField";
import Swal from "sweetalert2";
import axios from "axios";
import { path } from "../../utils/Variables";

const UserModal = ({ modalOpen, toggleModal, fetchData, data }) => {
  const [projects, setProjects] = useState([]);

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    code: "",
    email: "",
    post_hr: "",
    post: "",
    affectation: "",
    dept: "",
    projectId: null,
    role: "",
    active: true,
    picture: "",
  });

  const roles = [
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
  ];
  const depts = [
    { label: "PPE", value: "PPE" },
    { label: "CPE", value: "CPE" },
    { label: "Qualite", value: "Qualite" },
  ];
  const affects = [
    { label: "Administration", value: "Administration" },
    { label: "Indirect", value: "Indirect" },
  ];

  const posts = [
    {
      label: "Superviseur shift test system",
      value: "Superviseur shift test system",
    },
    { label: "Agent Prototype", value: "Agent Prototype" },
    { label: "Ingénieur Product", value: "Ingénieur Product" },
    { label: "Ingénieur Product", value: "Ingénieur Product" },
    { label: "Ingénieur Test", value: "Ingénieur Test" },
    { label: "Ingénieur Qualité", value: "Ingénieur Qualité" },
    { label: "Technicien Test", value: "Technicien Test" },
    { label: "Technicien Qualité", value: "Technicien Qualité" },
    { label: "Technicien Prototype", value: "Technicien Prototype" },
    {
      label: "Technicien process Equipements",
      value: "Technicien process Equipements",
    },
    { label: "Technicien process Test", value: "Technicien process Test" },
    {
      label: "Technicien process Qualité",
      value: "Technicien process Qualité",
    },
    {
      label: "Technicien process Prototype",
      value: "Technicien process Prototype",
    },
    { label: "Technicien process Autres", value: "Technicien process Autres" },
    {
      label: "Superviseur shift test system",
      value: "Superviseur shift test system",
    },
  ];

  useEffect(() => {
    if (data) {
      console.log(data);
      setFormValues(data);
      setFormValues({
        ...formValues,
        projectId: data.projectId?._id || null,
      });
    }
  }, [data]);

  useEffect(() => {
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

    fetchProjects();
  }, []);

  //image related
  const [File, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!File) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(File);
  }, [File]);

  // handelie uploading image:::
  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      // eslint-disable-next-line no-unused-vars
      fileIsValid = false;
    }
    /* props.onInput(props.id, pickedFile, fileIsValid); */
  };

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const closeModal = () => {
    setFormValues({
      firstName: "",
      lastName: "",
      code: "",
      email: "",
      post_hr: "",
      post: "",
      affectation: "",
      dept: "",
      projectId: null,
      role: "",
      active: true,
      picture: "",
    });

    setFile(null);
    setPreviewUrl(null);
    setIsValid(false);
    toggleModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission

    console.log(formValues);
    const formData = new FormData();
    if (File) {
      // formData.append("image", previewUrl);
      formData.append("picture", File);
    }

    formData.append("firstName", formValues.firstName);
    formData.append("lastName", formValues.lastName);
    formData.append("code", formValues.code);
    formData.append("email", formValues.email);
    formData.append("post_hr", formValues.post_hr);
    formData.append("post", formValues.post);
    formData.append("affectation", formValues.affectation);
    formData.append("dept", formValues.dept);
    if (formValues.projectId) {
      formData.append("projectId", formValues.projectId);
    }
    formData.append("role", formValues.role);
    // console.log(formValues);

    try {
      let url, result;
      if (data) {
        url = `${path}user/${formValues._id}`;
        result = await axios.put(url, formData);
      } else {
        url = `${path}user/`;
        result = await axios.post(url, formData);
      }
      console.log(result);
      if (result.data?.success === true) {
        fetchData();
        closeModal();
        Swal("Success!", result.data.message, "success");
      } else {
        return Swal("Error!", result.data.message, "error");
      }
    } catch (error) {
      console.error(error);
      return Swal(
        "Error!",
        "Something went wrong. Please try again later.",
        "error"
      );
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
          <div className="fixed inset-0 bg-gray-900 opacity-30 backdrop-filter backdrop-blur-sm "></div>
          {/* <div className="fixed inset-0 bg-black opacity-50"></div> */}
          <div className="relative p-4 w-full max-w-5xl max-h-full overflow-y-auto overflow-x-hidden">
            {/* Modal content */}
            <div className="relative bg-white  rounded-lg shadow ">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                <h3 className="text-xl font-bold text-gray-900 ">
                  {data
                    ? `Modifier ${data?.firstName} ${data?.lastName}`
                    : "Ajouter Utilisateur"}
                </h3>
                <button
                  onClick={closeModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  "
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
              <div className="p-4 md:p-5 space-y-4">
                <div className="py-4">
                  <FileField
                    previewUrl={previewUrl}
                    filePickerRef={filePickerRef}
                    pickedHandler={pickedHandler}
                    formValues={formValues}
                  />
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                  {/* Email ::  */}
                  <InputField
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="Email..."
                    value={formValues.email}
                    onChange={handleInputChange}
                  />
                  {/* Nom ::  */}
                  <InputField
                    type="text"
                    label="Nom"
                    name="firstName"
                    placeholder="nom..."
                    value={formValues.firstName}
                    onChange={handleInputChange}
                  />

                  {/* firstName :: */}
                  <InputField
                    type="text"
                    label="Prenom"
                    name="lastName"
                    placeholder="Prenom..."
                    value={formValues.lastName}
                    onChange={handleInputChange}
                  />

                  {/* Code :: */}
                  <InputField
                    type="text"
                    label="Code"
                    name="code"
                    placeholder="Code..."
                    value={formValues.code}
                    onChange={handleInputChange}
                  />

                  {/* Role :: */}
                  <SelectField
                    label="Role"
                    name="role"
                    value={formValues.role}
                    onChange={handleInputChange}
                    options={roles}
                    disabled={false}
                  />

                  {/* Post :: */}
                  <SelectField
                    label="Post"
                    name="post"
                    value={formValues.post}
                    onChange={handleInputChange}
                    options={posts}
                    disabled={false}
                  />

                  {/* Post_hr :: */}
                  <InputField
                    type="text"
                    label="Post HR Sheet"
                    name="post_hr"
                    placeholder="Poste HR Sheet..."
                    value={formValues.post_hr}
                    onChange={handleInputChange}
                  />

                  {/* Affectation :: */}
                  <SelectField
                    label="Affectation"
                    name="affectation"
                    value={formValues.affectation}
                    onChange={handleInputChange}
                    options={affects}
                    disabled={false}
                  />

                  {/* Departement :: */}

                  <SelectField
                    label="Departement"
                    name="dept"
                    value={formValues.dept}
                    onChange={handleInputChange}
                    options={depts}
                    disabled={false}
                  />

                  {/* Project :: */}
                  {/* <InputField
                    type="text"
                    label="Project"
                    name="project"
                    placeholder="Project..."
                    value={formValues.project}
                    onChange={handleInputChange}
                  /> */}
                  <SelectField
                    label="Project"
                    name="projectId"
                    value={formValues.projectId}
                    onChange={handleInputChange}
                    options={projects}
                    disabled={false}
                  />
                </div>
              </div>
              {/* Modal footer */}
              <div className="w-full border flex items-center justify-end gap-6 p-4 md:p-5 border-t border-gray-200 rounded-b ">
                <button
                  onClick={closeModal}
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                >
                  Annuler
                </button>
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center "
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

export default UserModal;
