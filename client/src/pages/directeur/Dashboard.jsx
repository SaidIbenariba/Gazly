import { useEffect, useState } from "react";
import Line from "../../pages/Charts/Line";
import { Card } from "@material-tailwind/react";
import { FaFire } from "react-icons/fa";
import { PiLineVertical } from "react-icons/pi";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
// import { PiLineVerticalBold } from "react-icons/pi";
// const formtedDate() { 
  import {toast, ToastContainer} from "react-toastify"; 
// }
const MissionCard = ({ status, number }) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/private/missions/${status}`);
  };

  return (
    <div
      className="flex flex-row border border-black p-2 pb-10 rounded-md items-start justify-between w-32"
      id="mission-cart"
    >
      <div className="flex flex-col">
        <span className=" text-lg font-bold">{number}</span>
        <span className=" text-xs font-semibold">{status}</span>
      </div>
      <span
        className="flex text-white justify-center items-center bg-black h-5 w-5 rounded-full cursor-pointer"
        onClick={handleOnClick}
      >
        <BsThreeDots />
      </span>
    </div>
  );
};
const formateDate = (datetimeString) => { 
  const timeOnly = String(datetimeString).substring(11, 16);
  return timeOnly;
}
const ObservationCard = ({ observation }) => {
//   const [loading, setLoading] = useState(false);
//   const [responsable, setResponsable] = useState("")
//   console.log(observation);
//   useEffect(()=>{
//     setLoading(true);
//  axios.get(`http://localhost:5000/api/users/read/${observation.id_resp}`)
//  .then((res)=>{
//   console.log(res);
//   setResponsable(res.date[0].firstname + " " +res.date[0].lastname);
//  }).catch((err)=>console.log(err))
//  .finally(()=>setLoading(false));
//   })
//   useEffect(()=>{
//     console.log(responsable);
//   },[responsable]); 
// const nav = useNavigate();
// // const handleOnClick = ()=>{
// //   nav("/private/missions/"+ observation.id)
// // }
  return (
      <div className="bg-white rounded-xl shadow-md mb-2 ">
      <div className="md:flex-shrink-0">
        <div className="p-4 flex flex-row gap-2 justify-between items-center">
          <div className="flex flex-col">
          <p className="mt-2 text-gray-700"> {observation.firstname} : </p>
          <p className="mt-2 text-gray-700"> {observation.
workspace_name} : </p>
          </div>
          <p className="mt-2 text-gray-700"> {observation.feedback}</p> 
          <span
        className="flex text-white justify-center items-center bg-black h-5 w-5 rounded-full cursor-pointer"
        // onClick={handleOnClick}
      >
        <BsThreeDots />
      </span>
        </div>
    </div>
  </div>

  );
};

