import { useState, useEffect } from "react";
import axios from "axios";

export const Homepage = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [user, setUser] = useState({});

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
          baseURL: "https://localhost:7001/api",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const response = await api.get(`/Users/currentUser`);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  });

  return (
    <div className="flex justify-center items-center mb-6">
      <div className="bg-[url('/src/assets/glebuilding.png')] bg-cover bg-center rounded h-screen w-screen">
        <div className="flex items-center justify-between">
          <div className="ml-10 mt-10">
            <div
              className="text-5xl font-bold mb-10 text-primary"
              style={{ textTransform: "capitalize" }}
            >
              Hello, {user.username}
            </div>
            <div className="border-l-2 border-primary">
              <div className="text-2xl ml-4">
                <div>{formatDay(currentDateTime)}</div>
                <div>{formatDate(currentDateTime)}</div>
                <div>{formatTime(currentDateTime)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
