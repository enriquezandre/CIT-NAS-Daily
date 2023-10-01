import { useState, useEffect } from "react";

export const TimeLogCard = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

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

  return (
    <div className="flex justify-center items-center mx-14 mb-6">
      <div className="bg-[url('/src/assets/glebuilding.png')] bg-cover bg-center rounded h-screen w-screen">
        <div className="ml-10 mt-10">
          <div className="text-5xl font-bold mb-10 text-primary">
            Hello, NAS Name!
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
  );
};
