import { useState, useMemo, useEffect } from "react";
import { Dropdown } from "../../components/Dropdown";
import { calculateSchoolYear, calculateSemester } from "../../components/SySemUtils";
import { AddNASForm } from "../../components/OAS/AddNASForm";
import axios from "axios";
import { AddSuperiorForm } from "../../components/OAS/AddSuperiorForm";
import { AddOfficeForm } from "../../components/OAS/AddOfficeForm";

const currentYear = calculateSchoolYear();
const currentSem = calculateSemester();

export const OASManageData = () => {
  const [selectedSY, setSelectedSY] = useState(currentYear);
  // eslint-disable-next-line no-unused-vars
  const [syOptions, setSyOptions] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);
  const [selectedSem, setSelectedSem] = useState(currentSem);
  const [fileUploaded, setFileUploaded] = useState(false);
  const sem_options = ["First", "Second", "Summer"];
  // eslint-disable-next-line no-unused-vars
  const [attendanceSummaries, setAttendanceSummaries] = useState([]);

  const api = useMemo(
    () =>
      axios.create({
        baseURL: "https://localhost:7001/api",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    []
  );

  const getSemesterValue = useMemo(() => {
    return (sem) => {
      switch (sem) {
        case "First":
          return 0;
        case "Second":
          return 1;
        case "Summer":
          return 2;
        default:
          return "Invalid semester";
      }
    };
  }, []);

  const handleSelectSY = (event) => {
    const value = event.target.value;
    setSelectedSY(value);
  };

  const handleSelectSem = (event) => {
    const value = event.target.value;
    setSelectedSem(value);
  };

  const formatDtrTime = (timeStr) => {
    if (timeStr) {
      const [hours, minutes] = timeStr.split(":");
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      const options = { hour: "numeric", minute: "numeric", hour12: true };
      return date.toLocaleTimeString("en-US", options);
    }
    return null;
  };

  useEffect(() => {
    const fetchSchoolYearSemesterOptions = async () => {
      try {
        const response = await api.get("/NAS/sysem");
        setSyOptions(response.data);

        // Extract unique years from syOptions
        const years = [...new Set(response.data.map((option) => option.year))];
        setUniqueYears(years);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSchoolYearSemesterOptions();
  }, [api]);

  const selectedSemValue = getSemesterValue(selectedSem);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    // List of allowed MIME types for Excel files
    const allowedTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type. Please upload an Excel file.");
      return;
    }

    setFileUploaded(file);
  };

  const updateNasTimekeeping = async () => {
    try {
      const nasResponse = await api.get("/NAS");
      const nasList = nasResponse.data;

      await Promise.all(
        nasList.map(async (nas) => {
          const { id, firstName, lastName, middleName } = nas;
          console.log("NAS Info: ", id, firstName, middleName, lastName);
          await checkAttendanceAndSchedule(id, firstName, lastName, middleName);
        })
      );
    } catch (error) {
      console.error("Error fetching NAS data: ", error);
    }
  };

  //function for checking attendance and schedule for each NAS
  const checkAttendanceAndSchedule = async (nasId, firstName, lastName, middleName) => {
    try {
      const dtrresponse = await api.get(
        `DTR/${selectedSY}/${selectedSemValue}/${lastName}/${firstName}?middleName=${middleName}`
      );
      const dtrdata = dtrresponse.data;
      //console.log(dtrdata);

      const scheduleResponse = await api.get(
        `/Schedule/${nasId}/${selectedSY}/${selectedSemValue}`
      );
      let scheduleData = scheduleResponse.data;
      if (Array.isArray(scheduleData.schedules)) {
        scheduleData.schedules = scheduleData.schedules.sort((a, b) => {
          const timeA = new Date(a.startTime).getTime();
          const timeB = new Date(b.startTime).getTime();
          return timeA - timeB;
        });
      }
      //console.log(scheduleData);

      // Calculate the totals for failedToPunch, lateOver10Mins, and lateOver45Mins
      let totalFailedToPunch = 0;
      let totalLateOver10Mins = 0;
      let totalLateOver45Mins = 0;

      // Loop through each day in the DTR and compare it with the schedule
      const attendanceSummaries = dtrdata.dailyTimeRecords.map((attendance) => {
        const attendanceDate = new Date(attendance.date);

        //Adjust dayOfWeek calculation for Monday - Saturday
        const dayOfWeek = (attendanceDate.getDay() + 6) % 7;
        let schedule1 = null;
        let schedule2 = "No record";

        const schedulesForDay = scheduleData.schedules.filter(
          (sched) => sched.dayOfWeek === dayOfWeek
        );

        if (schedulesForDay.length >= 1) {
          // If at least one schedule is found, assign the first schedule to schedule1
          schedule1 = schedulesForDay[0];
        }
        // console.log("Schedule 1: ", schedule1.startTime);

        if (schedulesForDay.length >= 2) {
          // If at least two schedules are found, assign the second schedule to schedule2
          schedule2 = schedulesForDay[1];
        }
        // console.log("Schedule 2: ", schedule2?.startTime);

        if (attendance.punch1 === "FTP IN" || attendance.punch2 === "FTP OUT") {
          totalFailedToPunch = totalFailedToPunch + 1;
        }

        if (attendance.punch3 === "FTP IN" || attendance.punch4 === "FTP OUT") {
          totalFailedToPunch = totalFailedToPunch + 1;
        }

        // console.log("FTP: ", totalFailedToPunch);
        //check if there is L10 and L45
        const timeIn1 = new Date("2023-08-14 " + formatDtrTime(attendance.punch1));
        const timeIn2 = new Date("2023-08-14 " + formatDtrTime(attendance.punch3));
        const schedStartTime1 = new Date(schedule1.startTime);
        const schedStartTime2 = new Date(schedule2?.startTime);

        console.log("Time In 1: ", timeIn1 + " " + schedStartTime1);
        console.log("Time In 2: ", timeIn2 + " " + schedStartTime2);
        // Extract only the hours and minutes from the date objects
        const hoursDiff1 = timeIn1.getHours() - schedStartTime1.getHours();
        const minutesDiff1 = timeIn1.getMinutes() - schedStartTime1.getMinutes();

        const hoursDiff2 = timeIn2.getHours() - schedStartTime2.getHours();
        const minutesDiff2 = timeIn2.getMinutes() - schedStartTime2.getMinutes();

        console.log("Hours Diff 1 ", hoursDiff1 + "& Mins Diff: ", minutesDiff1);
        console.log("Hours Diff 2 ", hoursDiff2 + "& Mins Diff: ", minutesDiff2);
        //-----checking stops here

        //   // Convert the time difference to minutes
        //   const totalMinutesDifference1 = hoursDiff1 * 60 + minutesDiff1;
        //   const totalMinutesDifference2 = hoursDiff2 * 60 + minutesDiff2;

        //   if (totalMinutesDifference1 > 45) {
        //     totalLateOver45Mins = totalLateOver45Mins + 1;
        //   } else if (totalMinutesDifference1 > 10) {
        //     totalLateOver10Mins = totalLateOver10Mins + 1;
        //   }

        //   if (totalMinutesDifference2 > 45) {
        //     totalLateOver45Mins = totalLateOver45Mins + 1;
        //   } else if (totalMinutesDifference2 > 10) {
        //     totalLateOver10Mins = totalLateOver10Mins + 1;
        //   }

        //   return attendance;
      });
      //setAttendanceSummaries(attendanceSummaries);

      // // Make the API call to post the summary
      // const postResponse = await api.post(
      //   `/TimekeepingSummary/${nasId}/${selectedSY}/${selectedSemValue}`,
      //   {
      //     excused: 0,
      //     unexcused: 0,
      //     failedToPunch: totalFailedToPunch,
      //     lateOver10mins: totalLateOver10Mins,
      //     lateOver45mins: totalLateOver45Mins,
      //     makeUpDutyHours: 0,
      //   }
      // );
      // console.log(postResponse);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!fileUploaded) {
      alert("No file uploaded");
      return;
    }
    const formData = new FormData();
    formData.append("file", fileUploaded);

    try {
      const response = await api.post(
        `/DTR/UploadExcel/${selectedSY}/${getSemesterValue(selectedSem)}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        alert("File uploaded successfully");
        console.log(response.data);
        setFileUploaded(false); // Reset the file input after successful upload
        updateNasTimekeeping();
      } else {
        alert("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  return (
    <>
      <div className="flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col w-9/10 mb-10">
        <div className="flex h-full flex-col justify-center">
          <div className="px-8 py-4">
            <div className="flex mt-2 mb-8">
              <p className="mr-5 font-bold text-xl">Upload DTR:</p>
              <div>
                <input
                  type="file"
                  id="fileUpload"
                  onChange={handleFileUpload}
                  accept=".xls,.xlsx"
                />
                {fileUploaded ? (
                  <button
                    className="py-2 rounded-md bg-secondary w-24 items-center justify center hover:bg-primary hover:text-white"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                ) : null}
              </div>
              <div className="flex flex-row justify-start items-center gap-10 ml-5 mr-4">
                <div className="flex flex-row gap-2 items-center">
                  Select
                  <Dropdown
                    label="SY"
                    options={uniqueYears}
                    selectedValue={selectedSY}
                    onChange={(e) => handleSelectSY(e)}
                  />
                </div>
                <div className="flex flex-row gap-2 items-center">
                  Select
                  <Dropdown
                    label="Semester"
                    options={sem_options}
                    selectedValue={selectedSem}
                    onChange={(e) => handleSelectSem(e)}
                  />
                </div>
              </div>
            </div>
            <hr className="my-5 border-t-2 border-gray-300" />
            <div>
              <AddNASForm />
              <hr className="my-5 border-t-2 border-gray-300" />
            </div>
            <div>
              <AddSuperiorForm />
              <hr className="my-5 border-t-2 border-gray-300" />
            </div>
            <div>
              <AddOfficeForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
