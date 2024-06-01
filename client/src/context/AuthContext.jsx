import React, { createContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedToken =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");
    // console.log(user);
    console.log(storedToken);

    if (storedToken) {
      try {
        const decodedUser = jwtDecode(storedToken);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${storedToken}`;
        return decodedUser.UserInfo;
        // console.log(decodedUser.UserInfo);
      } catch (error) {
        console.error("Token decoding failed:", error);
        localStorage.removeItem("accessToken");
        sessionStorage.removeItem("accessToken");
      }
    } else {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  /**data reviece it { email: "",
    password: "",
    rememberMe: false,} */
  useEffect(() => {
    console.log("auth procees work");
    const storedToken =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");
    // console.log(user);
    if (storedToken) {
      try {
        const decodedUser = jwtDecode(storedToken);
        setUser(decodedUser.UserInfo);
        // console.log(decodedUser.UserInfo);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${storedToken}`;
      } catch (error) {
        console.error("Token decoding failed:", error);
        localStorage.removeItem("accessToken");
        sessionStorage.removeItem("accessToken");
      }
    }
  }, []);
  const login = async (formData) => {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        formData
      );
      // reponse data form { i send only accestoken { user.id, role} }
      const accessToken = response.data.accessToken;
      if (formData.rememberMe) {
        localStorage.setItem("accessToken", accessToken);
      } else {
        sessionStorage.setItem("accessToken", accessToken);
      }
      const decodedUser = jwtDecode(accessToken);
      console.log(decodedUser.UserInfo);
      setUser(decodedUser.UserInfo);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      // setUser(response.data.user);
    } catch (error) {
      console.error("Login failed:", error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/auth/logout", null, {
        withCredentials: true, // Ensure cookies are sent
      });
    } catch (error) {
      console.error("Logout failed:", error.response?.data);
    } finally {
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
      setUser(null);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        formData
      );
      setUser(response.data.user);
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const autoLogin = async (storedToken) => {
    setLoading(true);
    nav("/");
    console.log("autologin");
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      const response = await axios.post(
        "http://localhost:5000/auth/autologin",
        [{ token: storedToken }]
      );
      // console.log(response.data.user);
      setUser(response.data.user);
    } catch (error) {
      console.error("Auto login failed:", error.response.data);
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const authValues = {
    user,
    loading,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};
