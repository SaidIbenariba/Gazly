/*
   feedback: req.body.feedback,
    id_WS: req.body.id_WS,
    id_resp: req.body.id_resp,
    status: req.body.status,
 */
// src/observation/EditObservationForm.jsx

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';import Form from '../../components/form';

const EditObservationForm = () => {
  const { date, id_ws, id_resp } = useParams();
  const [error, setError] = useState({ exist: false, msg: "" });
  const [responsables, setResponsables] = useState([]);
  const [observation, setObservation] = useState({
    date: "",
    feedback: "",
    id_ws: "",
    id_resp: "",
    status: "pending",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/observations/${date}/${id_ws}/${id_resp}`)
      .then((res) => setObservation(res.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/api/users/responsables")
      .then((res) => setResponsables(res.data))
      .catch((err) => console.log(err));
  }, [date, id_ws, id_resp]);

  const observationFields = [
    { label: "Date", name: "date", type: "date" },
    { label: "Feedback", name: "feedback" },
    { label: "Workspace ID", name: "id_ws" },
    {
      label: "Responsable", name: "id_resp", inputType: "select",
      options: responsables.map((r) => ({ label: `${r.nom} ${r.prenom}`, value: r.id }))
    },
    { label: "Status", name: "status", inputType: "select", options: ["pending", "completed", "archived"] },
  ];

  const handleUpdateObservation = (data) => {
    axios
      .put(`http://localhost:5000/api/observations/${date}/${id_ws}/${id_resp}`, data)
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
          Edit Mission
        </h1>
        <Link to="/private/observations" className="button">
          Home
        </Link>
      </nav>
    <Form
      formTitle={"Edit Observation"}
      fields={observationFields}
      observation={observation}
      setObservation={setObservation}
      onSubmit={handleUpdateObservation}
      error={error}
    />
    </div> 
    </div>
    </>
  );
};

export default EditObservationForm;
