// import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Calendar from "../components/Calendar";
import { useParams } from "react-router-dom";
const Planning = () => {
  const {start, end, id_resp} = useParams();
  return (
    <div>
      <Calendar start={start} end={end} id_resp={id_resp}/>
    </div>
  );
};

export default Planning;
