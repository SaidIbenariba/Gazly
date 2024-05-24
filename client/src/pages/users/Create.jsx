import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Form from "../../components/form";
import Button from "../../components/Button";
const Create = () => {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    password: "",
  });
  const [err, setErr] = useState({ exist: false, msg: "" });
  const nav = useNavigate();
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
  function handleSubmit(values) {
    axios
      .post("http://localhost:5000/api/users/create", values)
      .then((res) => {
        nav("/admin/users");
      })
      .catch((error) => {
        setErr({ exist: true, msg: error.response.data }), console.log(error);
      });
  }
  return (
    <>
      <div className=" flex flex-col h-[100vh] p-2 items-center">
        <div className="flex flex-col ">
          <span className="err">{err.exist && err.msg}</span>

          <nav className="flex justify-between">
            <h1 className=" text-3xl font-bold text-text dark:text-text">
              Add User
            </h1>
            <Link to="/users" className="button">
              Home
            </Link>
          </nav>
          <Form fields={formFields} onSubmit={handleSubmit} values={values} />
        </div>
      </div>
    </>
  );
};

export default Create;
