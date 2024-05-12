// import React from "react";
"use client";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidbar";
import Loader from "../../components/Loader";
const Users = () => {
  const [data, setData] = useState([]);
  const [Loading, setLoading] = useState();
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        setData(res.data);
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {Loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col justify-center items-end">
          <Link
            to="/users/create"
            className="flex  text-white py-2 px-4 justify-center items-center rounded-md shadow-md bg-blue-500 hover:bg-blue-600"
          >
            {" "}
            Add User +{" "}
          </Link>
          <div className="overflow-x-auto flex items-center justify-center">
            <Table>
              <Table.Head>
                <Table.HeadCell>ID</Table.HeadCell>
                <Table.HeadCell>Nom</Table.HeadCell>
                <Table.HeadCell>Tel</Table.HeadCell>
                <Table.HeadCell>Ville</Table.HeadCell>
                <Table.HeadCell>Adresse</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {data.map((user, index) => {
                  return (
                    <Table.Row
                      key={index}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {user.ID}
                      </Table.Cell>
                      <Table.Cell>{user.Nom}</Table.Cell>
                      <Table.Cell>{user.Tel}</Table.Cell>
                      <Table.Cell>{user.Ville}</Table.Cell>
                      <Table.Cell>{user.Adresse}</Table.Cell>
                      <Table.Cell className="flex justify-between gap-2">
                        <Link
                          to={`/users/edit/${user.ID}`}
                          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                        >
                          Edit
                        </Link>
                        <Link
                          to={`/users/read/${user.ID}`}
                          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                        >
                          Read
                        </Link>
                        <Link
                          to={`/users/delete/${user.ID}`}
                          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                        >
                          Delete
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
