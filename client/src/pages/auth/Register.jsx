import { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
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
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("http://localhost:5000/auth/register", values)
  //     .then((res) => nav("/login"))
  //     .catch((err) => {
  //       setError(err);
  //     });
  // };
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
    } catch (error) {
      // Handle registration error
    }
  };

  return (
    <>
      {loading ? (
        <Spinner /> // Show spinner while loading
      ) : (
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="phoneNumber" value="phoneNumber" />
                </div>
                <TextInput
                  id="phoneNumber"
                  type="number"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="lastName" value="lastName" />
                </div>
                <TextInput
                  id="lastName"
                  type="text"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="firstName" value="firstName" />
                </div>
                <TextInput
                  id="firstName"
                  type="text"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <Button type="submit">Sign up</Button>
              {error && error.response.data}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default register;
