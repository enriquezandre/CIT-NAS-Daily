import { useState } from "react";
import { Dropdown } from "../../components/Dropdown.jsx";

export const NASSchedule = () => {
  const [selectedSY, setSelectedSY] = useState("");
  const [selectedSem, setSelectedSem] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const isBrokenSched = false;
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const sy_options = ["2324", "2223", "2122", "2021"];
  const sem_options = ["First", "Second", "Summer"];

  const handleSelectSY = (value) => {
    setSelectedSY(value);
  };

  const handleSelectSem = (value) => {
    setSelectedSem(value);
  };

  const handleSelectStartTime = (value) => {
    setStartTime(value);
  };

  const handleSelectEndTime = (value) => {
    setEndTime(value);
  };

  const handleBrokenSchedChange = (value) => {
    // Handle the change of broken schedule status here
  };

  const calculateHours = () => {
    const start = new Date("1970-01-01 " + startTime);
    const end = new Date("1970-01-01 " + endTime);
    const hours = (end - start) / (1000 * 60 * 60);
    return hours;
  };

  return (
    <div className="justify-center w-full h-full items-center border border-solid rounded-lg">
      <div className="m-3">
        <div className="m-2">
          <div className="flex mt-2 ml-2">
            <div className="w-48 z-10">
              SY: <Dropdown options={sy_options} onSelect={handleSelectSY} />
              <p className="mt-4">Selected Value: {selectedSY}</p>
            </div>
            <div className="w-56 z-10">
              SEMESTER:{" "}
              <Dropdown options={sem_options} onSelect={handleSelectSem} />
              <p className="mt-4">Selected Value: {selectedSem}</p>
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr>
                <th>Day</th>
                <th>Broken Sched?</th>
                <th>Start time</th>
                <th>End time</th>
                <th>Hours</th>
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day}>
                  <td className="text-center">{day}</td>
                  <td className="text-center">
                    <label>
                      <input
                        type="radio"
                        name={`${day}_brokenSched`}
                        value="yes"
                        onChange={() => handleBrokenSchedChange("yes")}
                        checked={isBrokenSched}
                      />{" "}
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`${day}_brokenSched`}
                        value="no"
                        onChange={() => handleBrokenSchedChange("no")}
                        checked={!isBrokenSched}
                      />{" "}
                      No
                    </label>
                  </td>
                  <td className="text-center">
                    <Dropdown
                      options={["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM"]}
                      onSelect={handleSelectStartTime}
                    />
                  </td>
                  <td className="text-center">
                    <Dropdown
                      options={["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM"]}
                      onSelect={handleSelectEndTime}
                    />
                  </td>
                  <td className="text-center">{calculateHours()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
