import React, { useEffect, useState } from "react";
import axios from "axios";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FaTrashAlt, FaEdit, FaSave, FaTrash } from 'react-icons/fa';
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  Button,
  CardFooter,
  Tabs,
  TabsHeader,
  Select,
  Option,
  Spinner,
} from "@material-tailwind/react";
import { IoIosRefresh } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TABS = [
  { label: "All", value: "all" },
  { label: "Safe", value: "0" },
  { label: "Danger", value: "1" },
];
const demoMeasures = [
    {
      id: 1,
      gazlvl: 20,
      date: '2024-06-14T08:30:00',
      id_cap: 101,
      gaz_danger: '0'
    },
    {
      id: 2,
      gazlvl: 45,
      date: '2024-06-15T10:00:00',
      id_cap: 102,
      gaz_danger: '1'
    },
    {
      id: 3,
      gazlvl: 30,
      date: '2024-06-16T12:00:00',
      id_cap: 103,
      gaz_danger: '0'
    },
    {
      id: 4,
      gazlvl: 50,
      date: '2024-06-17T14:30:00',
      id_cap: 104,
      gaz_danger: '1'
    }
  ];

const MeasuresTable = () => {
  const [measures, setMeasures] = useState(demoMeasures);
  const [editMode, setEditMode] = useState(null);
  const [editedMeasure, setEditedMeasure] = useState({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState({ exist: false, msg: "" });
  const [sensor, setSensor] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [stat, setStat] =useState();
  const tableHeads = ["Gas Level", "Date", "Sensor ID", "Gas Danger", "Actions"];

  useEffect(() => {
    fetchMeasures();
  }, []);

  const fetchMeasures = (status = "all") => {
    setLoading(true);
    let url = "/api/measures";
    if (status !== "all") {
      url = `${url}/danger/${status}`;
    }
  //   if(status == 1 || status == 0) {
  //     console.log("search danger "); 
  //     url = `$`
  // } 
    axios
      .get(url)
      .then((res) => {
        setMeasures(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setErr({ exist: true, msg: err.response.data.message });
        setLoading(false);
        setMeasures([]);
      });
  };

  const handleEdit = (measure) => {
    setEditMode(measure.id);
    setEditedMeasure(measure);
  };

  const handleDelete = (id) => {
    setMeasures(measures.filter(measure => measure.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMeasure({ ...editedMeasure, [name]: value });
  };

  const handleSave = () => {
    setMeasures(measures.map(measure => measure.id === editedMeasure.id ? editedMeasure : measure));
    setEditMode(null);
  };

  const handleSearchByRole = (value) => {
    // setActiveTab(status);
    setLoading(true);
    // axios
    // .get(`/api/measures/danger/${value}`)
    // .then((res) => {
    //   setMeasures(res.data);
    //   setLoading(false);
    // })
    // .catch((err) => {
    //   setErr({ exist: true, msg: err.response.data.message });
    //   setLoading(false);
    //   setMeasures([]);
    // });
    setStat(value);
    fetchMeasures(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(`/api/measures/sensor/${sensor}`)
      .then((res) => {
        setMeasures(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setErr({ exist: true, msg: err.response.data.message });
        setLoading(false);
        setMeasures([]);
      });
  };

  return (
    <Card className="h-full w-full" shadow={false}>
      <ToastContainer />
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Measures List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all measures
            </Typography>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-1 gap-y-4">
          <Tabs value={activeTab} className="w-full md:w-max">
            <TabsHeader>
                {TABS.map(({ label, value }) => (
                <button
                  className={`p-2 mx-2 bg-gray-100 rounded-md hover:bg-white ${ stat  === value ? 'bg-white' : ''}`}
                  key={value}
                  value={value}
                  onClick={() => handleSearchByRole(value)}
                >
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </button>
              ))}
            </TabsHeader>
          </Tabs>
          <form
            className="flex w-full shrink-0 gap-2 md:w-max"
            onSubmit={handleSubmit}
          >
            <Input
              label="Input sensor id"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={sensor}
              onChange={(e) => setSensor(e.target.value)}
              type="number"
            />
            {/* <Button
              size="sm"
              text="Search"
              variant="outline"
              className="button bg-background text-black border border-black hover:bg-gray-50"
              type="submit"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </Button> */}
          </form>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {tableHeads.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 "
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
            {measures.map((measure) => (
                <tr key={measure.id}>
                  {/* <td>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold"
                    >
                      {measure.id}
                    </Typography>
                  </td> */}
                  <td>
                    {editMode === measure.id ? (
                      <input
                        type="number"
                        name="gazlvl"
                        value={editedMeasure.gazlvl}
                        onChange={handleChange}
                        className="border p-1"
                                                style={{ width: `${String(editedMeasure.gazlvl).length + 1}ch`, minWidth: '80px' }}

                      />
                    ) : (
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold  ml-5"
                      >
                        {measure.gazlvl}
                      </Typography>
                    )}
                  </td>
                  <td>
                    {editMode === measure.id ? (
                      <input
                        type="datetime-local"
                        name="date"
                        value={editedMeasure.date}
                        onChange={handleChange}
                        className="border p-1"
                                                // style={{ width: `${String(editedMeasure.gazlvl).length + 1}ch`, minWidth: '40px' }}

                      />
                    ) : (
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className=" font-normal "
                      >
                        {measure.date}
                      </Typography>
                    )}
                  </td>
                  <td>
                    {editMode === measure.id ? (
                      <input
                        type="number"
                        name="id_cap"
                        value={editedMeasure.id_cap}
                        onChange={handleChange}
                        className="border p-1"
                        style={{ width: `${String(editedMeasure.gazlvl).length + 1}ch`, minWidth: '100px' }}

                      />
                    ) : (
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {measure.id_cap}
                      </Typography>
                    )}
                  </td>
                  <td>
                    {editMode === measure.id ? (
                      <Select
                        name="gaz_danger"
                        value={editedMeasure.gaz_danger}
                        onChange={(e) => handleChange({ target: { name: 'gaz_danger', value: e } })}
                        className="border p-1"
                      >
                        <Option value="0">Safe</Option>
                        <Option value="1">Danger</Option>
                      </Select>
                    ) : (
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {measure.gaz_danger === '0' ? 'Safe' : 'Danger'}
                      </Typography>
                    )}
                  </td>
                  <td>
                    {editMode === measure.id ? (
                      <Button onClick={handleSave}>
                        <FaSave />
                      </Button>
                    ) : (
                      <>
                        <Button onClick={() => handleEdit(measure)}>
                          <FaEdit />
                        </Button>
                        <Button onClick={() => handleDelete(measure.id)}>
                          <FaTrash />
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button
          variant="outlined"
          color="blue-gray"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => fetchMeasures(activeTab)}
        >
          <IoIosRefresh className="h-4 w-4" />
          Refill
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MeasuresTable;
