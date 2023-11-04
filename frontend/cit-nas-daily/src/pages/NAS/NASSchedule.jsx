import { useState } from "react";
import { Dropdown } from "../../components/Dropdown.jsx";

export const NASSchedule = () => {
  const [selectedSY, setSelectedSY] = useState("");
  const [selectedSem, setSelectedSem] = useState("");
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const sy_options = ["2324", "2223", "2122", "2021"];
  const sem_options = ["First", "Second", "Summer"];

  const initialTimeData = days.map((day) => ({
    isBroken: false,
    timeEntries: [
      {
        hoursStart: "",
        minutesStart: "",
        amPmStart: "AM",
        hoursEnd: "",
        minutesEnd: "",
        amPmEnd: "AM",
      },
    ],
  }));

  const [timeData, setTimeData] = useState(initialTimeData);

  const handleSelectSY = (value) => {
    setSelectedSY(value);
  };

  const handleSelectSem = (value) => {
    setSelectedSem(value);
  };

  const handleHoursStartChange = (value, dayIndex, entryIndex) => {
    const updatedTimeData = [...timeData];
    updatedTimeData[dayIndex].timeEntries[entryIndex].hoursStart = value;
    setTimeData(updatedTimeData);
  };

  const handleMinutesStartChange = (value, dayIndex, entryIndex) => {
    const updatedTimeData = [...timeData];
    updatedTimeData[dayIndex].timeEntries[entryIndex].minutesStart = value;
    setTimeData(updatedTimeData);
  };

  const handleAmPmStartChange = (value, dayIndex, entryIndex) => {
    const updatedTimeData = [...timeData];
    updatedTimeData[dayIndex].timeEntries[entryIndex].amPmStart = value;
    setTimeData(updatedTimeData);
  };

  const handleHoursEndChange = (value, dayIndex, entryIndex) => {
    const updatedTimeData = [...timeData];
    updatedTimeData[dayIndex].timeEntries[entryIndex].hoursEnd = value;
    setTimeData(updatedTimeData);
  };

  const handleMinutesEndChange = (value, dayIndex, entryIndex) => {
    const updatedTimeData = [...timeData];
    updatedTimeData[dayIndex].timeEntries[entryIndex].minutesEnd = value;
    setTimeData(updatedTimeData);
  };

  const handleAmPmEndChange = (value, dayIndex, entryIndex) => {
    const updatedTimeData = [...timeData];
    updatedTimeData[dayIndex].timeEntries[entryIndex].amPmEnd = value;
    setTimeData(updatedTimeData);
  };

  const handleBrokenScheduleChange = (isChecked, dayIndex) => {
    const updatedTimeData = [...timeData];
    updatedTimeData[dayIndex].isBroken = isChecked;
    // If the day is no longer broken, clear any existing time entries
    if (!isChecked) {
      updatedTimeData[dayIndex].timeEntries = [];
    } else if (updatedTimeData[dayIndex].timeEntries.length === 0) {
      // Add an initial time entry if it's a newly broken day
      updatedTimeData[dayIndex].timeEntries.push({
        hoursStart: "",
        minutesStart: "",
        amPmStart: "AM",
        hoursEnd: "",
        minutesEnd: "",
        amPmEnd: "AM",
      });
    }
    setTimeData(updatedTimeData);
  };

  const addTimeEntry = (dayIndex) => {
    const updatedTimeData = [...timeData];
    updatedTimeData[dayIndex].timeEntries.push({
      hoursStart: "",
      minutesStart: "",
      amPmStart: "AM",
      hoursEnd: "",
      minutesEnd: "",
      amPmEnd: "AM",
    });
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
                {days.map((day, dayIndex) => (
                  <tr key={day}>
                    <td className="text-center p-5">{day}</td>
                    <td className="text-center p-5">
                      <input
                        type="checkbox"
                        onChange={(e) => handleBrokenScheduleChange(e.target.checked, dayIndex)}
                        checked={timeData[dayIndex].isBroken}
                      />
                    </td>
                    <td className="text-center p-5">
                      {timeData[dayIndex].isBroken &&
                        timeData[dayIndex].timeEntries.map((timeEntry, entryIndex) => (
                          <div key={entryIndex}>
                            <input
                              type="text"
                              placeholder="HH"
                              value={timeEntry.hoursStart}
                              onChange={(e) => handleHoursStartChange(e.target.value, dayIndex, entryIndex)}
                              className="w-10"
                            />
                            :
                            <input
                              type="text"
                              placeholder="MM"
                              value={timeEntry.minutesStart}
                              onChange={(e) => handleMinutesStartChange(e.target.value, dayIndex, entryIndex)}
                              className="w-10"
                            />
                            <select
                              value={timeEntry.amPmStart}
                              onChange={(e) => handleAmPmStartChange(e.target.value, dayIndex, entryIndex)}
                              className="w-16"
                            >
                              <option value="AM">AM</option>
                              <option value="PM">PM</option>
                            </select>
                            <br />
                          </div>
                        ))}
                    </td>
                    <td className="text-center p-5">
                      {timeData[dayIndex].isBroken &&
                        timeData[dayIndex].timeEntries.map((timeEntry, entryIndex) => (
                          <div key={entryIndex}>
                            <input
                              type="text"
                              placeholder="HH"
                              value={timeEntry.hoursEnd}
                              onChange={(e) => handleHoursEndChange(e.target.value, dayIndex, entryIndex)}
                              className="w-10"
                            />
                            :
                            <input
                              type="text"
                              placeholder="MM"
                              value={timeEntry.minutesEnd}
                              onChange={(e) => handleMinutesEndChange(e.target.value, dayIndex, entryIndex)}
                              className="w-10"
                            />
                            <select
                              value={timeEntry.amPmEnd}
                              onChange={(e) => handleAmPmEndChange(e.target.value, dayIndex, entryIndex)}
                              className="w-16"
                            >
                              <option value="AM">AM</option>
                              <option value="PM">PM</option>
                            </select>
                            <br />
                          </div>
                        ))}
                    </td>
                    <td className="text-center p-5">
                      {timeData[dayIndex].isBroken &&
                        timeData[dayIndex].timeEntries.map((timeEntry, entryIndex) => (
                          <div key={entryIndex}>
                            {calculateHours(
                              timeEntry.hoursStart,
                              timeEntry.minutesStart,
                              timeEntry.amPmStart,
                              timeEntry.hoursEnd,
                              timeEntry.minutesEnd,
                              timeEntry.amPmEnd
                            )}
                            <br />
                          </div>
                        ))}
                    </td>
                    <td className="text-center p-5">
                      {timeData[dayIndex].isBroken && (
                        <button onClick={() => addTimeEntry(dayIndex)}>Add Time</button>
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
