import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Card, CardHeader, CardBody, CardFooter,
  Typography, Input, Select, Option, Tabs, TabsHeader
} from "@material-tailwind/react";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { IoFilter } from "react-icons/io5";

const TABS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
  { label: "Archived", value: "archive" },
];

const ObservationCard = ({ observation, onEdit, onDelete }) => (
  <Card className="mt-6 w-72 cursor-pointer z-0">
    <CardBody>
      <Typography variant="h5" color="blue-gray" className="mb-2">
        {observation.feedback}
      </Typography>
      <Typography>{new Date(observation.date).toLocaleDateString()}</Typography>
      <Typography>{observation.status}</Typography>
      <div className="flex justify-between mt-4">
        <Button className='text-black bg-transparent shadow-none' onClick={() => onEdit(observation)}>
          <PencilIcon strokeWidth={6} className="h-4 w-4" />
        </Button>
        <Button className='text-black bg-transparent shadow-none' onClick={() => onDelete(observation)}>
          <TrashIcon strokeWidth={6} className="h-4 w-4" />
        </Button>
      </div>
    </CardBody>
  </Card>
);

const ObservationsTable = () => {
  const [observations, setObservations] = useState([
    {
      date: "2024-06-15 10:00:00",
      feedback: "Feedback for observation 1",
      id_ws: 1,
      id_resp: 100,
      status: "pending",
    },
    {
      date: "2024-06-16 11:30:00",
      feedback: "Feedback for observation 2",
      id_ws: 2,
      id_resp: 101,
      status: "completed",
    },
    {
      date: "2024-06-17 14:45:00",
      feedback: "Feedback for observation 3",
      id_ws: 1,
      id_resp: 102,
      status: "archive",
    },
    {
      date: "2024-06-18 09:20:00",
      feedback: "Feedback for observation 4",
      id_ws: 3,
      id_resp: 100,
      status: "pending",
    },
    {
      date: "2024-06-19 15:55:00",
      feedback: "Feedback for observation 5",
      id_ws: 2,
      id_resp: 101,
      status: "completed",
    },
    {
      date: "2024-06-20 08:10:00",
      feedback: "Feedback for observation 6",
      id_ws: 3,
      id_resp: 102,
      status: "archive",
    },
  ]);

  const [status, setStatus] = useState("all");
  const [searchBy, setSearchBy] = useState("");
  const [values, setValues] = useState({ value: "" });
  const [openFilter, setOpenFilter] = useState(false);
  const filterMenuRef = useRef(null);
  const filterButtonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchObservations();
  }, [status]);

  const fetchObservations = () => {
    if (status && status !== "all") {
      axios
        .get("http://localhost:5000/api/observations/" + status)
        .then((res) => setObservations(res.data))
        .catch((err) => console.log(err));
    } else {
      axios
        .get("http://localhost:5000/api/observations/")
        .then((res) => setObservations(res.data))
        .catch((err) => console.log(err));
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
    navigate(`/private/observations/edit/${observation.date}/${observation.id_ws}/${observation.id_resp}`);
  };

  const handleDeleteObservation = (observation) => {
    axios
      .delete(`http://localhost:5000/api/observations/delete/${observation.date}/${observation.id_ws}/${observation.id_resp}`)
      .then(() => fetchObservations())
      .catch((err) => console.log(err));
  };

  const handleCreateObservation = () => {
    navigate("/private/observations/create");
  };

  const handleFilter = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:5000/api/observations/search?filter=${searchBy}&value=${values.value}`)
      .then((res) => setObservations(res.data))
      .catch((err) => console.log(err));
    setOpenFilter(false);
  };

  return (
    <Card className="h-full w-full relative" shadow={false}>
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
