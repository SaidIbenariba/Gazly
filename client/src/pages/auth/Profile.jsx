import React, { useEffect, useState } from "react";
import { Card, Button, Typography } from "@material-tailwind/react";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { useParams } from "react-router-dom";
const Profile = () => {
  // const { id } = useParams(); // Get user ID from URL params
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [loading, setLoading] = useState();
  const [userData, setUserData] = useState();
  // console.log(user);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/read/${user.id}`
        );

        setUserData(response.data[0]);
        console.log(response.data);
      } catch (err) {
        setError(err.message);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  console.log(userData);
  return (
    <></>
    // <div className="flex flex-col items-center justify-center mt-10">
    //   <Card className="p-6 w-full max-w-md">
    //     <div className="flex flex-col items-center">
    //       <img
    //         className="h-32 w-32 rounded-full"
    //         src={user.avatar || "https://via.placeholder.com/150"}
    //         alt={`${userData.name}'s avatar`}
    //       />
    //       <Typography variant="h5" className="mt-4">
    //         {user.name}
    //       </Typography>
    //       <Typography className="text-gray-600">{userData.email}</Typography>
    //       <Typography className="text-gray-600 mt-2">
    //         {userData.role}
    //       </Typography>
    //       <Button
    //         className="mt-6"
    //         color="blue"
    //         onClick={() => alert("Edit Profile clicked")}
    //       >
    //         Edit Profile
    //       </Button>
    //     </div>
    //   </Card>
    // </div>
  );
};

export default Profile;
