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
const MissionCard = ({ status, number }) => {
  return (
    <div
      className="flex flex-row border border-black p-2 pb-10 rounded-md items-start justify-between w-32"
      id="mission-cart"
    >
      <div className="flex flex-col">
        <span className=" text-lg font-bold">{number}</span>
        <span className=" text-xs font-semibold">{status}</span>
      </div>
      <span className="flex text-white justify-center items-center bg-black h-5 w-5 rounded-full cursor-pointer">
        <BsThreeDots />
      </span>
    </div>
  );
};
const ObservationCard = ({ observation }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:h-full md:w-48"
            src="https://plus.unsplash.com/premium_photo-1661962751752-cbf6a170c837?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b2JzZXJ2YXRpb24lMjBmYWN0b3J5fGVufDB8fDB8fHww"
            alt="Observation"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Observation
          </div>
          <p className="mt-2 text-gray-500">{observation.date}</p>
          <p className="mt-2 text-gray-500">{observation.sujet}</p>
          <div className="mt-4">
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              View more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// main component
const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [gazLevel, setGazLevel] = useState(0);
  const [missions, setMissions] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [observations, setObservations] = useState([]);
  const [refresh, setRefresh] = useState(false);
  // date
  let date = new Date();

  // Define arrays for days and months
  let days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  let months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  // Get day, month, and date
  let dayName = days[date.getDay()];
  let monthName = months[date.getMonth()];
  let dayOfMonth = date.getDate();

  // Format the date string
  let formattedDate = `${dayName},${dayOfMonth} ${monthName}`;
  // end date
  //  group mission by status
  let missionInProgress = 0;
  let missionOnHold = 0;
  let missionInReview = 0;
  let missionCompleted = 0;
  missions.forEach((mission) => {
    switch (mission.status) {
      case "In Progress":
        missionInProgress++;
        break;
      case "In Review":
        missionInReview++;
        break;
      case "On Hold":
        missionOnHold++;
        break;
      case "Completed":
        missionCompleted++;
        break;
    }
  });
  // end
  // setInterval(() => {
  //   setLoading(true);
  //   axios
  //     .get("http://localhost:5000/api/measures/getLastMeasure")
  //     .then((res) => {
  //       setGazLevel(res.data[0]), setLoading(false);
  //     })
  //     .catch((err) => console.log(err), setLoading(false));
  // }, 30000);

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get("http://localhost:5000/api/missions/getMissionsForDir" + dirId)
  //     .then((res) => {
  //       setMissions(res.data), setLoading(false);
  //     })
  //     .catch((err) => console.log(err), setLoading(false));

  //   axios
  //     .get("http://localhost:5000/api/meetings/getMeetingsForDir/" + dirId) // i want data for current day
  //     .then((res) => {
  //       setMeetings(res.data), setLoading(false);
  //     })
  //     .catch((err) => console.log(err), setLoading(false));

  //   setLoading(false);
  //   // setRefresh(false);
  // }, []);

  return (
    <div className="flex flex-col gap-10 justify-center items-center">
      <div className="flex flex-col justify-start items-start">
        <div
          className="flex flex-col-reverse sm:flex-row flex-wrap justify-center gap-5 w-fit"
          id="cart-container"
        >
          <div className="flex flex-col flex-wrap justify-start gap-5 w-fit">
            <Card className="flex flex-col p-5 items-start justify-between w-[180px] h-fit">
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

            <Card className="flex flex-col p-2 gap-1 h-fit w-fit">
              <div className="text-xs font-semi-bold text-yellow-400">
                {formattedDate}
              </div>{" "}
              {meetings.map((meet) => {
                return (
                  <Card
                    className="flex flex-row items-center rounded-none pr-1 justify-start bg-blue-100 shadow-none w-fit"
                    key={meet.id}
                  >
                    <PiLineVertical size className="h-10  text-blue-400" />
                    <div
                      className="flex flex-row gap-10 items-center "
                      id="event-description"
                    >
                      <span className=" text-sm font-bold" id="title">
                        Object
                      </span>
                      <div
                        className=" text-[10px] font-extralight flex flex-col"
                        id="duration"
                      >
                        <span>13:15</span> {/* Start  date  */}
                        <span>13:45</span>
                        {/* End  date  */}
                      </div>
                    </div>
                  </Card>
                );
              })}
              <Card className="flex flex-row items-center rounded-none pr-1 justify-start bg-yellow-100 shadow-none w-[165px]">
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
          <Card className="shadow-none flex ">
            <div className="text-md font-semibold mb-2">Missions Summary</div>
            {/* status{In Progress, In Review, On Hold, Completed} */}
            <div className="flex flex-row flex-wrap gap-4  w-80">
              {<MissionCard status="In Progress" number={missionInProgress} />}
              {<MissionCard status="In Review" number={missionInReview} />}
              {<MissionCard status="On Hold" number={missionOnHold} />}
              {<MissionCard status="Completed" number={missionCompleted} />}
            </div>
          </Card>
        </div>
        <div className="flex flex-wrap gap-10 justify-start ">
          <Line />

          <Card>
            <h2>Observation List</h2>
            {/* Observations and Feedback: Include a section for observations and feedback collected from different sources, such as workers `responsable when done a observation can make feedback */}
            {observations.map((observation) => {
              <ObservationCard
                key={observation.id}
                observation={observation}
              />;
            })}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
