import React, { useEffect, useState } from "react";
import { Card, Button, Typography, Input, Spinner } from "@material-tailwind/react";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams(); // Get user ID from URL params
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: ""
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `/api/users/read/${user.id}`
        );
        setUserData(response.data[0]);
        setFormData({
          firstname: response.data[0].firstname,
          lastname: response.data[0].lastname,
          email: response.data[0].email,
          role: response.data[0].role
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/users/edit/${user.id}`,
        formData
      );
      setUserData(response.data);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <Card className="p-6 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
            className="h-32 w-32 rounded-full"
            src={userData?.avatar || "https://via.placeholder.com/150"}
            alt={`${userData?.firstname} ${userData?.lastname}'s avatar`}
          />
          <Typography variant="h5" className="mt-4">
            {userData?.firstname} {userData?.lastname}
          </Typography>
          <Typography className="text-gray-600">{userData?.email}</Typography>
          <Typography className="text-gray-600 mt-2">
            Role: {userData?.role}
          </Typography>
          <Button
            className="mt-6"
            color="blue"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
          {isEditing && (
            <form onSubmit={handleSubmit} className="mt-6 w-full">
              <div className="flex flex-col gap-4">
                <Input
                  type="text"
                  name="firstname"
                  label="First Name"
                  value={formData.firstname}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  name="lastname"
                  label="Last Name"
                  value={formData.lastname}
                  onChange={handleChange}
                />
                <Input
                  type="email"
                  name="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  name="role"
                  label="Role"
                  value={formData.role}
                  onChange={handleChange}
                />
                <Button type="submit" color="green">
                  Save Changes
                </Button>
              </div>
            </form>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Profile;
