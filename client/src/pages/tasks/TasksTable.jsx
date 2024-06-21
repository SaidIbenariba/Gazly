import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FaTrashAlt, FaEdit, FaSave, FaTrash } from 'react-icons/fa';
import { UserPlusIcon } from "@heroicons/react/24/solid";
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
  { label: "Done", value: "done" },
  { label: "In Progress", value: "inprogress" },
  { label: "Expired", value: "expired" },
];

const demoTasks = [
  {
    date: '2024-06-14T08:30',
    duree: '2 hours',
    description: 'Task 1 description',
    status: 'inprogress',
    id_ouv: 1,
    id_resp: 1
  },
  {
    date: '2024-06-15T10:00',
    duree: '3 hours',
    description: 'Task 2 description',
    status: 'done',
    id_ouv: 2,
    id_resp: 1
  }
];

const TasksTable = () => {
  const [tasks, setTasks] = useState(demoTasks);
  const [editMode, setEditMode] = useState(null);
  const [editedTask, setEditedTask] = useState({});
  const [loading, setLoading] = useState(false); 
  const [err, setErr] = useState({ exist: false, msg: "" });
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const tableHeads = ["Date", "Duree", "Description", "Status", "Actions"];

  const handleEdit = (task) => {
    setEditMode(task.date);
    setEditedTask(task);
  };

  const handleDelete = (id_ouv) => {
    setTasks(tasks.filter(task => task.id_ouv !== id_ouv));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSave = () => {
    setTasks(tasks.map(task => task.date === editedTask.date ? editedTask : task));
    setEditMode(null);
  };

  const handleSearchByRole = (status) => {
    setActiveTab(status);
    setLoading(true);
    let url = "http://localhost:5000/api/tasks";
    if (status !== "all") {
      url = `${url}/${status}`;
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

  return (
    <Card className="h-full w-full" shadow={false}>
      <ToastContainer />
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Users list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all users
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              size="sm"
              text="view all"
              variant="outline"
              className="button bg-background text-black border border-black hover:bg-gray-50"
            >
              view all
            </Button>
            <Link to="create">
              <Button className="button " size="sm" text="Add user">
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
                Add user
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-1 gap-y-4">
          <Tabs value={activeTab} className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <button
                  key={value}
                  className={`p-2 mx-2 bg-gray-100 rounded-md hover:bg-white ${activeTab === value ? "bg-white" : ""}`}
                  onClick={() => handleSearchByRole(value)}
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
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              size="sm"
              text="Search"
              variant="outline"
              className="button bg-background text-black border border-black hover:bg-gray-50"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </Button>
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
              {tasks.map((task) => (
                <tr key={task.date}>
                  <td>
                    {editMode === task.date ? (
                      <input
                        type="datetime-local"
                        name="date"
                        value={editedTask.date}
                        onChange={handleChange}
                        className="border p-1"
                      />
                    ) : (
                      task.date
                    )}
                  </td>
                  <td>
                    {editMode === task.date ? (
                      <input
                        type="text"
                        name="duree"
                        value={editedTask.duree}
                        onChange={handleChange}
                        className="border p-1"
                      />
                    ) : (
                      task.duree
                    )}
                  </td>
                  <td>
                    {editMode === task.date ? (
                      <input
                        type="text"
                        name="description"
                        value={editedTask.description}
                        onChange={handleChange}
                        className="border p-1"
                      />
                    ) : (
                      task.description
                    )}
                  </td>
                  <td>
                    {editMode === task.date ? (
                      <Select
                        name="status"
                        value={editedTask.status}
                        onChange={(e) => handleChange({ target: { name: 'status', value: e } })}
                        className="border p-1"
                      >
                        <Option value="done">Done</Option>
                        <Option value="inprogress">In Progress</Option>
                        <Option value="expired">Expired</Option>
                      </Select>
                    ) : (
                      task.status
                    )}
                  </td>
                  <td>
                    {editMode === task.date ? (
                      <Button onClick={handleSave}>
                        <FaSave />
                      </Button>
                    ) : (
                      <>
                        <Button onClick={() => handleEdit(task)}>
                          <FaEdit />
                        </Button>
                        <Button onClick={() => handleDelete(task.id_ouv)}>
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
        >
          <IoIosRefresh className="h-4 w-4" />
          Refill
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TasksTable;
