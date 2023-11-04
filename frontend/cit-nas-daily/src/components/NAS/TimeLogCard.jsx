import { useState, useEffect } from "react";
import { ActivitiesFormModal } from "./ActivitiesFormModal";
import { useParams } from "react-router-dom";
import axios from "axios";

export const TimeLogCard = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [formIsOpen, setFormIsOpen] = useState(false);
  const { nasId } = useParams();
  const [nas, setNas] = useState({});

  const openForm = () => {
    setFormIsOpen(true);
  };

  const closeForm = () => {
    setFormIsOpen(false);
  };

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
    const fetchNas = async () => {
      try {
        // Create an Axios instance with the Authorization header
        const api = axios.create({
          baseURL: "https://localhost:7001/api",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const response = await api.get(`/NAS/${nasId}`);
        console.log(response);
        setNas(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNas();
  }, [nasId]);

  return (
    <div className="flex justify-center items-center mx-1 mb-6">
      <div className="bg-[url('/src/assets/glebuilding.png')] bg-cover bg-center rounded h-screen w-screen">
        <div className="flex items-center justify-between">
          <div className="ml-10 mt-10">
            <div
              className="text-5xl font-bold mb-10 text-primary"
              style={{ textTransform: "capitalize" }}
            >
              Hello, {nas.firstName}
            </div>
            <div className="border-l-2 border-primary">
              <div className="text-2xl ml-4">
                <div>{formatDay(currentDateTime)}</div>
                <div>{formatDate(currentDateTime)}</div>
                <div>{formatTime(currentDateTime)}</div>
              </div>
            </div>
          </div>
          {/* To be implemented: From biometrics, read time-in log and show here */}
          <div>
            <div className="mt-10 mr-28 text-2xl font-bold text-gray">
              NOT YET TIMED IN
            </div>
            {/* To be implemented: This will show only if naka time out na */}
            <div className="mt-7 text-xl">
              <button
                onClick={openForm}
                className="bg-primary text-white py-2 px-4 rounded"
              >
                Fill-up Activities Form
              </button>
              <ActivitiesFormModal isOpen={formIsOpen} closeModal={closeForm} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
