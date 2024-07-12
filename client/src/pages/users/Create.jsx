import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Form from "../../components/form";
import Button from "../../components/Button";
import Modal from 'react-modal';
import { toast, ToastContainer } from "react-toastify";
const Create = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    password: "",
  });

  const [affectation, setAffectation] = useState({
    start: "",
    end: "",
    id_ws: "",
    id_resp: "",
  });

  const [workspaces, setWorkspaces] = useState([]);
  const [err, setErr] = useState({ exist: false, msg: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/workspaces/noresponsable")
      .then((response) => setWorkspaces(response.data))
      .catch((error) => console.log(error));
  }, []);

  const formFields = [
    {
      name: "firstname",
      label: "FirstName",
    },
    {
      name: "lastname",
      label: "LastName",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
    },
    {
      name: "role",
      label: "Role",
      inputType: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Responsable", value: "responsable" },
        { label: "Ouvrier", value: "ouvrier" },
      ],
    },
  ];

  const affectationFields = [
    {
      name: "start",
      label: "Start Date",
      type: "datetime-local",
    },
    {
      name: "end",
      label: "End Date",
      type: "datetime-local",
    },
    {
      name: "id_ws",
      label: "Workspace",
      inputType: "select",
      options: workspaces.map((ws) => ({ label: ws.name, value: ws.id })),
    },
  ];

  function handleSubmit(formData) {
    // console.log(formData); 
    axios
      .post("http://localhost:5000/api/users/create", formData)
      .then((res) => {
        // console.log(res.data.id);
        // check if userCreate is reponsable for demand a affectation to a mission
        console.log(res);
        if (formData.role === "responsable") {
          setUser({...user, id:res.data.id}) 
          setIsModalOpen(true);
        } else {
          nav("/private/users");
        }
      })
      .catch((error) => {
        toast.error(error.response.data)
        console.log(error);
      });
  }

  function handleAffectationSubmit() {
    // e.preventDefault();
    
    const affectationData = { ...affectation, id_resp: user.id };
    console.log(`affectationData : `);
    console.log(affectationData) 
    axios
      .post("http://localhost:5000/api/affectations/create", affectationData)
      .then((res) => {
        console.log(res);
        toast.success("Responsable was affected to a workspace"); 
        setIsModalOpen(false);
        nav("/private/users");
      })
      .catch((error) => { 
        setErr({ exist: true, msg: error.response.data });
        console.log(error);
      });
  }

  const handleFormChange = (value, fieldName) => {
    setUser({ ...user, [fieldName]: value });
  };

  const handleAffectationFormChange = (value, fieldName) => {
    setAffectation({ ...affectation, [fieldName]: value });
  };

  return (
    <>
      <div className="flex flex-col h-[100vh] p-2 items-center">
        <div className="flex flex-col">
          <span className="err">{err.exist && err.msg}</span>
          <ToastContainer/>
          <nav className="flex justify-between">
            <h1 className="text-3xl font-bold text-text dark:text-text">
              Add User
            </h1>
            <Link to="/private/users" className="button">
              Home
            </Link>
          </nav>
          <Form
            fields={formFields}
            onSubmit={handleSubmit}
            initialValues={user}
            isEditMode={false}
            handleChange={handleFormChange}
          />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '600px',
          },
        }}
      >
        <h2 className="text-2xl mb-4">Affect Responsable to Workspace</h2>
        <Form
          fields={affectationFields}
          onSubmit={handleAffectationSubmit}
          initialValues={affectation}
          handleChange={handleAffectationFormChange}
        />
        <Button onClick={() => setIsModalOpen(false)} className="button mt-4">
          Close
        </Button>
      </Modal>
    </>
  );
};

export default Create;
