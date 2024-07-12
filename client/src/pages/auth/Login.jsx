import {
  Input,
  Typography,
  Card,
  Button,
  Checkbox,
  Spinner,
  // Label,
} from "@material-tailwind/react";
import {Label} from "flowbite-react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";

const Login = () => {
  const [error, setError] = useState(null);
  const { login, loading } = useAuth();
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      nav("/");
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Spinner />
        </div>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <Card className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
            <Typography variant="h5" className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800 mb-5">
              Login To Your Account
            </Typography>
            <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="email1" value="Your email" />
                <Input
                  id="email1"
                  type="email"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  className="input"
                  placeholder="name@mail.com"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  // required
                />
              </div>
              <div>
                <Label htmlFor="password1" value="Your password" />
                <Input
                  id="password1"
                  type="password"
                  className="input"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  placeholder="*******"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  // required
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  // className="input"
                  checked={formData.rememberMe}
                  onChange={() => setFormData({ ...formData, rememberMe: !formData.rememberMe })}
                />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <Button type="submit" size="sm" className="w-full mt-4">
                Log in
              </Button>
              {error && <Typography variant="small" className="text-red-400 mt-2">{error}</Typography>}
            </form>
          </Card>
        </div>
      )}
    </>
  );
};

export default Login;
