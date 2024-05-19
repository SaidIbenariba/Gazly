import React, { useEffect, useRef, useState } from "react";
import LineChart from "../../components/Charts/SparkLine";
import SparkLine from "../../components/Charts/SparkLine";
import Line from "../../pages/Charts/Line";
import { Card, Checkbox } from "@material-tailwind/react";
import { FaFire } from "react-icons/fa";
import { MdAir } from "react-icons/md";
import { PiLineVertical } from "react-icons/pi";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import { Spinner } from "@material-tailwind/react";
// import { PiLineVerticalBold } from "react-icons/pi";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [gazLevel, setGazLevel] = useState(0);
  const [airQuanlity, setAirQuanlity] = useState(0);
  const [missions, setMissions] = useState([]);
  const [refresh, setRefresh] = useState(false);
  setInterval(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/measures/getLastMeasure")
      .then((res) => {
        setGazLevel(res.data[0]), setLoading(false);
      })
      .catch((err) => console.log(err), setLoading(false));
    axios
      .get("http://localhost:5000/api/measures/getAirQuanlity")
      .then((res) => {
        setGazLevel(res.data[0]), setLoading(false);
      })
      .catch((err) => console.log(err), setLoading(false));
    setLoading(false);
  }, 3000);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/missions")
      .then((res) => {
        setMissions(res.data), setLoading(false);
      })
      .catch((err) => console.log(err), setLoading(false));
    setLoading(false);
    // setRefresh(false);
  }, []);

  return (
    <div className="flex flex-col gap-10 sm:justify-center">
      <div
        className="flex flex-row flex-wrap justify-center md:justify-start "
        id="cart-container"
      >
        <div className="flex flex-wrap gap-5 justify-start max-w-[740px] lg:w-fil">
          <Card className="flex flex-col p-5 items-start justify-between w-[180px]">
            <div className="flex flex-row  items-center justify-between w-full">
              <span className=" font-bold">Gaz Level</span>

              <span className="bg-gray-100 w-8 h-8 flex items-center justify-center rounded-full text-red-500">
                <FaFire />
              </span>
            </div>
            <span className="text-xl font-bold p-0 text-red-500">
              {gazLevel}
              {/*unit */}
            </span>
            <span className=" text-xs font-extralight"> this month</span>
          </Card>
          <Card className="flex flex-col  p-5 items-start justify-between w-[180px]">
            <div className="flex flex-row  items-center gap-4">
              <span className=" font-bold">Air Quanlity</span>
              <span className="bg-gray-100 w-8 h-8 flex items-center justify-center rounded-full text-blue-500">
                <MdAir />
              </span>
            </div>
            <span className="text-xl font-bold p-0 text-blue-500">900</span>
            <span className=" text-xs font-extralight"> this month</span>
          </Card>
          <Card className="flex flex-col p-5  items-start justify-between w-[180px]">
            <div className="flex flex-row  items-center gap-4">
              <span className=" font-bold">Air Quanlity</span>
              <span className="bg-gray-100 w-8 h-8 flex items-center justify-center rounded-full text-blue-500">
                <MdAir />
              </span>
            </div>
            <span className="text-xl font-bold p-0 text-blue-500">900</span>
            <span className=" text-xs font-extralight"> this month</span>
          </Card>
          <Card className="flex flex-col p-2 gap-1">
            <div className="text-xs font-semi-bold text-yellow-400">
              FRIDAY,17 MAY
            </div>{" "}
            <Card className="flex flex-row items-center rounded-none pr-2 justify-start bg-blue-100 shadow-none">
              <PiLineVertical size className="h-10  text-blue-400" />
              <div
                className="flex flex-row gap-10 items-center "
                id="event-description"
              >
                <span className=" text-sm font-bold" id="title">
                  Title
                </span>
                <div
                  className=" text-[10px] font-extralight flex flex-col"
                  id="description"
                >
                  <span>13:15</span> {/* Start  date  */}
                  <span>13:45</span>
                  {/* End  date  */}
                </div>
              </div>
            </Card>
            <Card className="flex flex-row items-center rounded-none pr-2 justify-start bg-yellow-100 shadow-none">
              <PiLineVertical size className="h-10  text-yellow-400" />
              <div
                className="flex flex-row gap-10 items-center"
                id="event-description"
              >
                <span className=" text-sm font-bold" id="title">
                  Title
                </span>
                <div
                  className="text-[10px] font-extralight flex flex-col"
                  id="description"
                >
                  <span>13:15</span> {/* Start  date  */}
                  <span>13:45</span>
                  {/* End  date  */}
                </div>
              </div>
            </Card>
          </Card>
        </div>
      </div>
      <div className="flex flex-wrap gap-10 lg:justify-start sm:justify-center ">
        <Line />

        <Card className="shadow-none flex">
          <div className="text-md font-semibold mb-2">Missions Summary</div>
          {/* status{In Progress, In Review, On Hold, Completed} */}
          <div className="flex flex-row flex-wrap gap-4  w-80">
            <div
              className="flex flex-row border border-black p-2 pb-10 rounded-md items-start justify-between w-32"
              id="mission-cart"
            >
              <div className="flex flex-col">
                <span className=" text-lg font-bold">24</span>
                <span className=" text-xs font-semibold">In Progress</span>
              </div>
              <span className="flex text-white justify-center items-center bg-black h-5 w-5 rounded-full ">
                <BsThreeDots />
              </span>
            </div>
            <div
              className="flex flex-row border border-black p-2 pb-10 rounded-md items-start justify-between w-32"
              id="mission-cart"
            >
              <div className="flex flex-col">
                <span className=" text-lg font-bold">24</span>
                <span className=" text-xs font-semibold">In Review</span>
              </div>
              <span className="flex text-white justify-center items-center bg-black h-5 w-5 rounded-full ">
                <BsThreeDots />
              </span>
            </div>
            <div
              className="flex flex-row border border-black p-2 pb-10 rounded-md items-start justify-between w-32"
              id="mission-cart"
            >
              <div className="flex flex-col">
                <span className=" text-lg font-bold">24</span>
                <span className=" text-xs font-semibold">On Hold</span>
              </div>
              <span className="flex text-white justify-center items-center bg-black h-5 w-5 rounded-full ">
                <BsThreeDots />
              </span>
            </div>
            <div
              className="flex flex-row border border-black p-2 pb-10 rounded-md justify-between w-32"
              id="mission-cart"
            >
              <div className="flex flex-col">
                <span className=" text-lg font-bold">24</span>
                <span className=" text-xs font-semibold">Completed</span>
              </div>
              <span className="flex text-white justify-center items-center bg-black h-5 w-5 rounded-full ">
                <BsThreeDots />
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
