import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'; 
import Form from "../../components/form";
import { Button } from '@material-tailwind/react';
import axios from 'axios';
const EditEspaceForm = () => {
    const { id_ws } = useParams();
    const [espace, setEspace] = useState({
         id:"",
         start:"", 
         end:"", 
         id_resp:"",
         name:"", 
    });
    const [responsables, setResponsables] = useState([]); 
    const [err, setErr] = useState({ exist: false, msg: "" });
    const [loading, setLoading] = useState(false); 
    useEffect(() => {
        if (location.state?.message) {
          if (location.state.type === "success") {
            toast.success(location.state.message);
          } else if (location.state.type === "error") {
            toast.error(location.state.message);
          }
        }
      }, [location]);
    useEffect(()=>{
        console.log(espace, responsables); 
    }, [espace, responsables]); 
    useEffect(() => {
      setLoading(true);
    try { 
        fetchEspace(id_ws);
        fetchResponsable();
    }catch(err) {
        console.log("error when fetch data", err);
    }finally{
setLoading(false);
    }
    }, [id_ws]);
  
    const formFields = [
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
        name: "Name",
        label: "name",
      },
      {
        label: "Responsable", name: "id_resp", inputType: "select",
        options: responsables.map(responsable => ({ label: responsable.firstname+ " " + responsable.lastname, value: responsable.id })), 
        required:true
      }
    ];
  
    const nav = useNavigate();
  
    function handleSubmit(espace) {
        console.log(espace);
      axios
        .put("http://localhost:5000/api/workspaces/edit/" + id_ws, {name:espace.name})
        .then((res) => {
          nav("/private/espaces", {
            state: { message: "User updated successfully!", type: "success" },
          });
        })
        .catch((err) => {
          nav("/private/espaces", {
            state: { message: "Failed to update user.", type: "error" },
          });
        });
        axios.post("")
    }
    
    const handleFormChange = (value, fieldName) => {
      setEspace({ ...espace, [fieldName]: value });
    };
    
   async function fetchResponsable() {
       const res = await  axios.get("http://localhost:5000/api/users/search-role/responsable"); 
        setResponsables(res.data); 
            console.log(res.data); 
      }
      async function fetchEspace(id) {
        const res = await axios
        .get("http://localhost:5000/api/workspaces/" + id); 
        console.log("response from espaces api ", res);
        setEspace({
            ...espace,
            id:espace.id,
            start:espace.start ? espace.start : "", 
            end:espace.end ? espace.end : "", 
            id_resp:espace.id_resp,
            name:espace.id_resp, 
        }); 
      }
    return (
      <>
      {loading ? 
       (<p>is loading</p>) : (
        <div className="flex flex-col h-[100vh] p-2 items-center">
          <div className="flex flex-col items-center">
            <span className="err">{err.exist && err.msg}</span>
            <nav className="flex justify-between">
              <h1 className="text-3xl font-bold text-text dark:text-text text-wrap mr-10">
                {espace.id_resp ? "Edit workspace"  : "Add responsable for this workspace"} 
              </h1>
              <Link to="/private/espaces" className="button">
                Home
              </Link>
            </nav>
            <Form fields={formFields} onSubmit={handleSubmit} initialValues={espace} isEditMode={true} handleChange={handleFormChange} />
            <Button  className="button w-full mt-10" text={`save`}>
            Stop Responsable
          </Button>
          </div>
        </div>
       )
    }
      </>
    );
}

export default EditEspaceForm