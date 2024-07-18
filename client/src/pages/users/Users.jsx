import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FaTrashAlt } from "react-icons/fa";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
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
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import { IoIosRefresh } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TABS = [
  { label: "All", value: "all" },
  { label: "Admin", value: "admin" },
  { label: "Responsable", value: "responsable" },
  { label: "Ouvrier", value: "ouvrier" },
];

export default function Users() {
  const [tableRows, setTableRows] = useState([]);
  const tableHeads = ["NAME", "EMAIL", "ROLE"];
  const [Loading, setLoading] = useState(false);
  const [deletedUser, setDeletedUser] = useState({ deleted: false, id: "" });
  const [search, setSearch] = useState("");
  const [err, setErr] = useState({ exist: false, msg: "" });
  const [stat, setStat] = useState(""); 
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      if (location.state.type === "success") {
        toast.success(location.state.message);
      } else if (location.state.type === "error") {
        toast.error(location.state.message);
      }
    }
  }, [location]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/users")
      .then((res) => {
        setTableRows(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setErr({ exist: true, msg: err.message });
        setLoading(false);
        setTableRows([]);
      });
  }, [deletedUser]);
  function fetchUsers() { 
    setLoading(true); 
    axios
          .get("/api/users")
          .then((res) => {
            setTableRows(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setErr({ exist: true, msg: err.data.message });
            setLoading(false);
            setTableRows([]);
          }).finally(()=>setLoading(false));
  }
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if(search == "") { 
      fetchUsers() ; 
    } else { 
    axios 
      .get("/api/users/search/" + search)
      .then((res) => {
        setTableRows(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setErr({ exist: true, msg: err.data.message });
        setLoading(false);
        setTableRows([]);
      });
    } 
  }

  function handleSearchByrole(e) {
    
    const role = e.target.value;
    setStat(role); 
    setLoading(true);
    switch (role) {
      case "all":
        axios
          .get("/api/users")
          .then((res) => {
            setTableRows(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setErr({ exist: true, msg: err.data.message });
            setLoading(false);
            setTableRows([]);
          });
        break;
      default:
        axios
          .get("/api/users/search-role/" + role)
          .then((res) => {
            setTableRows(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setErr({ exist: true, msg: err.data.message });
            setLoading(false);
            setTableRows([]);
          });
    }
  }

  function handleDelete(id ) {
    // const id = e.target.id;
    console.log(id); 
    axios
      .delete("/api/users/delete/" + id)
      .then((res) => {
        setDeletedUser({ ...deletedUser, deleted: true, id: id });
        toast.success("User deleted successfully!");
      })
      .catch((err) => {
        setErr({ exist: true, msg: err.message });
        toast.error("Failed to delete user.");
      });
  }

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
              value="all"
              className="button bg-background text-black border border-black hover:bg-gray-50"
              onClick={handleSearchByrole}
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
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <button
                className={`p-2 mx-2 bg-gray-100 rounded-md hover:bg-white ${ stat  === value ? 'bg-white' : ''}`}
                key={value}
                  value={value}
                  onClick={handleSearchByrole}
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
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* <Button
            type="submit"
              size="sm"
              text="Search"
              variant="outline"
              className="button bg-background text-black border border-black hover:bg-gray-50"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </Button> */}
          </form>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {tableHeads.map((head, index) => (
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
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="leading-none opacity-70 font-bold"
                >
                  ACTION
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {Loading ? (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  <Spinner className="h-12 w-12" />
                </td>
              </tr>
            ) : (
              tableRows.map(({ id, firstname, lastname, email, role }) => (
                <tr key={id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {firstname} {lastname}
                      </Typography>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {email}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="w-max">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {role}
                      </Typography>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-4">
                      <Link to={"edit/" + id}>
                        <Tooltip content="Edit User">
                          <IconButton variant="text" color="blue-gray">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </Link>
                      <Tooltip content="Delete User">
                        <IconButton
                          variant="text"
                          color="blue-gray"
                          id={id}
                          onClick={()=>handleDelete(id)}
                        >
                          <FaTrashAlt className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))
            )}
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
  );
}
