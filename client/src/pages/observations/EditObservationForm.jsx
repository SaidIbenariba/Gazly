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
  const [observation, setObservation] = useState({
    date: "",
    feedback: "",
    id_ws: "",
    id_resp: "",
  });



  const observationFields = [
    { label: "Feedback", name: "feedback" },

  ];
  useEffect(()=>{
    axios.get(`http://localhost:5000/api/observations/${date}/${id_ws}/${id_resp}`)
    .then((res)=>setObservation(res.data))
    .catch((err)=>{console.log(err)}); 
  })
  const handleUpdateObservation = (data) => {
    axios
      .post(`http://localhost:5000/api/observations/edit/${date}/${id_ws}/${id_resp}`, data)
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
