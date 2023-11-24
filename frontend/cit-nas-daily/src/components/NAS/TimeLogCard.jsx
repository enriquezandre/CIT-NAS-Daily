import { useState, useEffect } from "react";
// import { ActivitiesFormModal } from "./ActivitiesFormModal";
import { useParams } from "react-router-dom";
import axios from "axios";

export const TimeLogCard = () => {
  const { nasId } = useParams();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  // const [formIsOpen, setFormIsOpen] = useState(false);
  const [nas, setNas] = useState({});
  // const [inOut, setInOut] = useState("");
  // const [latestEntry, setLatestEntry] = useState("");

  // const openForm = () => {
  //   setFormIsOpen(true);
  // };

  // const closeForm = () => {
  //   setFormIsOpen(false);
  // };

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

  // BIOMETRICS IMPLEMENTATION WILL ALL BE COMMENTED
  // const formatTimeLog = (time) => {
  //   const [hour, minute] = time.split(":");
  //   return `${hour % 12 || 12}:${minute} ${hour < 12 ? "AM" : "PM"}`;
  // };

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

        const response = await api.get(`/NAS/${nasId}/noimg`);
        setNas(response.data);

        // BIOMETRICS IMPLEMENTATION WILL ALL BE COMMENTED
        // const logresponse = await api.get(`BiometricLogs?nasId=${nasId}`);
        // const latestLog = logresponse.data.sort(
        //   (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
        // )[0];
        // if (
        //   new Date(latestLog.dateTime).toLocaleDateString() !==
        //   new Date().toLocaleDateString()
        // ) {
        //   setInOut(""); // Set inOut to an empty string every new day and no record of time in yet
        // } else {
        //   setInOut(latestLog.inOut); // ["DutyOn", "DutyOff", "OvertimeOn", "OvertimeOff"]
        // }
        // setTime(latestLog.dateTime);

        // const activitiesresponse = await api.get(`ActivitiesSummary/${nasId}`);
        // const activities = activitiesresponse.data;
        // if (activities.length > 0) {
        //   // Sort the activities by 'dateOfEntry' in descending order
        //   activities.sort(
        //     (a, b) => new Date(b.dateOfEntry) - new Date(a.dateOfEntry)
        //   );

        //   setLatestEntry(activities[0].dateOfEntry);
        //   console.log(inOut);
        // } else {
        //   console.log("No activities found");
        // }
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
          <div>
            {/* BIOMETRICS IMPLEMENTATION WILL ALL BE COMMENTED
            <div className="mt-10 mr-28 text-2xl font-bold text-gray">
              {inOut === "DutyOn"
                ? "TIMED IN: " + formatTimeLog(time.split("T")[1])
                : inOut === "DutyOff"
                ? "TIMED OUT: " + formatTimeLog(time.split("T")[1])
                : inOut === "OvertimeOn"
                ? "OVERTIME IN: " + formatTimeLog(time.split("T")[1])
                : inOut === "OvertimeOff"
                ? "OVERTIME OUT: " + formatTimeLog(time.split("T")[1])
                : "NOT YET TIMED IN"}
            </div>
            This will show only if user has already have a record on time-out on the current day */}
            {/* <div className="mt-7 text-xl">
              {inOut === "DutyOff" &&
              new Date(latestEntry).toLocaleDateString().split("T")[0] !==
                new Date().toLocaleDateString().split("T")[0] ? (
                <>
                  <button
                    onClick={openForm}
                    className="bg-primary text-white py-2 px-4 rounded"
                  >
                    Fill-up Activities Form
                  </button>
                  <ActivitiesFormModal
                    isOpen={formIsOpen}
                    closeModal={closeForm}
                  />
                </>
              ) : null}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
