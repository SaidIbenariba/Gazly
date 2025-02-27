// src/observation/CreateObservationForm.jsx
/*
   feedback: req.body.feedback,
    id_WS: req.body.id_WS,
    id_resp: req.body.id_resp,
    status: req.body.status,
 */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from '../../components/form';
import useVerifyRole from '../../hooks/useVerifyRoles';

const CreateObservationForm = () => 
{
    const isAdmin = useVerifyRole(["admin"]); 
    const isRes = useVerifyRole(["responsable"]); 
  const [error, setError] = useState({ exist: false, msg: "" });
  const [espaces, setEspaces] = useState([]);
  const [observation, setObservation] = useState({ 
    date: "",
    feedback: "",
    id_ws: "",
    status: "pending",
  });
  const nav = useNavigate() ;
  // if(isAdmin) { 
  // useEffect(() => {
  //   axios
  //     .get("/api/users/responsables")
  //     .then((res) => setResponsables(res.data))
  //     .catch((err) => console.log(err));
  // }, []);
    useEffect(()=>{
      axios.get(
        "/api/workspaces"
      ).then((res) => {console.log(res.data) ;setEspaces(res.data)})
      .catch((err)=>console.log(err)); 
    },[])
  
  const observationFields = [
    { label: "Date", name: "date", type: "date" },   
    { label: "Feedback", name: "feedback",  },  
    // { label: "Status", name: "status", inputType: "select", options: [ { label: "Pending", value: "pending" },{label:"Completed", value:"completed"},{label:"Archive", value:"archive"}] },
    {label: "WorkSpaces", name:"id_ws", inputType:"select" , 
      options: espaces.map(
        espace => ({label:espace.name, value:espace.id})  
      )
    }
  ];

  const handleCreateObservation = (data) => {
    // console.log(data) ;
    console.log("handle create observation"); 
    axios
      .post("/api/observations/create", data)
      .then((res) => {
        console.log(res);      
           nav("/private/observations"); } 
    )
      .catch((err) => {
        console.log(err);
        setError({ exist: true, msg: err.message });
      });
  };
  const handleChange = (value, fieldName) =>{ 
    setObservation({ ...observation, [fieldName]: value });
   }
  return (
    <>
    <div className=" flex flex-col h-[100vh] p-2 items-center">
    <div className="flex flex-col ">
      {/* <span className="err">{err.exist && err.msg}</span> */}

      <nav className="flex justify-between">
        <h1 className=" text-3xl font-bold text-text dark:text-text">
          Add Observation
        </h1>
        <Link to="/private/observations" className="button">
          Home
        </Link>
      </nav>
    <Form
     fields={observationFields}
     onSubmit={handleCreateObservation}
     initialValues={observation}
      handleChange={handleChange}
    />
    </div>
    </div>
    </>
  );
};

export default CreateObservationForm;
