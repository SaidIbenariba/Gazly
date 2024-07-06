import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoIosRefresh } from "react-icons/io";
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
  Spinner,
  Checkbox,
  select,
} from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskEditModal from "./TaskEditModal"; // Import the modal component
import TaskAddModal from "./TaskAddModal";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

const TABS = [
  { label: "All", value: "all" },
  { label: "completed", value: "completed" },
  { label: "In Progress", value: "inProgress" },
  { label: "Expired", value: "expired" },
];

const TasksTable = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Add state for add task modal
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState({ exist: false, msg: "" });
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [hoveredTask, setHoveredTask] = useState(null);

  const tableHeads = ["Date", "Duree", "Description", "Status", "Actions"];

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id_ouv) => {
    setTasks(tasks.filter((task) => task.id_ouv !== id_ouv));
  };

  const handleSave = (editedTask) => {
    setTasks(tasks.map((task) => (task.date === editedTask.date ? editedTask : task)));

    axios
      .put(`http://localhost:5000/api/tasks/edit/${editedTask.date}/${editedTask.id_ouv}/${editedTask.id_resp}`, {
        status: editedTask.status,
        description: editedTask.description,
        duree: editedTask.duree,
      })
      .then((res) => setIsEditModalOpen(false))
      .catch((err) => {
        console.error('Failed to update task status', err);
      });
  };

  const handleAddSave = (newTask) => {
    console.log(newTask); 
    axios
      .post("http://localhost:5000/api/tasks/createTask", newTask)
      .then((res) => {
        setIsAddModalOpen(false);
        fetchTasks(); 
      })
      .catch((err) => {
        console.error('Failed to add new task', err);
      });
      
  };

  const fetchTasks = (status = "") => {
    setActiveTab(status);
    setLoading(true);
    let url = "http://localhost:5000/api/tasks";
    if (status !== "all") {
      url = `${url}/status/${status}`;
    }
    axios
      .get(url)
      .then((res) => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setErr({ exist: true, msg: err.response.data.message });
        setLoading(false);
        setTasks([]);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/tasks/search/${search}`)
      .then((res) => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setErr({ exist: true, msg: err.response.data.message });
        setLoading(false);
        setTasks([]);
      });
  };

  const handleCheckboxChange = (task) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id_ouv === task.id_ouv && t.date === task.date && t.id_resp === task.id_resp) {
        return {
          ...t,
          status: t.status === "completed" ? "inProgress" : "completed",
        };
      }
      return t;
    });
    setTasks(updatedTasks);

    axios
      .put(`http://localhost:5000/api/tasks/edit/${task.date}/${task.id_ouv}/${task.id_resp}`, {
        status: task.status === "completed" ? "inProgress" : "completed",
        description: task.description,
        duree: task.duree,
      })
      .then((res) => console.log("Task updated successfully", res))
      .catch((err) => {
        console.error("Failed to update task status", err);
      });
  };

  const handleMouseEnter = (task) => {
    setHoveredTask(task.id_ouv);
  };

  const handleMouseLeave = () => {
    setHoveredTask(null);
  };

  return (
    <Card className="h-full w-full" shadow={false}>
      <ToastContainer />
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Tasks List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Manage your tasks efficiently
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              size="sm"
              text="View All"
              variant="outline"
              className="button bg-background text-black border border-black hover:bg-gray-50"
            >
              View All
            </Button>
            {/* <Link to="create"> */}
            <Button className="button" size="sm" text="Add Task" onClick={() => setIsAddModalOpen(true)}>
              Add Task
            </Button>
            {/* </Link> */}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-1 gap-y-4">
          <Tabs value={activeTab} className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <button
                  key={value}
                  className={`p-2 mx-2 bg-gray-100 rounded-md hover:bg-white ${
                    activeTab === value ? "bg-white" : ""
                  }`}
                  onClick={() => fetchTasks(value)}
                >
                  {label}
                </button>
              ))}
            </TabsHeader>
          </Tabs>
          <form
            className="flex w-full shrink-0 gap-2 md:w-max"
            onSubmit={handleSubmit}
          >
            <Input
              label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<IoIosRefresh className="h-5 w-5" />}
            />
            <Button
              size="sm"
              text="Search"
              variant="outline"
              className="button bg-background text-black border border-black hover:bg-gray-50"
            >
              <IoIosRefresh className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : tasks.length === 0 ? (
          <Typography color="blue-gray" className="text-center">
            No tasks found.
          </Typography>
        ) : (
          <div className="flex flex-col justify-center items-center space-y-4">
            {tasks.map((task) => (
              <div
                key={task.date}
                className="border rounded-lg overflow-hidden shadow-sm max-w-[1000px] min-w-[500px] w-fit"
                onMouseEnter={() => handleMouseEnter(task)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Checkbox
                        checked={task.status == "completed" ? true : false}
                        onChange={() => handleCheckboxChange(task)}
                      />
                      <Typography variant="body" color="blue-gray" className="ml-2">
                        {task.description} 
                      </Typography>
                    </div>
                    <div
                      className={`flex space-x-2 transition-opacity duration-300 ${
                        hoveredTask === task.id_ouv ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <Button
                        size="sm"
                        onClick={() => handleEdit(task)}
                        className="bg-blue-400 text-white hover:bg-blue-600"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDelete(task.id_ouv)}
                        className="bg-red-400 text-white hover:bg-red-600"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Typography
                    variant="caption"
                    color="gray"
                    className="mt-2 block text-sm"
                  >
                    Due: {new Date(task.date).toLocaleDateString()}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button
          variant="outlined"
          color="blue-gray"
          size="sm"
          className="flex items-center gap-2"
        >
          <IoIosRefresh className="h-4 w-4" />
          Refresh
        </Button>
      </CardFooter>
      {isEditModalOpen && (
        <TaskEditModal
          task={selectedTask}
          onSave={handleSave}
          onClose={() => setIsEditModalOpen(false)}
          isOpen={isEditModalOpen}
        />
      )}
      {isAddModalOpen && ( 
         <TaskAddModal
          isOpen={isAddModalOpen}
          onClose={()=>setIsAddModalOpen(false)}
          onSave={handleAddSave}
          />
      )}
    </Card>
  );
};

export default TasksTable;
