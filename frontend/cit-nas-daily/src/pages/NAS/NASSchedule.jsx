import { useState } from "react";
import { Dropdown } from "../../components/Dropdown.jsx";

export const NASSchedule = () => {
  const [selectedSY, setSelectedSY] = useState("");
  const [selectedSem, setSelectedSem] = useState("");
  const [schedule, setSchedule] = useState({
    Monday: { start: "", end: "" },
    Tuesday: { start: "", end: "" },
    Wednesday: { start: "", end: "" },
    Thursday: { start: "", end: "" },
    Friday: { start: "", end: "" },
    Saturday: { start: "", end: "" },
  });

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const sy_options = ["2324", "2223", "2122", "2021"];
  const sem_options = ["First", "Second", "Summer"];

  const handleSelectSY = (value) => {
    setSelectedSY(value);
  };

  const handleSelectSem = (value) => {
    setSelectedSem(value);
  };

  const handleStartTimeChange = (day, value) => {
    setSchedule({ ...schedule, [day]: { ...schedule[day], start: value } });
  };

  const handleEndTimeChange = (day, value) => {
    setSchedule({ ...schedule, [day]: { ...schedule[day], end: value } });
  };

  // Function to calculate duty hours for a day
  const calculateDutyHours = (day) => {
    const startTime = schedule[day].start;
    const endTime = schedule[day].end;
    
    if (startTime && endTime) {
      const startHour = parseInt(startTime.split(":")[0]);
      const startMinute = parseInt(startTime.split(":")[1]);
      const endHour = parseInt(endTime.split(":")[0]);
      const endMinute = parseInt(endTime.split(":")[1]);
      
      const totalMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
      const totalHours = totalMinutes / 60;
      return totalHours;
    }
    
    return 0;
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
          {/* Start of schedule table */}
          <div className="pt-10"> 
            <table className="w-full">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Broken Schedule?</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Total Hours</th>
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr key={day}>
                    <td className="text-center pt-5">{day}</td>
                    <td className="text-center">yes</td>
                    <td className="text-center">
                      <input
                        type="time"
                        value={schedule[day].start}
                        onChange={(e) => handleStartTimeChange(day, e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="time"
                        value={schedule[day].end}
                        onChange={(e) => handleEndTimeChange(day, e.target.value)}
                      />
                    </td>
                    <td className="text-center">{calculateDutyHours(day)} hours</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* End of schedule table */}
        </div>
      </div>
    </div>
  );
};
