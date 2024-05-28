import Map from "../components/Map";
import { Card, Spinner } from "@material-tailwind/react";
import { IoCheckmarkOutline } from "react-icons/io5";
import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { IoIosRefresh } from "react-icons/io";
import { IoHourglassOutline } from "react-icons/io5";
import profile from "../assets/22_Profile.jpg";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// const espace = createContext({id:});
const status = ({ status }) => {
  switch (status) {
    case "completed":
      return (
        <span className="text-xl ">
          <IoCheckmarkOutline color="black" fontSize="4em" strokeWidth="1" />
        </span>
      );
    case "pending":
      return (
        <span className="text-xl">
          <IoHourglassOutline color="black" fontSize="4em" strokeWidth="1" />
        </span>
      );
  }
};
const formattedDate = ({ date }) => {
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
  return formattedDate;
};
const ObservationCard = ({ observation }) => {
  <Card className="bg-green-400 rounded-sm flex-row items-center justify-between p-2">
    <Link to={`/obervations/observation:${observation.id}`}>
      <div className="flex flex-row items-start gap-5" id="profile">
        <div className="" id="responsable-image">
          <img
            className="w-[100px] h-[100px] "
            src={profile}
            alt="just profile"
          />
        </div>
        <div className="flex flex-col text-text" id="information">
          <span className=" text-lg font-bold"> {observation.responsable}</span>
          <span> {observation.espace} </span>
        </div>
        <div className="flex flex-col text-text" id="description">
          <span className=" text-lg font-bold"> {observation.feedback}</span>
          <span> {formattedDate(observation.date)} </span>
        </div>
      </div>
      <div id="status">
        {/* Obeservation status 
              { done vert color, in progress } */}
        {/* { switch ()} */}
        {status(observation.status)}
      </div>
    </Link>
  </Card>;
};
// main component
const Espaces = () => {
  const [observations, setObservations] = useState([]);
  const [espaces, setEspaces] = useState([
    {
      position: [34.030795, -6.842883],
      name: "Factory 1",
      id: 1,
      observations: [{ responsable: { firstname, lastname }, feedback }],
    },
    { position: [34.023431, -6.855104], name: "Factory 2", id: 2 },
    { position: [34.022029, -6.817465], name: "Factory 3" },
    { position: [34.0123, -6.8245], name: "OMCo Factory" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:5000/api/observations/latest")
      .then((res) => {
        setObservations(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    axios
      .get("http://localhost:5000/api/espaces")
      .then((res) => {
        setEspaces(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  const handleEspaceClick = (selectedEspace) => {
    // e.preventDefault();
    setIsLoading(true);
    console.log(selectedEspace);
    axios
      .get(
        `http://localhost:5000/api/observations/getObservationsOf/${selectedEspace.id}`
      )
      .then((res) => {
        setObservations(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center">{<Spinner />}</div>
      ) : (
        <div className="w-full flex flex-col  gap-5">
          <div className="flex flex-row w-full md:w-72">
            <form className=" w-11/12 md:10/12">
              <Input
                label="Search"
                className="flex flex-col justify-center items-center rounded-r-none border-r-0"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                placeholder="search..."
                // onChange={(e) => {
                //   setSearch(e.target.value);
                // }}
              />
            </form>
            <div className="w-1/12 md:w-[40px] flex justify-center items-center bg-black  text-white cursor-pointer rounded-r-md ">
              <IoIosRefresh />
            </div>
          </div>
          <div className="flex  gap-4 flex-col md:flex-row xl:h-[80vh]  ">
            {/* <h2 className="h2 xl:">Observation List</h2> */}

            <div className="h-full">
              {observations.length != 0 ? (
                <div
                  className="overflow-y-scroll h-[50vh] xl:h-full flex flex-col gap-2 "
                  id="cart-container"
                >
                  {observations.map((observation) => {
                    <ObservationCard
                      observation={observation}
                      key={observation.id}
                    />;
                  })}
                </div>
              ) : (
                <p className="text-red-400 bg-red-50 pl-4 rounded-md">
                  No observation for this espace
                </p>
              )}
            </div>
            {/* <div className=" md:h-screen"> */}
            <h2 className="h2 mt-20 block md:hidden">Factory Map</h2>
            <Map espaces={espaces} onEspaceClick={handleEspaceClick} />
            {/* when i click on espace in map i want to show all obervations related to it  */}
            {/* </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Espaces;
