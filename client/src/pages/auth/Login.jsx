import { Button, Checkbox, Label, TextInput } from "flowbite-react";
// import login from "../../assets/login.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const { setIsLoggedIn } = useAuth();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const nav = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:5000/auth/login", login)
      .then((res) => {
        console.log(res);
        // setMessage(message);
        setIsLoggedIn(true);
        nav(`/admin`);
      })
      .catch((err) => {
        setError(err);
        setMessage(err.message.data);
        // setIsLoggedIn(false);
      });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800 mb-5">
          Login To Your Account
        </div>
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@mail.com"
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
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
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button type="submit">Log in</Button>
          <span className="text-blue-500">{error && message}</span>
        </form>
      </div>
    </div>
  );
};

export default Login;
