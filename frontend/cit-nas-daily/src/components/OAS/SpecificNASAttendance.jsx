import { useState, useEffect } from "react";
import { MonthlySummary } from "../../components/MonthlySummary";
import { WeeklyAttendance } from "../../components/OAS/WeeklyAttendance";
import { useParams } from "react-router-dom";
import axios from "axios";

const first_sem = [
  "All",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const second_sem = [
  "All",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
];

const summer = ["All", "June", "July", "August"];

export const SpecificNASAttendance = () => {
  const [selectedSY, setSelectedSY] = useState("2324");
  const [selectedSem, setSelectedSem] = useState("First");
  const [monthOptions, setMonthOptions] = useState(first_sem);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(-1);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [middleName, setMiddlename] = useState("");
  const [office, setOffice] = useState("");
  const sy_options = ["2324", "2223", "2122", "2021"];
  const sem_options = ["First", "Second", "Summer"];
  const nasId = useParams().nasId;
  const [timekeepingSummaries, setTimekeepingSummaries] = useState([]);

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

        const nasresponse = await api.get(`/NAS/${nasId}/noimg`);
        console.log(nasresponse);
        const nasData = nasresponse.data;

        const officeResponse = await api.get(`Offices/${nasId}/NAS`);
        const officeData = officeResponse.data;

        const timekeepingresponse = await api.get(
          `/TimekeepingSummary/${nasId}`
        );
        let timekeepingdata = timekeepingresponse.data[0];
        console.log(timekeepingdata);

        if (timekeepingdata === undefined || !timekeepingdata) {
          // If there's no record
          timekeepingdata = {
            excused: "NR",
            failedToPunch: "NR",
            lateOver10Mins: "NR",
            lateOver45Mins: "NR",
            makeUpDutyHours: "NR",
            schoolYear: "NR",
            semester: "NR",
            unexcused: "NR",
          };
        }

        setTimekeepingSummaries(timekeepingdata);
        setFirstname(nasData.firstName);
        setMiddlename(nasData.middleName);
        setLastname(nasData.lastName);
        setOffice(officeData.name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNas();

    let selectedMonthIndex;
    switch (selectedSem) {
      case "First":
        setMonthOptions(first_sem);
        selectedMonthIndex = first_sem.indexOf(selectedMonth) + 6;
        if (selectedMonth === "All") {
          selectedMonthIndex = -1;
        }
        break;
      case "Second":
        setMonthOptions(second_sem);
        selectedMonthIndex = second_sem.indexOf(selectedMonth) - 1;
        if (selectedMonth === "All") {
          selectedMonthIndex = -2;
        }
        break;
      case "Summer":
        setMonthOptions(summer);
        selectedMonthIndex = summer.indexOf(selectedMonth) + 5;
        if (selectedMonth === "All") {
          selectedMonthIndex = -3;
        }
        break;
      default:
        break;
    }

    setSelectedMonthIndex(selectedMonthIndex);
    console.log("Selected Sem:", selectedSem);
    console.log("Selected Month Index:", selectedMonthIndex);
    console.log("Selected SY:", selectedSY);
  }, [selectedSY, selectedSem, selectedMonth, nasId]);

  const handleSelectSY = (event) => {
    const value = event.target.value;
    setSelectedSY(value);
  };

  const handleSelectSem = (event) => {
    const value = event.target.value;
    setSelectedSem(value);
    setSelectedMonth("All");
  };

  const handleSelectedMonth = (event) => {
    const value = event.target.value;
    if (value === "All") {
      setSelectedMonth("All");
    } else {
      setSelectedMonth(value);
    }
    console.log("Selected Month:", value);
  };

  console.log(nasId);

  return (
    <>
      <div className="flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col w-9/10 mx-8 mb-10">
        <div className="flex h-full flex-col justify-center">
          <ul className="flex-wrap items-center text-lg font-medium rounded-t-lg bg-grey pr-4 py-4 grid grid-cols-3">
            <div
              className="font-bold ml-10"
              style={{ textTransform: "uppercase" }}
            >
              NAS NAME: {lastName}, {firstName} {middleName}
            </div>
            <li>
              <p
                className="font-bold text-center"
                style={{ textTransform: "uppercase" }}
              >
                DEPT/OFFICE: {office}
              </p>
            </li>
            <li className="flex justify-end">
              <div className="flex ">
                <div className="relative w-auto">
                  <input
                    type="search"
                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded border"
                    placeholder="Search NAS..."
                    required
                  />
                  <button
                    type="submit"
                    className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          </ul>
          <div className="px-8 py-4">
            <div className="flex flex-row justify-start items-center gap-10 mt-2 mb-8">
              <div className="flex flex-row gap-2 items-center">
                <div className="mr-2">SY:</div>
                <select
                  id="sy"
                  name="sy"
                  value={selectedSY}
                  onChange={handleSelectSY}
                  className=" w-full text-base border rounded-md"
                >
                  {Array.isArray(sy_options) &&
                    sy_options.map((sy, index) => (
                      <option key={index} value={sy}>
                        {sy}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="mr-2">SEMESTER:</div>
                <select
                  id="sem"
                  name="sem"
                  value={selectedSem}
                  onChange={handleSelectSem}
                  className=" w-full text-base border rounded-md"
                >
                  {sem_options.map((sem, index) => (
                    <option key={index} value={sem}>
                      {sem}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="mr-2">MONTH:</div>
                <select
                  id="month"
                  name="month"
                  value={selectedMonth}
                  onChange={handleSelectedMonth}
                  className=" w-full text-base border rounded-md"
                >
                  {Array.isArray(monthOptions) &&
                    monthOptions.map((month, index) => (
                      <option key={index} value={month}>
                        {month}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-4">
              <p className="text-xl font-bold text-primary">
                MONTHLY SUMMARY OF ABSENCES/LATE
              </p>
              <MonthlySummary timekeepingSummaries={timekeepingSummaries} />
              <p className="text-xl font-bold text-primary">
                WEEKLY ATTENDANCE
              </p>
              <WeeklyAttendance
                nasId={nasId}
                selectedMonth={selectedMonthIndex}
                selectedSem={selectedSem}
                selectedSY={selectedSY}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};