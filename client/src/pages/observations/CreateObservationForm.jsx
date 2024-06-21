// src/observation/CreateObservationForm.jsx
/*
   feedback: req.body.feedback,
    id_WS: req.body.id_WS,
    id_resp: req.body.id_resp,
    status: req.body.status,
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Form from '../../components/form';
import useVerifyRole from '../../hooks/useVerifyRoles';

const CreateObservationForm = () => 
{
    const isAdmin = useVerifyRole(["admin"]); 
    const isRes = useVerifyRole(["responsable"]); 
  const [error, setError] = useState({ exist: false, msg: "" });
  const [responsables, setResponsables] = useState([]);
  const [formValues, setFormValues] = useState({
    date: "",
    feedback: "",
    id_ws: "",
    id_resp: "",
    status: "pending",
  });
  if(isAdmin) { 
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/responsables")
      .then((res) => setResponsables(res.data))
      .catch((err) => console.log(err));
  }, []);
}

  const observationFields = [
    { label: "Date", name: "date", type: "datetime-local" },
    { label: "Feedback", name: "feedback" },
    { label: "Workspace ID", name: "id_ws" },
    {
      label: "Responsable", name: "id_resp", inputType: "select",
      options: responsables.map((r) => ({ label: `${r.nom} ${r.prenom}`, value: r.id }))
    },
    { label: "Status", name: "status", inputType: "select", options: ["pending", "completed", "archived"] },
  ];

  const handleCreateObservation = (data) => {
    axios
      .post("http://localhost:5000/api/observations", data)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
        setError({ exist: true, msg: err.message });
      });
  };

  return (
    <>
    <div className=" flex flex-col h-[100vh] p-2 items-center">
    <div className="flex flex-col ">
      {/* <span className="err">{err.exist && err.msg}</span> */}

      <nav className="flex justify-between">
        <h1 className=" text-3xl font-bold text-text dark:text-text">
          Add Mission
        </h1>
        <Link to="/private/observations" className="button">
          Home
        </Link>
      </nav>
    <Form
      formTitle={"Create Observation"}
      fields={observationFields}
      formValues={formValues}
      setFormValues={setFormValues}
      onSubmit={handleCreateObservation}
      error={error}
    />
    </div>
    </div>
    </>
  );
};

export default CreateObservationForm;
