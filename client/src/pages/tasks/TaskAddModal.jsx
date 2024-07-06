import React, { useEffect, useState } from "react";
import { Dialog, Button, Input, Select, Option } from "@material-tailwind/react";
// import { AwardIcon } from "lucide-react";
import axios from "axios";

const TaskAddModal = ({ isOpen, onClose, onSave }) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [duree, setDuree] = useState("");
  const [idOuv, setIdOuv] = useState("");
  const [ouvriers, setOuvriers] = useState([]); 
  
  useEffect(()=>{
    console.log(date);
    fetchOuvriers(); 
  },[]); 
  const handleSubmit = () => {
    const newTask = {
      description,
      date,
      duree,
      status: "inProgress", // Default status for a new task
      id_ouv: idOuv,
    };
    onSave(newTask);
  };
  const fetchOuvriers = async () =>{ 
    try { 
   const response = await axios.get("http://localhost:5000/api/users/search-role/ouvrier");  
   setOuvriers(response.data); 
    }catch(err) { 
      console.log(err); 
    }
  }
  return (
    <Dialog open={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        <h3 className="text-xl mb-4">Add Task</h3>
        <div className="mb-4">
          <Input
        
            type="text"
            label="Duree"
            value={duree}
            onChange={(e) => setDuree(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Input
            type="text"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Input
            type="datetime-local"
            label="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Select 
          //  labelProps={{
          //   className: "before:content-none after:content-none",
          // }}
          value="Choose a ouvrier"
            className="input"
          onChange={(id)=>setIdOuv(id)}
          > 
          {
            ouvriers.map((ouvrier, index) =>(
                <Option key={index} value={String(ouvrier.id)}>{ouvrier.firstname + " " + ouvrier.lastname}</Option>
            ))
          }
          </Select>
        </div>
        {/* <div className="mb-4">
          <Input
            type="number"
            label="ID Responsable"
            value={idResp}
            onChange={(e) => setIdResp(e.target.value)}
          />
        </div> */}
        <div className="flex justify-end mt-4">
          <Button className="mr-2" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Add
          </Button>
        </div>
      
      </div>
    </Dialog>
  );
};  

export default TaskAddModal;

