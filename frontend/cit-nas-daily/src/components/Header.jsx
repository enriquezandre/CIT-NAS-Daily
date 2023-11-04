/* eslint-disable no-case-declarations */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "flowbite-react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const Header = () => {
  const navigate = useNavigate();
  const { nasId } = useParams();
  const [user, setUser] = useState({});

  const handleLogout = () => {
    // Clear the authentication token from local storage
    localStorage.removeItem("token");
    // Redirect the user to the login page
    navigate("/");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Create an Axios instance with the Authorization header
        const api = axios.create({
          baseURL: "https://localhost:7001/api",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const userResponse = await api.get(`/Users/currentUser`);
        const userId = userResponse.data.id;

        const userDataResponse = await api.get(`/Users/${userId}`);
        const userRole = userDataResponse.data.role;

        switch (userRole) {
          case "NAS":
            const nasResponse = await api.get(`/NAS/${nasId}`);
            setUser(nasResponse.data);
            break;
          case "OAS": //PLACEHOLDER
            const oasResponse = await api.get(`/OAS/1`);
            setUser(oasResponse.data);
            break;
          case "Superior":
            const superiorResponse = await api.get(`/Superior/1`);
            setUser(superiorResponse.data);
            break;
          default:
            console.log("Unknown role");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [nasId]);

  return (
    <>
      <div className="flex mt-5 ml-10 items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4">
            <Avatar alt={user.fullName} img={user.image} rounded />
          </div>
          <div className="text-base" style={{ textTransform: "capitalize" }}>
            {user.fullName}
          </div>
        </div>
        <button className="text-base text-red-500 mr-10" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <hr className="my-5 border-t-2 border-gray-300 ml-7 mr-7" />
    </>
  );
};
