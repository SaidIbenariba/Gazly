import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Card, CardHeader, CardBody, CardFooter,
  Typography, Input, Select, Option, Tabs, TabsHeader
} from "@material-tailwind/react";
import { PlusIcon, MagnifyingGlassIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { IoFilter } from "react-icons/io5";
import EditObservationModal from './EditObservationModal'; // Import the modal component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TABS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
  { label: "Archived", value: "archive" },
];

const ObservationCard = ({ observation, onEdit, onDelete }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-yellow-100 text-yellow-800';
      case 'archive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return (
    <Card className="hover:shadow-lg hover:border-none rounded-lg overflow-hidden w-72 h-fit cursor-pointer group border border-gray-200 shadow-none">
      <CardBody className="p-4">
        <Typography variant="h5" color="blue-gray" className="mb-2 font-bold text-xl">
          {observation.feedback}
        </Typography>
        <Typography className="mb-2 text-sm">{observation.date}</Typography>
        <Typography className="mb-2">Responsible: {observation.id_resp}</Typography>
        <Typography className="mb-2">Workspace: {observation.id_ws}</Typography>
        <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyles(observation.status)}`}>
          {observation.status}
        </span>
        <div className="flex justify-start gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button className='text-black bg-transparent shadow-none' onClick={() => onEdit(observation)}>
            <PencilIcon stroke="1" className="h-5 w-5 mr-1"/>
          </Button>
          <Button className='text-black bg-transparent shadow-none' onClick={() => onDelete(observation)}>
            <TrashIcon className="h-5 w-5 mr-1"/>
          </Button>
        </div>
      </CardBody>
    </Card>
  )
};

const ObservationsTable = () => {
  const [observations, setObservations] = useState([]);
  const [status, setStatus] = useState("all");
  const [searchBy, setSearchBy] = useState("");
  const [values, setValues] = useState({ value: "" });
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedObservation, setSelectedObservation] = useState(null);
  const filterMenuRef = useRef(null);
  const filterButtonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchObservations(status);
  }, [status]);

  const fetchObservations = (status) => {
    if (status && status !== "all") {
      axios
        .get("/api/observations/status/" + status)
        .then((res) => {
          setObservations(res.data);
          toast.success("Observations fetched successfully!");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error fetching observations.");
        });
    } else {
      axios
        .get("/api/observations/")
        .then((res) => {
          setObservations(res.data);
          toast.success("All observations fetched successfully!");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error fetching all observations.");
        });
    }
    setOpenFilter(false);
  };

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

  const handleEditObservation = (observation) => {
    setSelectedObservation(observation);
  };

  const handleDeleteObservation = (observation) => {
    axios
      .delete(`/api/observations/delete/${observation.date}/${observation.id_ws}/${observation.id_resp}`)
      .then((res) => {
        fetchObservations(status);
        toast.success("Observation deleted successfully!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error deleting observation.");
      });
  };

  const handleCreateObservation = () => {
    navigate("/private/observations/create");
  };

  const handleFilter = (e) => {
    e.preventDefault();
    axios
      .get(`/api/observations/search?filter=${searchBy}&value=${values.value}`)
      .then((res) => {
        setObservations(res.data);
        toast.success("Filter applied successfully!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error applying filter.");
      });
    setOpenFilter(false);
  };

  return (
    <Card className="flex flex-col gap-4 h-full w-full relative" shadow={false}>
      <ToastContainer />
      <CardHeader floated={false} shadow={false} className="rounded-none z-10">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Observations List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all observations
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button size="sm" className="bg-background text-black border border-black hover:bg-gray-50">
              View All
            </Button>
            <Button className="button" size="sm" onClick={handleCreateObservation}>
              <PlusIcon strokeWidth={6} className="h-4 w-4" />
              Add Observation
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-1 gap-y-4">
          <Tabs value={status} className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <button
                  className="p-2 mx-2 bg-gray-100 rounded-md hover:bg-white"
                  key={value}
                  value={value}
                  onClick={() => setStatus(value)}
                >
                  {label}
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
        {
          observations.length === 0 ? (
            <p>There is no observation</p>
          ) : (
            observations.map((observation, index) => (
              <ObservationCard key={index} observation={observation} onEdit={handleEditObservation} onDelete={handleDeleteObservation} />
            ))
          )
        }
      </div>
      {openFilter && (
        <div ref={filterMenuRef} className="w-72 absolute z-50 bg-background top-24 right-4 shadow-lg p-4">
          <form onSubmit={handleFilter}>
            <Select
              label="Select Filter"
              onChange={(e) => setSearchBy(e.target.value)}
            >
              <Option value="duration">Duration</Option>
              <Option value="startdate">Start Date</Option>
            </Select>
            <Input
              label="Search"
              onChange={(e) => setValues({ ...values, value: e.target.value })}
            />
            <Button type="submit">Filter</Button>
          </form>
        </div>
      )}
      {selectedObservation && (
        <EditObservationModal
          observation={selectedObservation}
          onClose={() => setSelectedObservation(null)}
          onSave={() => fetchObservations(status)}
        />
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
}

export default ObservationsTable;
