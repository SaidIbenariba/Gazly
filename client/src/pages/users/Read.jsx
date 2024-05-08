// import React from "react";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Read = () => {
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
  return (
    <>
      <div className="overflow-x-auto flex flex-col justify-center items-center w-[100vw] h-[100vh] gap-3">
        <Link
          to={`/users`}
          className="bg-blue-400 hover:bg-blue-800 text-white px-5 rounded-sm shadow-md"
        >
          back home
        </Link>
        <div className="bg-gray-100 p-5 rounded-md shadow-lg" id="user-cart">
          <ul>
            <li>
              <span className="font-bold">ID : </span>
              {id}
            </li>
            <li>
              {" "}
              <span className="font-bold">Nom : </span>
              {values.nom}
            </li>
            <li>
              {" "}
              <span className="font-bold">Tel : </span>
              {values.tel}
            </li>
            <li>
              {" "}
              <span className="font-bold">Ville : </span>
              {values.ville}
            </li>
            <li>
              {" "}
              <span className="font-bold">Adresse : </span>
              {values.adresse}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Read;
