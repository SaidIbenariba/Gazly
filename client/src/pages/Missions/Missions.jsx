import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Select, Option, Button, Input, Typography, Card, CardHeader, CardBody, CardFooter, Tabs, TabsHeader } from "@material-tailwind/react";
import { MagnifyingGlassIcon, PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { IoFilter } from "react-icons/io5";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TABS = [
  { label: "All", value: "all" },
  { label: "In Review", value: "inReview" },
  { label: "In progress", value: "inProgress" },
  { label: "In Hold", value: "inHold" },
  { label: "Completed", value: "completed" },
];

const MissionCard = ({ mission, onEdit, onDelete }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case 'inProgress':
        return 'text-blue-500 bg-blue-100';
      case 'inReview':
        return 'text-yellow-500 bg-yellow-100';
      case 'onHold':
        return 'text-red-500 bg-red-100';
      case 'completed':
        return 'text-green-500 bg-green-100';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };
  return (
    <Card className="hover:shadow-lg hover:border-none rounded-lg overflow-hidden w-72 h-fit cursor-pointer group border border-gray-200 shadow-none">
      <CardBody className="p-4">
        <Typography variant="h5" color="blue-gray" className="mb-2 font-bold text-xl">
          {mission.title}
        </Typography>
        <Typography className="mb-2 text-sm">{mission.start}</Typography>
        <Typography className="mb-2">{mission.description}</Typography>
        <Typography className="mb-2">Responsible: {mission.responsible}</Typography>
        <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyles(mission.status)}`}>
          {mission.status}
        </span>
        <div className="flex justify-start gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button className='text-black bg-transparent shadow-none' onClick={() => onEdit(mission)}>
            <PencilIcon stroke="1" className="h-5 w-5 mr-1"/> 
          </Button>
          <Button className='text-black bg-transparent shadow-none' onClick={() => onDelete(mission)}>
            <TrashIcon className="h-5 w-5 mr-1"/> 
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

const Missions = () => {
  const { status } = useParams();
  const [stat, setStat] = useState(status || 'all');
  const [missions, setMissions] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [searchBy, setSearchBy] = useState("");
  const [value, setValue] = useState("");
  const filterMenuRef = useRef(null); 
  const filterButtonRef = useRef(null); 
  const [deletedMission, setDeletedMission] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = stat !== 'all' 
          ? await axios.get(`http://localhost:5000/api/missions/${stat}`)
          : await axios.get('http://localhost:5000/api/missions/');
        setMissions(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [stat, deletedMission]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target) && !filterButtonRef.current.contains(event.target)) {
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

  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const updatedMissions = [...missions];
    const movedMission = updatedMissions.splice(source.index, 1)[0];
    updatedMissions.splice(destination.index, 0, movedMission);
    setMissions(updatedMissions);
  };

  const handleFilter = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/api/missions/defaultSearch", value);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditMission = (mission) => {
    navigate(`edit/${mission.start}/${mission.id_dir}/${mission.id_resp}`);
  };

  const handleCreateMission = () => {
    navigate("create");
  };

  const handleDeleteMission = async (mission) => {
    try {
      await axios.delete(`http://localhost:5000/api/missions/delete/${mission.start}/${mission.id_dir}/${mission.id_resp}`);
      setDeletedMission(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="flex flex-col gap-4 h-full w-full relative" shadow={false}>
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
            <Button size="sm" text="view all" className="button bg-background text-black border border-black hover:bg-gray-50">
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
        <div className="flex flex-wrap items-center justify-between gap-1 gap-y-4">
          <Tabs value={stat} className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <button
                  className={`p-2 mx-2 bg-gray-100 rounded-md hover:bg-white ${stat === value ? 'bg-white' : ''}`}
                  key={value}
                  value={value}
                  onClick={() => setStat(value)}
                >
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </button>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="flex flex-row gap-5 items-center z-10">
            <Button ref={filterButtonRef} onClick={() => setOpenFilter(!openFilter)}>
              <IoFilter />
            </Button>
            <div className="w-full md:w-72">
              <form onSubmit={handleFilter}>
                <Input
                  label="Search"
                  className="flex flex-col justify-center items-center"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  placeholder="search..."
                  onChange={(e) => setValue(e.target.value)}
                />
              </form>
            </div>
          </div>
        </div>
      </CardHeader>
      <div className="w-full flex flex-wrap gap-4 relative z-0 mx-5 justify-center lg:justify-start">
        {missions.length === 0 ? (
          <p className="font-thin text-red-500 bg-red-100 rounded-md px-2">no missions</p>
        ) : (
          missions.map((mission, index) => (
            <MissionCard mission={mission} onEdit={handleEditMission} onDelete={handleDeleteMission} key={index} />
          ))
        )}
      </div>
      {openFilter && (
        <div ref={filterMenuRef} className="w-72 absolute z-50 bg-background top-24 right-4 shadow-lg p-4">
          <form onSubmit={handleFilter}>
            <Select
              label="Select Filter"
              onChange={(e) => setSearchBy(e)}
            >
              <Option value="duration">Duration</Option>
              <Option value="startdate">Start Date</Option>
            </Select>
            <Input
              label="Search"
              onChange={(e) => setValue({ ...value, value: e.target.value })}
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
