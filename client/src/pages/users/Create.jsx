import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Create = () => {
  const [values, setValues] = useState({
    id: "",
    nom: "",
    tel: "",
    ville: "",
    adresse: "",
  });
  const nav = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    console.log(`form submitted`);
    axios
      .post("http://localhost:5000/add_user", values)
      .then((res) => {
        console.log("post sended");
        nav("/users");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <div className="container h-[100vh] w-[100vw] bg-gray-200">
        <h1 className=" text-3xl font-bold text-gray-500">Edit client</h1>
        <div className="flex justify-end">
          <Link
            to="/users"
            className="bg-blue-400 hover:bg-blue-800 text-white px-5 rounded-sm shadow-md"
          >
            Home
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className=" my-5">
            <label htmlFor="id">ID</label>
            <input
              type="text"
              name="id"
              id="id"
              required
              onChange={(e) => {
                setValues({ ...values, id: e.target.value });
              }}
              className=" ml-4 border border-gray-400 rounded-sm"
            />
          </div>
          <div className=" my-5">
            <label htmlFor="nom">Nom</label>
            <input
              type="text"
              name="nom"
              id="nom"
              required
              onChange={(e) => {
                setValues({ ...values, nom: e.target.value });
              }}
              className=" ml-4 border border-gray-400 rounded-sm"
            />
          </div>

          <div className=" my-5">
            <label htmlFor="tel">Tel</label>
            <input
              type="text"
              name="tel"
              id="tel"
              required
              onChange={(e) => {
                setValues({ ...values, tel: e.target.value });
              }}
              className=" ml-4 border border-gray-400 rounded-sm"
            />
          </div>
          <div className=" my-5">
            <label htmlFor="ville">Ville</label>
            <input
              type="text"
              name="ville"
              id="ville"
              onChange={(e) => {
                setValues({ ...values, ville: e.target.value });
              }}
              className=" ml-4 border border-gray-400 rounded-sm"
            />
          </div>
          <div className=" my-5">
            <label htmlFor="adresse">Adresse</label>
            <input
              type="text"
              name="adresse"
              id="adresse"
              onChange={(e) => {
                setValues({ ...values, adresse: e.target.value });
              }}
              className=" ml-4 border border-gray-400 rounded-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-800 text-white px-5 rounded-sm shadow-md"
          >
            save
          </button>
        </form>
      </div>
    </>
  );
};

export default Create;
