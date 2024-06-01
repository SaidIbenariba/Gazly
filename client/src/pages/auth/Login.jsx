import { Button, Checkbox, Label, TextInput } from "flowbite-react";
// import login from "../../assets/login.jpg";
import { Spinner } from "@material-tailwind/react";
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
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
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
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={formData.rememberMe}
                  onChange={() => {
                    setFormData({
                      ...formData,
                      rememberMe: !formData.rememberMe,
                    });
                  }}
                />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <Button className="button" type="submit">
                Log in
              </Button>
              <span className="text-red-400">{error && error}</span>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
