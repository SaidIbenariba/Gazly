import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Form from "../../components/form";
import {
  Card,
  Input,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";

const Edit = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
  });
  const [err, setErr] = useState({ exist: false, msg: "" });
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    setLoading(true); 
    axios
      .get("http://localhost:5000/api/users/read/" + id)
      .then((res) => {
        console.log(res.data); 
        setUser({ ...user, 
          firstname: res.data[0].firstname,
          lastname: res.data[0].lastname,
          email: res.data[0].email,
          role: res.data[0].role,
        });
      })
      .catch((error) => setErr({ exist: true, msg: error.response.data }))
      .finally(() => setLoading(false));
  }, [id]);

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

  const nav = useNavigate();

  function handleSubmit(user) {
    axios
      .put("http://localhost:5000/api/users/edit/" + id, user)
      .then((res) => {
        nav("/private/users", {
          state: { message: "User updated successfully!", type: "success" },
        });
      })
      .catch((err) => {
        nav("/private/users", {
          state: { message: "Failed to update user.", type: "error" },
        });
      });
  }
  
  const handleFormChange = (value, fieldName) => {
    setUser({ ...user, [fieldName]: value });
  };


  return (
    <>
    {loading ? 
     (<p>is loading</p>) : (
      <div className="flex flex-col h-[100vh] p-2 items-center">
        <div className="flex flex-col ">
          <span className="err">{err.exist && err.msg}</span>
          <nav className="flex justify-between">
            <h1 className="text-3xl font-bold text-text dark:text-text">
              Edit User
            </h1>
            <Link to="/private/users" className="button">
              Home
            </Link>
          </nav>
          <Form fields={formFields} onSubmit={handleSubmit} initialValues={user} isEditMode={true} handleChange={handleFormChange} />
        </div>
      </div>
     )
  }
    </>
  );
};

export default Edit;
