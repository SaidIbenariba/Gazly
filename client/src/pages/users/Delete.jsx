import Sidebar from "../../components/Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Delete = () => {
  const { id } = useParams();
  //   const [del, setDel] = useState(false);
  const nav = useNavigate();
  const handleDelete = () => {
    axios
      .get("http://localhost:5000/delete_user/" + id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    nav("/users");
  };
  return (
    <>
      <div className="container  flex flex-row">
        <Sidebar />
        <main className="flex items-start justify-center flex-col">
          <div className="rounded-md shadow-md p-20 gap-10" id="delete-cart">
            <h2 className=" mb-10">
              Are you sure you want to delete this user ?{" "}
            </h2>
            <button
              className="px-40 bg-red-500 text-white"
              onClick={handleDelete}
            >
              Yes I want
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default Delete;
