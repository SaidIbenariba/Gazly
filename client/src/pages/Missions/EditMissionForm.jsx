import React from 'react'
import Form from '../../components/form';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const EditMissionForm = () => { 
    const {start, id_dir, id_resp} = useParams(); 
    // const [responsables, setResponsables] = useState([{ id: 1, name: "said" }]);
    const [formValues, setFormValues] = useState({
        start: start,
        end: "",
        title: "",
        description: "",
        status: "",
        id_dir: id_dir,
        id_resp: id_resp
      });
      const missionFields = [
        { label: "Start Date", name: "start", type: "date" },
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
      ];
  useEffect(()=>{ 
    function fetchMissions () { 
        axios.get(`http://localhost:5000/api/missions/${start}/${id_dir}/${id_resp}`)
        .then((res)=>setFormValues({formValues,end:res.data[0].end,title:res.data[0].title,description:res.data[0].description,status:res.data[0].status}))
        .catch((err)=>console.log(err)); 
    }
    fetchMissions(); 
  })

  const handleEditMission = (formData) => {
    axios
      .post(`http://localhost:5000/api/missions/editMission/${start}/${id_dir}/${id_resp}`, formData)
      .then((res) => {
        console.log("Mission created successfully:", res.data);
        // Update missions state with the newly created mission
        setMissions([...missions, res.data]);
        // Reset form values
        setFormValues({});
      })
      .catch((err) => console.log("Error creating mission:", err));
  };
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
      <Form fields={missionFields} values={formValues} onSubmit={handleEditMission}/>
    </div>
  </div>
</>

  )
}

export default EditMissionForm