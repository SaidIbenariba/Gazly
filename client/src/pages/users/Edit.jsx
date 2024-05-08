import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const Create = () => {
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:5000/read_user/" + id)
      .then((res) => {
        setValues({
          ...values,
          nom: res.data[0].Nom,
          tel: res.data[0].Tel,
          ville: res.data[0].Ville,
          adresse: res.data[0].Adresse,
        });
        console.log(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);
  const [values, setValues] = useState({
    nom: "",
    tel: "",
    ville: "",
    adresse: "",
  });
  const nav = useNavigate();
  function handleUpdate(e) {
    e.preventDefault();
    console.log(`form submitted`);
    axios
      .post("http://localhost:5000/edit_user/" + id, values)
      .then((res) => {
        console.log(res);
        nav("/users");
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
        <form onSubmit={handleUpdate}>
          <div className=" my-5">
            <label htmlFor="nom">Nom</label>
            <input
              type="text"
              name="nom"
              id="nom"
              value={values.nom}
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
              value={values.tel}
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
              value={values.ville}
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
              value={values.adresse}
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
