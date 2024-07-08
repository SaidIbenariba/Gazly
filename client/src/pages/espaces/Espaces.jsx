import axios from 'axios';
import React, { useEffect, useState } from 'react'; 
import { Link, useLocation } from "react-router-dom";
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
import { Pin } from 'lucide-react';
const tableHeads = ["NAME", "Responsable", "Start", "End"];
const TABS = [];
const Espaces = () => {
    const [espaces, setEspaces] = useState([]); 
    const [loading, setLoading] = useState(false); 
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
    useEffect(()=>{
        console.log(espaces); 
    }, [espaces]); 
    useEffect(()=>{
        fetchEspaces(); 
    },[]); 
    
    async function fetchEspaces() { 
        try { 
            const res = await axios.get("http://localhost:5000/api/workspaces") ; 
            const Espaces = Promise.all(
                res.data.map(async (espace) => {
                  try {
                    console.log(espace);
                    const response = await axios.get(`http://localhost:5000/api/users/read/${espace.id_resp}`);
                    return { ...espace, ...response.data[0]};
                  } catch (err) {
                    console.log(err);
                    return { ...espace }; // Return the original value if there's an error
                  }
                })
              );
            //  setMissions(Missions); 
            Espaces.then(results => {
              setEspaces(results);
            }).catch(error => {
              console.error(error);
            });
            // console.log(res.data); 
        }catch(err) { 
            console.log("fetch espaces error", err); 
        }
    }
    function formatDate(date) { 
        const formattedDate = new Date(date).toISOString().split('T')[0]
        return formattedDate;    
    }
    function handleDelete(id) {
        axios.delete("http://localhost:5000/api/workspaces/delete/  "+id)
        .then((res)=>{
            toast.success("workspace deleted successfully!");
        }).catch((err)=>{
            toast.error("Failed to delete workspace.");
        }); 
        fetchEspaces();
    }
    function handleHistory() {
      
    }
  return ( 
    <Card className="h-full w-full" shadow={false}>
      <ToastContainer />
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Workspaces list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all workspace
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              size="sm"
              text="view all"
              variant="outline"
              value="all"
              className="button bg-background text-black border border-black hover:bg-gray-50"
            //   onClick={handleSearchByrole}
            >
              view all
            </Button>
            <Link to="create">
              <Button className="button " size="sm" text="Add user">
                <Pin strokeWidth={2} className="h-4 w-4" />
                Add Workspace 
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
          {/* <form
            className="flex w-full shrink-0 gap-2 md:w-max"
            onSubmit={handleSubmit}
          >
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            /> */}
            {/* <Button
            type="submit"
              size="sm"
              text="Search"
              variant="outline"
              className="button bg-background text-black border border-black hover:bg-gray-50"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </Button> */}
          {/* </form> */}
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
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  <Spinner className="h-12 w-12" />
                </td>
              </tr>
            ) : (
              espaces.map((espace, index) => (
                <tr key={index} onClick={handleHistory} className='cursor-pointer'>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                         {espace.name}
                      </Typography>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {espace.id_resp ? espace.firstname + " " + espace.lastname : "No" }
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="w-max">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {espace.id_resp && formatDate(espace.start) }
                      </Typography>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="w-max">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {espace.id_resp && formatDate(espace.end) }
                      </Typography>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-4">
                      <Link to={"edit/" + espace.id}>
                        <Tooltip content="Edit Workspace">
                          <IconButton variant="text" color="blue-gray">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </Link>
                      <Tooltip content="Delete Workspace">
                        <IconButton
                          variant="text"
                          color="blue-gray"
                          id={espace.id}
                          onClick={()=>handleDelete(espace.id)}
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
  )
}

export default Espaces