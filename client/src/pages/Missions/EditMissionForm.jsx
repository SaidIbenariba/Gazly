  import { useNavigate, useParams } from 'react-router-dom';
  import React, { useState, useEffect } from 'react';
  import { Link } from 'react-router-dom';
  import axios from 'axios';
  import Form from '../../components/form';
import { Spinner } from '@material-tailwind/react';
  const EditMissionForm = () => { 
    const {start, id_dir, id_resp} = useParams(); 
    const [err,setErr] = useState({exist:false, msg:""}); 
    const [loading, setLoading] = useState(false); 
      const [responsables, setResponsables] = useState([]); 
      // const [responsables, setResponsables] = useState([{ id: 1, name: "said" }]);
      const [mission, setMission] = useState({
          start: start,
          end: "",
          title: "",
          description: "",
          status: "",
          id_dir: id_dir,
          id_resp: id_resp
        });
        const missionFields = [
          // { label: "Start Date", name: "start", type: "date" },
          { label: "End Date", name: "end", type: "date" },
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
          // {
          //   label: "Responsable", name: "id_resp", inputType: "select",
          //   options: responsables.map(responsable => ({ label: responsable.name, value: responsable.id }))
          // }
        ];
        const nav = useNavigate(); 
        
      //   useEffect(()=>{
      //     setLoading(true); 
      //     axios.get(`http://localhost:5000/api/missions/${start}/${id_resp}/${id_dir}`)
      // .then(response => {
      //    console.log(response.data); 
      //   setMission(response.data);
      // })
      // .catch(error => {
      //   console.error('There was an error fetching the observation!', error);
      // }).finally(()=>setLoading(false));
      //   },[start, id_resp, id_dir])
    useEffect(()=>{ 
      function fetchMissions () { 
          axios.get(`http://localhost:5000/api/missions/${start}/${id_dir}/${id_resp}`)
          .then((res)=>{setMission({...mission,end:res.data[0].end,title:res.data[0].title,description:res.data[0].description,status:res.data[0].status})})
          .catch((err)=>console.log(err))
          .finally(()=>setLoading(false)); 
      }
      setLoading(true);
      fetchMissions(); 
      // fetchResponsables(); 
    },[start, id_resp,id_dir])

    const handleEditMission = (formData) => {
      axios
        .put(`http://localhost:5000/api/missions/edit/${start}/${id_dir}/${id_resp}`, formData)
        .then((res) => {
          console.log("Mission updated successfully:", res);
          // Update missions state with the newly created mission
          nav("/private/missions");  
          // setMission([...missions, res.data]);  
          // Reset form values.
          // setMission({});
        })
        .catch((err) => console.log("Error creating mission:", err));
    };
    return (
      <>
      {loading ? <Spinner/>
      :(
        <div className=" flex flex-col h-[100vh] p-2 items-center">
      <div className="flex flex-col ">
        {/* <span className="err">{err.exist && err.msg}</span> */}

        <nav className="flex justify-between">
          <h1 className=" text-3xl font-bold text-text dark:text-text">
            Add Mission
          </h1>
          <Link to="/private/missions " className="button">
            Home
          </Link>
        </nav>
        <Form fields={missionFields} initialValues={mission} onSubmit={handleEditMission} isEditMode={true}/>
      </div>
    </div>
      )
    }
      
  </>

    )
  }

  export default EditMissionForm