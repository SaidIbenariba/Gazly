import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  Button,
  CardFooter,
  Select,
  Option,
  Spinner,
} from "@material-tailwind/react";
import { IoIosRefresh } from "react-icons/io";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";
import axios from "axios"; 
import { TrashIcon,PencilIcon } from "@heroicons/react/24/outline";
// Dummy data for initial display
const demoSensors = [
  { id: 1, type: "Temperature", id_WS: 101 },
  { id: 2, type: "Humidity", id_WS: 102 },
  { id: 3, type: "Pressure", id_WS: 103 },
];

const SensorTable = () => {
  const [sensors, setSensors] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedSensor, setEditedSensor] = useState({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState({ exist: false, msg: "" });

  const tableHeads = [ "Type", "WorkSpace", "Actions"];
  useEffect(()=>{
    fetchSensors() ; 
  },[]); 
  const fetchSensors = () => {
    setLoading(true); 
    axios.get("http://localhost:5000/api/sensors")
    .then((res)=>setSensors(res.data))
    .catch((err)=>console.log(err))
    .finally(setLoading(false)); 
  }
  const handleEdit = (sensor) => {
    setEditMode(sensor.id);
    setEditedSensor(sensor);
  };

  const handleDelete = (id) => {
    setSensors(sensors.filter((sensor) => sensor.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSensor({ ...editedSensor, [name]: value });
  };

  const handleSave = () => {
    setSensors(
      sensors.map((sensor) =>
        sensor.id === editedSensor.id ? editedSensor : sensor
      )
    );
    setEditMode(null);
  };

  const handleAddSensor = () => {
    const newSensor = {
      id: sensors.length + 1,
      type: "New Sensor",
      id_WS: 0,
    };
    setSensors([...sensors, newSensor]);
    setEditMode(newSensor.id); // Automatically enter edit mode for the new sensor
    setEditedSensor(newSensor);
  };

  return (
    <> 
    { loading ? (<Spinner/>) : ( 
      <Card className="h-full w-full" shadow={false}>
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Sensors List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all sensors
            </Typography>
          </div>
          <Button
            size="sm"
            text="Add Sensor"
            onClick={handleAddSensor}
            className="button bg-background text-black border border-black hover:bg-gray-50"
          >
            Add SensorPmea
          </Button>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {tableHeads.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="leading-none opacity-70 font-bold"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sensors.map((sensor) => (
              <tr key={sensor.id}>
                {/* <td>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold"
                  >
                    {sensor.id}
                  </Typography>
                </td> */}
                <td>
                  {editMode === sensor.id ? (
                    <Input
                      type="text"
                      name="type"
                      value={editedSensor.type}
                      onChange={handleChange}
                      className="border p-1"
                      style={{
                        width: `${String(editedSensor.type).length + 1}ch`,
                        minWidth: "100px",
                      }}
                    />
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold"
                    >
                      {sensor.type}
                    </Typography>
                  )}
                </td>
                <td>
                  {editMode === sensor.id ? (
                    <Input
                      type="number"
                      name="id_WS"
                      value={editedSensor.id_WS}
                      onChange={handleChange}
                      className="border p-1"
                      style={{
                        width: `${String(editedSensor.id_WS).length + 1}ch`,
                        minWidth: "50px",
                      }}
                    />
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold"
                    >
                      {sensor.id_WS}
                    </Typography>
                  )}
                </td>
                <td>
                  {editMode === sensor.id ? (
                    <Button size="sm" onClick={handleSave}>
                      <FaSave />
                    </Button>
                  ) : (
                    <>
                      <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleEdit(sensor)}
                    className="bg-blue-500 text-white hover:bg-blue-600"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDelete(sensor.id)}
                    className="bg-red-500 text-white hover:bg-red-600"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button
          variant="outlined"
          color="blue-gray"
          size="sm"
          className="flex items-center gap-2"
        >
          <IoIosRefresh className="h-4 w-4" />
          Refill
        </Button>
      </CardFooter>
    </Card>
    )}
    
    </>
  );
};

export default SensorTable;
