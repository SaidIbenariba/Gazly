import { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// use replace property when pop up succesful register if user comeback don't show them again register  can go to login
const register = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [error, setError] = useState();
  const nav = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/register", values)
      .then((res) => nav("/"))
      .catch((err) => {
        setError(true);
      });
  };
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
          <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800 mb-5">
            Login To Your Account
          </div>
          <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
              </div>
              <TextInput
                id="email1"
                type="email"
                placeholder="name@mail.com"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Your password" />
              </div>
              <TextInput
                id="password1"
                type="password"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button type="submit">Sign up</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default register;
