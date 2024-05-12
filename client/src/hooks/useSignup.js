import { useState } from "react";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import { useAuth } from "./useAuth";
import axios from "axios";
export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuth();
  const signup = async (values) => {
    setIsLoading(true);
    setError(null);
    axios
      .post("http://localhost:5000/login", values)
      .then((res) => {
        // save use to localStorage  if he check remember
        localStorage.setItem("user", JSON.stringify(res.data[0]));
        dispatch({ type: "LOGIN", payload: res.data[0] });
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err), setIsLoading(false);
      });
    return { signup, isLoading, error };
  };
};
