// src/observation/ObservationsTable.jsx

import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Button, Card, CardHeader, CardBody, CardFooter, Typography, Input, Select, Option, Tabs, TabsHeader } from "@material-tailwind/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { IoFilter } from "react-icons/io5";

const TABS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
  { label: "Archived", value: "archived" },
];

const ObservationCard = ({ observation, onEdit, onDelete }) => {
  return (
    <Card className="mt-6 w-72 cursor-pointer">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {observation.feedback}
        </Typography>
        <Typography>{new Date(observation.date).toLocaleDateString()}</Typography>
        <Typography>{observation.status}</Typography>
        <div className="flex justify-between mt-4">
          <Button onClick={() => onEdit(observation)}>Edit</Button>
          <Button onClick={() => onDelete(observation.id)}>Delete</Button>
        </div>
      </CardBody>
    </Card>
  );
};

const ObservationsTable = () => {
  const [observations, setObservations] = useState([]);
  const [status, setStatus] = useState("all");
  const [searchBy, setSearchBy] = useState("");
  const [values, setValues] = useState({ value: "" });
  const [openFilter, setOpenFilter] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    fetchObservations();
  }, [status]);

  const fetchObservations = () => {
    axios
      .get(`http://localhost:5000/api/observations?status=${status}`)
      .then((res) => setObservations(res.data))
      .catch((err) => console.log(err));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const updatedObservations = [...observations];
    const [movedObservation] = updatedObservations.splice(result.source.index, 1);
    updatedObservations.splice(result.destination.index, 0, movedObservation);
    setObservations(updatedObservations);
  };

  const handleEditObservation = (observation) => {
    history(`/observations/edit/${observation.date}/${observation.id_ws}/${observation.id_resp}`);
  };

  const handleDeleteObservation = (observation) => {
    axios
      .delete(`http://localhost:5000/api/observations/delete/${observation.date}/${observation.id_ws}/${observation.id_resp}`)
      .then(() => fetchObservations())
      .catch((err) => console.log(err));
  };

  const handleCreateObservation = () => {
    history("/observations/create");
  };

  const handleFilter = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:5000/api/observations/search?filter=${searchBy}&value=${values.value}`)
      .then((res) => setObservations(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <Card className="h-full w-full relative" shadow={false}>
      <CardHeader floated={false} shadow={false} className="rounded-none">
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
            <Button className="bg-primary" size="sm" onClick={handleCreateObservation}>
              <PlusIcon strokeWidth={6} className="h-4 w-4" />
              Add Observation
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-1 gap-y-4">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <button
                  className="p-2 mx-2 bg-gray-100 rounded-md hover:bg-white"
                  key={value}
                  value={value}
                  onClick={(e) => setStatus(e.target.value)}
                >
                  {label}
                </button>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="flex flex-row gap-5 items-center">
            <Button onClick={() => setOpenFilter(!openFilter)}>
              <IoFilter />
            </Button>
            {openFilter && (
              <div className="w-72 absolute z-50 bg-background top-0 right-52">
                <form onSubmit={handleFilter}>
                  <Select label="Select Filter" onChange={(e) => setSearchBy(e)}>
                    <Option value="duration">Duration</Option>
                    <Option value="startdate">Start Date</Option>
                  </Select>
                  <Input label="Search" onChange={(e) => setValues({ ...values, value: e.target.value })} />
                </form>
              </div>
            )}
            <div className="w-full md:w-72">
              <form onSubmit={handleFilter}>
                <Input
                  label="Search"
                  className="flex flex-col justify-center items-center"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  placeholder="search..."
                  onChange={(e) => setValues({ value: e.target.value })}
                />
              </form>
            </div>
          </div>
        </div>
      </CardHeader>
      <div className="w-full flex flex-wrap gap-4 relative z-0 mx-5 justify-center lg:justify-start">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="observations">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {observations.map((observation, index) => (
                  <Draggable key={observation.id} draggableId={observation.id.toString()} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <ObservationCard
                          observation={observation}
                          onEdit={handleEditObservation}
                          onDelete={handleDeleteObservation}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
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

export default ObservationsTable;
