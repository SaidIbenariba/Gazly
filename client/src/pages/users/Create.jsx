import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Input,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import Button from "../../components/Button";
const Create = () => {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const nav = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    console.log(`form submitted`);
    axios
      .post("http://localhost:5000/api/users/create", values)
      .then((res) => {
        nav("/admin/users");
      })
      .catch((err) => setErr(err));
  }
  return (
    <>
      <div className=" flex flex-col h-[100vh] p-2 items-center">
        <div className="flex flex-col ">
          <nav className="flex justify-between">
            <h1 className=" text-3xl font-bold text-text dark:text-text">
              Add User
            </h1>
            <Link to="/users" className="button">
              Home
            </Link>
          </nav>
          <Card color="transparent" className="w-fit p-5" shadow={true}>
            <form className="mt-2 mb-2 w-80 sm:w-96" onSubmit={handleSubmit}>
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  FirstName
                </Typography>
                <Input
                  size="lg"
                  className="input"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={(e) =>
                    setValues({ ...values, firstname: e.target.value })
                  }
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  LastName
                </Typography>
                <Input
                  size="lg"
                  className="input"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={(e) =>
                    setValues({ ...values, lastname: e.target.value })
                  }
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Email
                </Typography>
                <Input
                  type="email"
                  size="lg"
                  placeholder="name@mail.com"
                  className=" input"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  password
                </Typography>
                <Input
                  type="password"
                  size="lg"
                  placeholder="******"
                  className="input"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                />

                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Role
                </Typography>
                <Select
                  className=" input"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={(value) => setValues({ ...values, role: value })}
                >
                  <Option value="admin">Admin</Option>
                  <Option value="responsable">Responsable</Option>
                  <Option value="ouvrier">Ouvrier</Option>
                </Select>
              </div>
              <Button
                type="submit"
                className="button w-full mt-10"
                text="save"
              />
              <span className="text-red">{err && err.message}</span>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Create;
