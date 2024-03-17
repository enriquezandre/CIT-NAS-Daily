import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const Homepage = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [firstName, setFirstName] = useState("");
  const { nasId } = useParams();
  const { superiorId } = useParams();
  const url = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    // Update the current date and time every second
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const formatDay = (date) => {
    const options = {
      weekday: "long",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString();
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const api = axios.create({
          baseURL: `${url}/api`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const userResponse = await api.get(`/Users/currentUser`);
        const userRole = userResponse.data.role;
        switch (userRole) {
          case "NAS": {
            const nasResponse = await api.get(`/NAS/${nasId}/noimg`);
            setFirstName(nasResponse.data.firstName);
            break;
          }
          case "Superior": {
            const superiorResponse = await api.get(`/Superiors/${superiorId}`);
            setFirstName(superiorResponse.data.firstName);
            break;
          }
          default:
            setFirstName("");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  });

  return (
    <div className="bg-[url('/src/assets/glebuilding.png')] bg-cover bg-center rounded p-10 md:h-screen">
      <div
        className="text-2xl sm:text-4xl lg:text-5xl text-wrap font-bold mb-5 sm:mb-10 text-primary"
        style={{ textTransform: "capitalize" }}
      >
        Hello, {firstName}
      </div>
      <div className="border-l-2 border-primary">
        <div className="text-xl ml-4 sm:text-2xl">
          <div>{formatDay(currentDateTime)}</div>
          <div>{formatDate(currentDateTime)}</div>
          <div>{formatTime(currentDateTime)}</div>
        </div>
      </div>
    </div>
  );
};