// main component
const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [gazLevel, setGazLevel] = useState(0);
  const [meetings, setMeetings] = useState([]);
  const [observations, setObservations] = useState([]);
  const [missionCounts, setMissionCounts] = useState({
    inProgress: 3,
    inReview: 9,
    onHold: 0,
    completed: 0,
  });
  const { user } = useAuth();

  useEffect(() => {
    console.log(meetings);
  }, [meetings]);
  const nav = useNavigate();
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const missionCountsRes = await axios.get(
          "http://localhost:5000/api/missions/missionCounts"
        );
        setMissionCounts(missionCountsRes.data);

        const meetingsRes = await axios.get(
          "http://localhost:5000/api/meetings/read"
        );
        console.log(meetingsRes.data);
        setMeetings(meetingsRes.data);

        const observationsRes = await axios.get(
          "http://localhost:5000/api/observations/lastest"
        );
        console.log("observaations")
        console.log(observationsRes.data);
        setObservations(observationsRes.data); 
        const gazLevelRes = await axios.get(
          "http://localhost:5000/api/measures/getLastMeasure"
        );
        console.log(gazLevelRes); 
        if(gazLevelRes.data[0].gaz_danger == 1) {
            toast.warning(`gaz_danger in capteur ${gazLevelRes.data[0].id_cap}`); 
        }
        setGazLevel(gazLevelRes.data[0].gazlvl); 
      
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    const fetchMeasure = async () =>{
      try {
         
        const gazLevelRes = await axios.get(
          "http://localhost:5000/api/measures/getLastMeasure"
        );
        setGazLevel(gazLevelRes.data[0].gazlvl); 
      }catch(err) {
        console.log(err); 
      }
    }
    fetchData();
    
    const interval = setInterval(fetchData, 1000); // Fetch data every 30 seconds
    return () => clearInterval(interval);
  }, []);
   useEffect(()=>{
    console.log(gazLevel); 
   }, [gazLevel]); 
  const date = new Date();
  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  const months = [
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
  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const dayOfMonth = date.getDate();
  const formattedDate = `${dayName},${dayOfMonth} ${monthName}`;
  const handleMeetClick = (meet)=>{
    console.log(meet);
   nav(`/private/planning/${meet.start}/${meet.id_ws}/${meet.id_resp}`)
  }
  return (
    <> 
      <ToastContainer/>
      {console.log("Dashboard conpo nent")}
      <div className="flex flex-col gap-10 justify-center items-center lg:items-start">
        <div className="flex flex-col justify-start items-center md:items-start gap-4">
          <div
            className="flex flex-col sm:flex-col md:flex-row justify-center gap-5 w-fit items-center md:items-start "
            id="cart-container"
          >
          {/* <div className="grid sm:grid-col lg:grid-cols-3  grid-rows-1 "> */}
            {/* <div className="flex flex-col flex-wrap justify-start items-start gap-5 w-fit"> */}
            {/* <Card className="flex flex-col p-5 items-start justify-between w-[180px] h-fit">
                <div className="flex flex-row  items-center justify-between w-full">
                  <span className=" font-bold">Gaz Level</span>

                  <span className="bg-gray-100 w-8 h-8 flex items-center justify-center rounded-full text-red-500">
                    <FaFire />
                  </span>
                </div>
                <span className="text-xl font-bold p-0 text-red-500">
                  {gazLevel}
                  {/*unit 
                </span>
                <div className="flex w-full justify-between">
                  <span className=" text-xs font-extralight"> espace1</span>
                  <span className=" text-xs font-extralight"> sensor1</span>
                </div>
              </Card> */}
            <Card className="shadow-none flex ">
              <div className="text-md font-semibold mb-2">Missions Summary</div>
              {/* status{In Progress, In Review, On Hold, Completed} */}
              <div className="grid grid-cols-2 grid-rows-2  gap-4">
                {
                  <MissionCard
                    number={missionCounts.inProgress}
                    status="inProgress"
                  />
                }
                {
                  <MissionCard
                    status="inReview"
                    number={missionCounts.inReview}
                  />
                }
                {<MissionCard status="onHold" number={missionCounts.onHold} />}
                {
                  <MissionCard
                    status="completed"
                    number={missionCounts.completed}
                  />
                }
              </div>
            </Card>
            <div className="flex flex-col md:flex-row gap-4">
            
            {/* </div> */}
            
            <Card className="flex flex-col p-2 gap-1 w-full max-h-80 overflow-y-auto">
             
            <h2 className="text-md font-semibold mb-2">Observation List</h2>
              {/* Observations and Feedback: Include a section for observations and feedback collected from different sources, such as workers `responsable when done a observation can make feedback */}
              <div className="flex flex-col p-2 gap-1 w-full max-h-80 overflow-y-auto">
              {observations.length == 0 ? 
              (
                <p className="font-thin text-red-500 bg-red-100 rounded-md">There are no Observations</p>

              ) : (
                observations.map((observation,index) =>  {
                  return (
                  <ObservationCard
                    key={index}
                    observation={observation}
                  />
                  )
})
              )
            }
            </div>
            </Card>
            <Card className="flex flex-col p-2 gap-1 w-fit h-fit">
              <div className="text-xs font-semi-bold text-yellow-400">
                {formattedDate}
              </div>{" "}
              {meetings.length == 0 ?  (
                <p className="font-thin text-red-500 bg-red-100 rounded-md">There are no meetings</p>
              ):
              (
                meetings.map((meet) => {
                  return (
                    <Card
                      className="flex flex-row items-center rounded-none pr-1 justify-start bg-blue-100 shadow-none w-full"
                      key={meet.id}
                      onClick={()=>handleMeetClick(meet)}
                    >
                      <PiLineVertical size className="h-10  text-blue-400" />
                      <div
                        className="flex flex-row justify-between w-full items-center"
                        id="event-description"
                      >
                        <span className=" text-sm font-bold w-2/3 overflow-hidden text-ellipsis" id="title">
                          {meet.title}
                        </span>
                        <div
                          className=" text-[10px] font-extralight flex flex-col"
                          id="duration"
                        >
                           { meet.end ?
                           <>
                          <span className="font-bold">{formateDate(meet.start)}</span> 
                          <span className="font-bold ">{formateDate(meet.end)}</span> 
                          </> : 
                           <span className="font-bold">All Day</span> 
                           }
                          
                        </div>
                      </div>
                    </Card>
                  );
                })
              )
              }
              
            </Card>
            </div>
          </div>
          <div className="w-full">
            <Line />
            {/* just a graphe were showing some date about level gaz    */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
