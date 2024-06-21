import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Form from '../../components/form';
import { useAuth } from '../../hooks/useAuth';
const CreateMissionForm = () => {
  // const {user} = useAuth() 
  const {user} = useAuth(); 
  const [error, setError] = useState({ exist: false, msg: "" });
  const [responsables, setResponsables] = useState([]);
  const [selectResponsable,setSelectResponsable] = useState(null);
  const [mission, setMission] = useState({
    start: "",
    end: "",
    title: "",
    description: "",
    status: "",
    id_dir: "",
    id_resp: ""
  });
 
  useEffect(() => {
    function fetchResponsable() {
      axios
        .get("http://localhost:5000/api/users/search-role/" + "responsable")
        .then((res) => {
          setResponsables(res.data); 
          console.log(res.data); 
        })
        .catch((err) => console.log(err));
    }
    fetchResponsable();
  }, []);
  const missionFields = [
    { label: "Start Date", name: "start", type: "date", required:true },
    { label: "End Date", name: "end", type: "date",required:true },
    { label: "Title", name: "title" },
    { label: "Description", name: "description" },
    {
      label: "Status", name: "status", inputType: "select",
      options: [
        { label: "InProgress", value: "inProgress" },
        { label: "InReview", value: "inReview" },
        { label: "InHold", value: "inHold" },
        { label: "Completed", value: "completed" },
      ],
    },
    {
      label: "Responsable", name: "id_resp", inputType: "select",
      options: responsables.map(responsable => ({ label: responsable.firstname+ " " + responsable.lastname, value: responsable.id })), 
      required:true
    }
  ];
  // console.log(responsables.map(responsable => ({ label: responsable.name, value: responsable.id }))); 

  const handleCreateMission = (formData) => {
    console.log(formData); 
    axios
      .post("http://localhost:5000/api/missions/createMission", formData)
      .then((res) => {
        console.log("Mission created successfully:", res.data);
        // Reset form values
        setMission({
          start: "",
          end: "",
          title: "",
          description: "",
          status: "inProgress",
          id_dir: "",
          id_resp: ""
        });
      })
      .catch((err) => console.log("Error creating mission:", err));
  };

  return (
    <div className="flex flex-col h-[100vh] p-2 items-center">
      <div className="flex flex-col">
        <span className="err">{error.exist && error.msg}</span>
        <nav className="flex justify-between">
          <h1 className="text-3xl font-bold text-text dark:text-text">
            Add Mission
          </h1>
          <Link to="/private/users" className="button">
            Home
          </Link>
        </nav>
        <Form fields={missionFields} initialValues={mission} onSubmit={handleCreateMission} />
      </div>
    </div>
  );
}

export default CreateMissionForm;
