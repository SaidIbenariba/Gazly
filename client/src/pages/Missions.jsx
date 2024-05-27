// // import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Select, Option, Button } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { IoFilter } from "react-icons/io5";
import { PlusIcon } from "@heroicons/react/24/solid";
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
// import Button from "../components/Button";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "In Review",
    value: "In Review",
  },
  {
    label: "In progress",
    value: "in progress",
  },
  {
    label: "In Hold",
    value: "In Hold",
  },
  {
    label: "Completed",
    value: "Completed",
  },
];
const MissionCard = ({ mission }) => {
  return (
    <Card className="mt-6 w-72 cursor-pointer">
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
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {mission.title}
        </Typography>
        <Typography>{mission.description}</Typography>
        <Typography>{mission.reponsable}</Typography>
      </CardBody>
    </Card>
  );
};
const Missions = () => {
  const status = useParams();
  const [tableRows, setTableRows] = useState([]);
  const tableHeads = ["RESPONSABLE", "DIRECTEUR", "DESCRIPTION", "STARTDATE"];
  const [openFilter, setOpenFilter] = useState(false);
  const [searchBy, setSearchBy] = useState("");
  const [values, setValues] = useState({ value: "" });
  function handleFilter(e) {
    // console.log([searchBy, value]);
    e.preventDefault();
    console.log(values);
    switch (searchBy) {
      case "duration":
        axios
          .get("http://localhost:5000/api/missions/search/" + searchBy, values)
          .then((res) => setTableRows(res.data))
          .catch((err) => console.log(err));
        setOpenFilter(false);
        break;
      case "startdate":
        axios
          .get("http://localhost:5000/api/missions/search/" + searchBy, values)
          .then((res) => setTableRows(res.data))
          .catch((err) => console.log(err));
        setOpenFilter(false);
        break;
      default:
        axios
          .get("http://localhost:5000/api/missions/search/", values)
          .then((res) => setTableRows(res.data))
          .catch((err) => console.log(err));
        setOpenFilter(false);
    }
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/missions/" + status)
      .then((res) => setTableRows(res.data))
      .catch((err) => console.log(err));
    setOpenFilter(false);
  }, [status]);
  return (
    <Card className="h-full w-full relative" shadow={false}>
      <CardHeader floated={false} shadow={false} className="rounded-none">
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
              <Button className="button " size="sm">
                <PlusIcon strokeWidth={6} className="h-4 w-4" />
                Add mission
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <button
                  className="p-2 mx-2 bg-gray-100 rounded-md hover:bg-white"
                  key={value}
                  value={value}
                  // onClick={handleSearchByrole}
                >
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </button>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="flex flex-row gap-5 items-center">
            {/* icon filter when open form  */}
            <Button onClick={() => setOpenFilter(!openFilter)}>
              <IoFilter />
            </Button>
            {openFilter && (
              <div className="w-72 absolute z-50 bg-background top-0 right-52">
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
        {tableRows ? (
          tableRows.map((mission) => {
            <MissionCard key={mission.id} mission={mission} />;
          })
        ) : (
          <p className="text-red">no Mission</p>
        )}
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

export default Missions;
