import { useState } from "react";
import { Dropdown } from "../../components/Dropdown.jsx";

export const NASSchedule = () => {
  const [selectedSY, setSelectedSY] = useState("");
  const [selectedSem, setSelectedSem] = useState("");
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const sy_options = ["2324", "2223", "2122", "2021"];
  const sem_options = ["First", "Second", "Summer"];

  const initialTimeData = days.map((day) => ({
    hoursStart: "",
    minutesStart: "",
    amPmStart: "AM",
    hoursEnd: "",
    minutesEnd: "",
    amPmEnd: "AM",
    isBroken: false,
  }));

  const [timeData, setTimeData] = useState(initialTimeData);

  const handleSelectSY = (value) => {
    setSelectedSY(value);
  };

  const handleSelectSem = (value) => {
    setSelectedSem(value);
  };

  const handleHoursStartChange = (value, index) => {
    const updatedTimeData = [...timeData];
    updatedTimeData[index].hoursStart = value;
    setTimeData(updatedTimeData);
  };

  const handleMinutesStartChange = (value, index) => {
    const updatedTimeData = [...timeData];
    updatedTimeData[index].minutesStart = value;
    setTimeData(updatedTimeData);
  };

  const handleAmPmStartChange = (value, index) => {
    const updatedTimeData = [...timeData];
    updatedTimeData[index].amPmStart = value;
    setTimeData(updatedTimeData);
  };

  const handleHoursEndChange = (value, index) => {
    const updatedTimeData = [...timeData];
    updatedTimeData[index].hoursEnd = value;
    setTimeData(updatedTimeData);
  };

  const handleMinutesEndChange = (value, index) => {
    const updatedTimeData = [...timeData];
    updatedTimeData[index].minutesEnd = value;
    setTimeData(updatedTimeData);
  };

  const handleAmPmEndChange = (value, index) => {
    const updatedTimeData = [...timeData];
    updatedTimeData[index].amPmEnd = value;
    setTimeData(updatedTimeData);
  };

  const handleBrokenScheduleChange = (isChecked, index) => {
    const updatedTimeData = [...timeData];
    updatedTimeData[index].isBroken = isChecked;
    setTimeData(updatedTimeData);
  };

  const calculateHours = (startHH, startMM, startAP, endHH, endMM, endAP) => {
    if (startHH && startMM && startAP && endHH && endMM && endAP) {
      const startTime = `${startHH}:${startMM} ${startAP}`;
      const endTime = `${endHH}:${endMM} ${endAP}`;
      const startDate = new Date(`1970-01-01 ${startTime}`);
      const endDate = new Date(`1970-01-01 ${endTime}`);
      const hours = (endDate - startDate) / (1000 * 60 * 60);
      return hours;
    }
    return "Invalid Time";
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

          <div className="pt-10">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Broken Sched</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Hours</th>
                </tr>
              </thead>
              <tbody>
                {days.map((day, index) => (
                  <tr key={day}>
                    <td className="text-center p-5">{day}</td>
                    <td className="text-center p-5">
                      <input
                        type="checkbox"
                        onChange={(e) => handleBrokenScheduleChange(e.target.checked, index)}
                        checked={timeData[index].isBroken}
                      />
                    </td>
                    <td className="text-center p-5">
                      <input
                        type="text"
                        placeholder="HH"
                        value={timeData[index].hoursStart}
                        onChange={(e) => handleHoursStartChange(e.target.value, index)}
                        className="w-10"
                      />
                      :
                      <input
                        type="text"
                        placeholder="MM"
                        value={timeData[index].minutesStart}
                        onChange={(e) => handleMinutesStartChange(e.target.value, index)}
                        className="w-10"
                      />
                      <select
                        value={timeData[index].amPmStart}
                        onChange={(e) => handleAmPmStartChange(e.target.value, index)}
                        className="w-16"
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </td>
                    <td className="text-center p-5">
                      <input
                        type="text"
                        placeholder="HH"
                        value={timeData[index].hoursEnd}
                        onChange={(e) => handleHoursEndChange(e.target.value, index)}
                        className="w-10"
                      />
                      :
                      <input
                        type="text"
                        placeholder="MM"
                        value={timeData[index].minutesEnd}
                        onChange={(e) => handleMinutesEndChange(e.target.value, index)}
                        className="w-10"
                      />
                      <select
                        value={timeData[index].amPmEnd}
                        onChange={(e) => handleAmPmEndChange(e.target.value, index)}
                        className="w-16"
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </td>
                    <td className="text-center p-5">
                      {calculateHours(
                        timeData[index].hoursStart,
                        timeData[index].minutesStart,
                        timeData[index].amPmStart,
                        timeData[index].hoursEnd,
                        timeData[index].minutesEnd,
                        timeData[index].amPmEnd
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
