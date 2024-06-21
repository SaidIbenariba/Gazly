// // import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Select, Option, Button, usePrevious } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { IoFilter } from "react-icons/io5";
import { PlusIcon } from "@heroicons/react/24/solid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  CardFooter,
  Tabs,
  TabsHeader,
} from "@material-tailwind/react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";


// import Button from "../components/Button";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "In Review",
    value: "inReview",
  },
  {
    label: "In progress",
    value: "inProgress",
  },
  {
    label: "In Hold",
    value: "inHold",
  },
  {
    label: "Completed",
    value: "completed",
  },
];
const demoData = [ 
  {
    start: '2024-06-01 09:00:00',
    end: '2024-06-15 17:00:00',
    title: 'Mission Alpha',
    description: 'Description for Mission Alpha',
    id_dir: 1,
    id_resp: 101,
    status: 'inProgress',
  },
  {
    start: '2024-06-05 10:00:00',
    end: '2024-06-20 18:00:00',
    title: 'Mission Beta',
    description: 'Description for Mission Beta',
    id_dir: 2,
    id_resp: 102,
    status: 'inReview',
  },
  {
    start: '2024-06-10 08:00:00',
    end: '2024-06-25 16:00:00',
    title: 'Mission Gamma',
    description: 'Description for Mission Gamma',
    id_dir: 3,
    id_resp: 103,
    status: 'onHold',
  },
  {
    start: '2024-06-15 11:00:00',
    end: '2024-06-30 19:00:00',
    title: 'Mission Delta',
    description: 'Description for Mission Delta',
    id_dir: 4,
    id_resp: 104,
    status: 'completed',
  },
  {
    start: '2024-06-20 07:00:00',
    end: '2024-07-05 15:00:00',
    title: 'Mission Epsilon',
    description: 'Description for Mission Epsilon',
    id_dir: 5,
    id_resp: 105,
    status: 'expired',
  },
]
const MissionCard = ({ mission ,onEdit, onDelete  }) => {
  return (
    <Card className="mt-6 w-72 cursor-pointer z-0">
      {/* <CardHeader className=" h-1/3" shadow={false}>
          {/* <img
            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            alt="card-image"
            className="w-30"
          /> *
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Mission title
          </Typography>
        </CardHeader> */}
      <CardBody className="z-0">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {mission.title}
        </Typography>
        <Typography>{mission.start}</Typography>
        <Typography>{mission.description}</Typography>
        <Typography>{mission.reponsable}</Typography>
        <div className="flex justify-between mt-4">
          <Button className='text-black bg-transparent shadow-none' onClick={() => onEdit(mission)}><PencilIcon strokeWidth={6} className="h-4 w-4"/></Button>
          <Button className='text-black bg-transparent shadow-none' onClick={() => onDelete(mission.id)}><TrashIcon strokeWidth={6} className="h-4 w-4"/></Button>
        </div>

      </CardBody>
    </Card>
  );
};
const Missions = () => {
  const status = useParams();
  
  const [stat, setStat] = useState(status ? status.status : null);
  const [missions, setMissions] = useState([]);
  const tableHeads = ["RESPONSABLE", "DIRECTEUR", "DESCRIPTION", "STARTDATE"];
  const [openFilter, setOpenFilter] = useState(false);
  const [searchBy, setSearchBy] = useState("");
  const [values, setValues] = useState({ value: "" });
  const filterMenuRef = useRef(null); 
  const filterButtonRef = useRef(null); 

  const history = useNavigate(); 


  useEffect(() => {
    console.log(stat);
    if (stat && stat != "all") {
      console.log("find missions depend on status");
        axios
          .get("http://localhost:5000/api/missions/" + stat)
          .then((res) => setMissions(res.data))
          .catch((err) => console.log(err));
        setOpenFilter(false);
    } else {
      console.log("find All missions");
      axios
        .get("http://localhost:5000/api/missions/")
        .then((res) => {
          setMissions(res.data);
          console.log(res);
        })
        .catch((err) => console.log(err));
      setOpenFilter(false);
    }
  }, [status, stat]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterMenuRef.current && 
        !filterMenuRef.current.contains(event.target) &&
        !filterButtonRef.current.contains(event.target)
      ) {
        setOpenFilter(false);
      }
    };
    
    if (openFilter) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [openFilter]);
  useEffect(() => {
    // Fetch missions data from the server
    fetchMissions(); 
  }, []);
  const fetchMissions= ()=> { 
    axios
    .get("http://localhost:5000/api/missions")
    .then((res) => setMissions(res.data))
    .catch((err) => console.log(err));
  }
  const handleDragEnd = (result) => {
    // Destructure the result object
    const { destination, source, draggableId } = result;

    // If there's no valid destination, return
    if (!destination) return;

    // If the dragged item has not been moved to a different position, return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // Update the missions array according to the drag and drop result
    const updatedMissions = [...missions];
    const movedMission = updatedMissions.splice(source.index, 1)[0];
    updatedMissions.splice(destination.index, 0, movedMission);
    setMissions(updatedMissions);

    // Here you can also send an API request to update the mission status on the server
  };
  function handleFilter(e) {
    // console.log([searchBy, value]);
    e.preventDefault();
    console.log(values);
    switch (searchBy) {
      case "duration":
        axios
          .get("http://localhost:5000/api/missions/search/" + searchBy, values)
          .then((res) => setMissions(res.data))
          .catch((err) => console.log(err));
        setOpenFilter(false);
        break;
      case "startdate":
        axios
          .get("http://localhost:5000/api/missions/search/" + searchBy, values)
          .then((res) => setMissions(res.data))
          .catch((err) => console.log(err));
        setOpenFilter(false);
        break;
      default:
        axios
          .get("http://localhost:5000/api/missions/defaultSearch", values) // keyword
          .then((res) => setMissions(res.data))
          .catch((err) => console.log(err));
        setOpenFilter(false);
    }
  }


  const handleEditMission = (mission) => {
    // Navigate to the edit mission page
    history(`edit/${mission.start}/${mission.id_dir}/${mission.id_resp}`);
  };

  const handleCreateMission = () => {
    // Navigate to the create mission page
    history("create");
  };

  const handleDeleteMission = (missionId) => {
    // Send a DELETE request to your API to delete the mission with the specified ID
    // After successful deletion, update the missions state to remove the deleted mission
  };
  return (
    <Card className="h-full w-full relative" shadow={false}>
      <CardHeader floated={false} shadow={false} className="rounded-none z-50">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Mission list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all missions
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              size="sm"
              text="view all"
              className="button bg-background text-black border border-black hover:bg-gray-50"
            >
              View All
            </Button>
            <Link to="create">
              <Button className="button " size="sm" onClick={handleCreateMission}>
                <PlusIcon strokeWidth={6} className="h-4 w-4" />
                Add mission
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex  flex-wrap items-center justify-between gap-1 gap-y-4">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <button
                  className="p-2 mx-2 bg-gray-100 rounded-md hover:bg-white"
                  key={value}
                  value={value}
                  onClick={(e) => setStat(e.target.value)}
                  // onClick={handleSearchByrole}
                >
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </button>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="flex flex-row gap-5 items-center z-10">
            {/* icon filter when open form  */}
            <Button ref={filterButtonRef} onClick={() => setOpenFilter(!openFilter)}>
              <IoFilter />
            </Button>
            

            <div className="w-full md:w-72">
              <form onSubmit={handleFilter}>
                <Input
                  label="Search"
                  className="flex flex-col justify-center items-center "
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  placeholder="search..."
                  onChange={(e) => {
                    setSearchBy("");
                    setValues({ value: e.target.value });
                  }}
                />
              </form>
            </div>
          </div>
        </div>
      </CardHeader>
      <div className="w-full flex flex-wrap gap-4 relative z-0 mx-5 justify-center lg:justify-start">
        {missions.length == 0 ? (
          <p className="font-thin text-red-500 bg-red-100 rounded-md px-2">no missions </p>
        ):
      (
        missions.map((mission, index) => (
          <MissionCard mission={mission} onEdit={handleEditMission} onDelete={handleDeleteMission} />
      ))
      )}
            </div>
            {openFilter && (
              <div ref={filterMenuRef} className="w-72 absolute z-50 bg-background top-24 right-4 shadow-lg p-4">
                <form onSubmit={handleFilter}>
                  <Select
                    label="Select Filter"
                    onChange={(e) => {
                      setSearchBy(e);
                    }}
                  >
                    <Option value="duration">Duration</Option>
                    <Option value="startdate">Start Date</Option>
                  </Select>
                  <Input
                    label="Search"
                    onChange={(e) => {
                      setValues({ ...values, value: e.target.value });
                    }}
                  />
                </form>
              </div>
            )}
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 mt-6">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Missions;
