import axios from "axios";
export const gazLevel = () => {};
function getData() {
  axios.get("http://localhost:5000/api/measures/").then().catch();
}
