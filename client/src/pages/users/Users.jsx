// // import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
// import Button from "../../components/Button";
import { Spinner } from "@material-tailwind/react";
import { IoIosRefresh } from "react-icons/io";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "Responsable",
    value: "responsable",
  },
  {
    label: "Ouvrier",
    value: "ouvrier",
  },
];

export default function Users() {
  const [tableRows, setTableRows] = useState([]);
  const tableHeads = ["NAME", "EMAIL", "ROLE"];
  const [Loading, setLoading] = useState(false);
  const [deletedUser, setDeletedUser] = useState({ deleted: false, id: "" });
  const [search, setSearch] = useState("");
  const [err, setErr] = useState({ exist: false, msg: "" });
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => {
        setTableRows(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErr({ exist: true, msg: err.message });
        setLoading(false);
        setTableRows([]);
      });
  }, [deletedUser]);
  function handleSubmit(e) {
    e.preventDefault();
    console.log(`search result : ${search}`);
    setLoading(true);
    axios
      .get("http://localhost:5000/api/users/search/" + search)
      .then((res) => {
        setTableRows(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setErr({ exist: true, msg: err.data.message });
        setLoading(false);
        setTableRows([]);
      });
  }
  function handleSearchByrole(e) {
    const role = e.target.value;
    console.log(role);
    setLoading(true);
    switch (role) {
      case "all":
        axios
          .get("http://localhost:5000/api/users")
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
          .get("http://localhost:5000/api/users/search-role/" + role)
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

  function handleDelete(e) {
    const id = e.target.id;
    console.log(id);
    axios
      .delete("http://localhost:5000/api/users/delete/" + id)
      .then((res) => {
        console.log(res);
        setDeletedUser({ ...deletedUser, deleted: true, id: id });
      })
      .catch((err) => {
        console.log(err);
        setErr({ exist: true, msg: err.message });
        setDeletedUser({ ...deletedUser, deleted: false, id: "" });
      });
  }
  return (
    <Card className="h-full w-full" shadow={false}>
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
        <div className="flex  flex-wrap items-center justify-between gap-1 gap-y-4">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <button
                  className="p-2 mx-2 bg-gray-100 rounded-md hover:bg-white"
                  key={value}
                  value={value}
                  onClick={handleSearchByrole}
                >
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </button>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="flex flex-row w-full md:w-72">
            <form
              onSubmit={handleSubmit}
              className=" w-11/12 md:10/12 rounded-r-none"
            >
              <Input
                label="Search"
                className="flex flex-col justify-center items-center  rounded-r-none border-r-0"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                placeholder="search..."
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </form>
            <div className="w-1/12 md:w-[40px] flex justify-center items-center bg-black  text-white cursor-pointer rounded-r-md ">
              <IoIosRefresh />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardBody className="overflow-scroll px-0">
        {/* {deletedUser.deleted && (
          <span className="text-red-500">User was Deleted</span>
        )} */}
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
                    className="font-normal leading-none opacity-70"
                  >
                    {head.toUpperCase()}
                  </Typography>
                </th>
              ))}
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {!Loading ? (
              tableRows.map(
                ({ id, firstname, lastname, email, role }, index) => {
                  const isLast = index === tableRows.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          {/* <Avatar src={img} alt={name} size="sm" /> */}
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {firstname}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {lastname}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {email}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {role}
                          </Typography>
                        </div>
                      </td>
                      {/* <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={online ? "online" : "offline"} // we can use with referesh code
                          color={online ? "green" : "blue-gray"}
                        />
                      </div>
                    </td> */}
                      {/* <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
                      </Typography>
                    </td> */}
                      <td className={classes}>
                        <Link to={`edit/${id}`}>
                          <Tooltip content="Edit User">
                            <IconButton variant="text">
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </Link>
                        <Tooltip content="Delete User">
                          <IconButton
                            variant="text"
                            id={id}
                            onClick={handleDelete}
                          >
                            <FaTrashAlt />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              )
            ) : (
              <Spinner color="red" />
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
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
