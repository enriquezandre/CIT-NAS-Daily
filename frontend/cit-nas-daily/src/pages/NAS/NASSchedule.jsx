import React, { useState, useEffect } from "react";
import { Dropdown } from "../../components/Dropdown.jsx";

export const NASSchedule = () => {
  const [selectedSY, setSelectedSY] = useState("");
  const [selectedSem, setSelectedSem] = useState("");

  const [schedule, setSchedule] = useState({
    Monday: { isBroken: false, items: [{ start: "", end: "", totalHours: 0 }] },
    Tuesday: { isBroken: false, items: [{ start: "", end: "", totalHours: 0 }] },
    Wednesday: { isBroken: false, items: [{ start: "", end: "", totalHours: 0 }] },
    Thursday: { isBroken: false, items: [{ start: "", end: "", totalHours: 0 }] },
    Friday: { isBroken: false, items: [{ start: "", end: "", totalHours: 0 }] },
    Saturday: { isBroken: false, items: [{ start: "", end: "", totalHours: 0 }] },
  });

  const [scheduleChanges, setScheduleChanges] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
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

    setScheduleChanges({ ...scheduleChanges, [day]: true });
  };

  const handleEndTimeChange = (day, index, value) => {
    const updatedSchedule = { ...schedule };
    updatedSchedule[day].items[index].end = value;
    setSchedule(updatedSchedule);

    setScheduleChanges({ ...scheduleChanges, [day]: true });
  };

  const handleToggleBrokenSchedule = (day, isBroken) => {
    const updatedSchedule = { ...schedule };
    updatedSchedule[day].isBroken = isBroken;
    setSchedule(updatedSchedule);

    setScheduleChanges({ ...scheduleChanges, [day]: true });
  };

  const handleAddScheduleRow = (day) => {
    if (schedule[day].isBroken) {
      const updatedSchedule = { ...schedule };
      updatedSchedule[day].items.push({ start: "", end: "", totalHours: 0 });
      setSchedule(updatedSchedule);

      setScheduleChanges({ ...scheduleChanges, [day]: true });
    }
  };

  const handleRemoveScheduleRow = (day, index) => {
    if (index === 0) {
      return;
    }
    const updatedSchedule = { ...schedule };
    updatedSchedule[day].items.splice(index, 1);
    setSchedule(updatedSchedule);

    setScheduleChanges({ ...scheduleChanges, [day]: true });
  };

  useEffect(() => {
    days.forEach((day) => {
      if (scheduleChanges[day]) {
        const updatedSchedule = { ...schedule };
        updatedSchedule[day].items.forEach((scheduleItem, index) => {
          const startTime = scheduleItem.start;
          const endTime = scheduleItem.end;

          if (startTime && endTime) {
            const startHour = parseInt(startTime.split(":")[0]);
            const startMinute = parseInt(startTime.split(":")[1]);
            const endHour = parseInt(endTime.split(":")[0]);
            const endMinute = parseInt(endTime.split(":")[1]);

            const totalMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
            updatedSchedule[day].items[index].totalHours = totalMinutes / 60;
          } else {
            updatedSchedule[day].items[index].totalHours = 0;
          }
        });

        setSchedule(updatedSchedule);
        setScheduleChanges({ ...scheduleChanges, [day]: false });
      }
    });
  }, [schedule, scheduleChanges]);

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
                  <th>Broken Schedule?</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th></th>
                  <th>No. of Hours</th>
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
                        {index === 0 ? (
                          <td className="text-center">
                            <button
                              onClick={() => handleAddScheduleRow(day)}
                              disabled={!schedule[day].isBroken}
                              style={{ color: schedule[day].isBroken ? 'green' : '#C5C5C5' }}
                            >
                              Add Row
                            </button>
                          </td>
                        ) : (
                          <td className="text-center">
                            <button
                              onClick={() => handleRemoveScheduleRow(day, index)}
                              style={{ color: 'red' }}
                            >
                              Remove Row
                            </button>
                          </td>
                        )}
                        <td className="text-center">{scheduleItem.totalHours} hours</td>
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
                      <td className="text-center">
                        <button
                          onClick={() => handleAddScheduleRow(day)}
                          disabled={schedule[day].isBroken}
                          style={{ color: schedule[day].isBroken ? 'green' : '#C5C5C5' }}
                        >
                          Add Row
                        </button>
                      </td>
                      <td className="text-center">{schedule[day].items[0].totalHours} hours</td>
                    </tr>
                  )
                ))}
                <tr>
                  <th colSpan="4" className="pt-3 text-right font-weight-bold">
                    <input type="button" value="Confirm" />
                  </th>
                  <th colSpan="1" className="pt-3 text-right font-weight-bold">
                    Total Hours:
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
