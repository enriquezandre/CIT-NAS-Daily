import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "flowbite-react";
import axios from "axios";

export const Header = () => {
  const navigate = useNavigate(); // Create a history object to navigate

  const [nas, setNas] = useState({});

  const handleLogout = () => {
    // Clear the authentication token from local storage
    localStorage.removeItem("token");
    // Redirect the user to the login page
    navigate("/");
  };

  useEffect(() => {
    const fetchNas = async () => {
      try {
        // Create an Axios instance with the Authorization header
        const api = axios.create({
          baseURL: "https://localhost:7001/api",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const response = await api.get(`/NAS/1`);
        console.log(response);
        setNas(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNas();
  }, []);

  return (
    <>
      <div className="flex mt-5 ml-10 items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4">
            <Avatar alt={nas.fullName} img={nas.image} rounded />
          </div>
          <div className="text-base" style={{ textTransform: "capitalize" }}>
            {nas.fullName}
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
