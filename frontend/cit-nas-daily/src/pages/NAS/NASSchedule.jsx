import { useState } from "react";
import { Dropdown } from "../../components/Dropdown.jsx";

export const NASSchedule = () => {
  const [selectedSY, setSelectedSY] = useState("");
  const [selectedSem, setSelectedSem] = useState("");
  const [schedule, setSchedule] = useState({
    Monday: { isBroken: false, items: [{ start: "", end: "" }] },
    Tuesday: { isBroken: false, items: [{ start: "", end: "" }] },
    Wednesday: { isBroken: false, items: [{ start: "", end: "" }] },
    Thursday: { isBroken: false, items: [{ start: "", end: "" }] },
    Friday: { isBroken: false, items: [{ start: "", end: "" }] },
    Saturday: { isBroken: false, items: [{ start: "", end: "" }] },
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

  const handleStartTimeChange = (day, index, value) => {
    const updatedSchedule = { ...schedule };
    updatedSchedule[day].items[index].start = value;
    setSchedule(updatedSchedule);
  };

  const handleEndTimeChange = (day, index, value) => {
    const updatedSchedule = { ...schedule };
    updatedSchedule[day].items[index].end = value;
    setSchedule(updatedSchedule);
  };

  const handleToggleBrokenSchedule = (day, isBroken) => {
    const updatedSchedule = { ...schedule };
    updatedSchedule[day].isBroken = isBroken;
    setSchedule(updatedSchedule);
  };

  const handleAddScheduleRow = (day) => {
    const updatedSchedule = { ...schedule };
    updatedSchedule[day].items.push({ start: "", end: "" });
    setSchedule(updatedSchedule);
  };

  const handleRemoveScheduleRow = (day, index) => {
    const updatedSchedule = { ...schedule };
    updatedSchedule[day].items.splice(index, 1);
    setSchedule(updatedSchedule);
  };

  // Function to calculate duty hours for a day
  const calculateDutyHours = (day) => {
    const schedules = schedule[day].items;
    let totalHours = 0;
    
    schedules.forEach((scheduleItem) => {
      const startTime = scheduleItem.start;
      const endTime = scheduleItem.end;

      if (startTime && endTime) {
        const startHour = parseInt(startTime.split(":")[0]);
        const startMinute = parseInt(startTime.split(":")[1]);
        const endHour = parseInt(endTime.split(":")[0]);
        const endMinute = parseInt(endTime.split(":")[1]);

        const totalMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
        totalHours += totalMinutes / 60;
      }
    });

    return totalHours;
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  schedule[day].isBroken ? (
                    schedule[day].items.map((scheduleItem, index) => (
                      <tr key={`${day}-${index}`}>
                        <td className="text-center pt-5">{index === 0 ? day : ""}</td>
                        <td className="text-center">
                          {index === 0 ? (
                            <input
                              type="checkbox"
                              checked={schedule[day].isBroken}
                              onChange={(e) => handleToggleBrokenSchedule(day, e.target.checked)}
                            />
                          ) : null}
                        </td>
                        <td className="text-center">
                          <input
                            type="time"
                            value={scheduleItem.start}
                            onChange={(e) => handleStartTimeChange(day, index, e.target.value)}
                          />
                        </td>
                        <td className="text-center">
                          <input
                            type="time"
                            value={scheduleItem.end}
                            onChange={(e) => handleEndTimeChange(day, index, e.target.value)}
                          />
                        </td>
                        <td className="text-center">{calculateDutyHours(day)} hours</td>
                        {index === 0 ? (
                          <td className="text-center">
                              <button
                                onClick={() => handleAddScheduleRow(day)}
                                disabled={!schedule[day].isBroken}
                                className={!schedule[day].isBroken ? 'disabled-button' : ''}
                              >Add Row</button>
                          </td>
                        ) : (
                          <td className="text-center">
                            <button onClick={() => handleRemoveScheduleRow(day, index)}>Remove Row</button>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr key={day}>
                      <td className="text-center pt-5">{day}</td>
                      <td className="text-center">
                        <input
                          type="checkbox"
                          checked={schedule[day].isBroken}
                          onChange={(e) => handleToggleBrokenSchedule(day, e.target.checked)}
                        />
                      </td>
                      <td className="text-center">
                        <input
                          type="time"
                          value={schedule[day].items[0].start}
                          onChange={(e) => handleStartTimeChange(day, 0, e.target.value)}
                        />
                      </td>
                      <td className="text-center">
                        <input
                          type="time"
                          value={schedule[day].items[0].end}
                          onChange={(e) => handleEndTimeChange(day, 0, e.target.value)}
                        />
                      </td>
                      <td className="text-center">{calculateDutyHours(day)} hours</td>
                      <td className="text-center">
                        <button onClick={() => handleAddScheduleRow(day)}>Add Row</button>
                      </td>
                    </tr>
                  )
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
