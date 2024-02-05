import { useState, useEffect, useMemo } from "react";
import { MonthlySummary } from "../../components/MonthlySummary";
import { WeeklyAttendance } from "../../components/OAS/WeeklyAttendance";
import { useParams } from "react-router-dom";
import { calculateSchoolYear, calculateSemester } from "../../components/SySemUtils.js";
import { Dropdown } from "../../components/Dropdown.jsx";
import axios from "axios";

export const SpecificNASAttendance = () => {
  const currentYear = calculateSchoolYear();
  const currentSem = calculateSemester();
  const first_sem = useMemo(
    () => ["All", "August", "September", "October", "November", "December"],
    []
  );
  const second_sem = useMemo(
    () => ["All", "January", "February", "March", "April", "May", "June"],
    []
  );
  const summer = useMemo(() => ["All", "June", "July", "August"], []);
  const sem_options = ["First", "Second", "Summer"];
  const [uniqueYears, setUniqueYears] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [syOptions, setSyOptions] = useState([]);
  const [selectedSY, setSelectedSY] = useState(currentYear);
  const [selectedSem, setSelectedSem] = useState(currentSem);
  const [monthOptions, setMonthOptions] = useState(first_sem);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [middleName, setMiddlename] = useState("");
  const [office, setOffice] = useState("");
  const [timekeepingSummaries, setTimekeepingSummaries] = useState([]);
  const nasId = useParams().nasId;

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
    setSelectedMonth("All");
  };

  const handleSelectedMonth = (event) => {
    const value = event.target.value;
    if (value === "All") {
      setSelectedMonth("All");
    } else {
      setSelectedMonth(value);
    }
  };

  useEffect(() => {
    const fetchNas = async () => {
      try {
        const nasresponse = await api.get(`/NAS/${nasId}/noimg`);
        const nasData = nasresponse.data;
        setFirstname(nasData.firstName);
        setMiddlename(nasData.middleName);
        setLastname(nasData.lastName);
        setOffice(nasData.officeName);
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
        selectedMonthIndex = summer.indexOf(selectedMonth) + 4;
        if (selectedMonth === "All") {
          selectedMonthIndex = -3;
        }
        break;
      default:
        break;
    }

    setSelectedMonthIndex(selectedMonthIndex);
  }, [
    nasId,
    selectedSY,
    selectedSem,
    selectedMonth,
    api,
    getSemesterValue,
    first_sem,
    second_sem,
    summer,
  ]);

  useEffect(() => {
    const fetchTimekeepingSummary = async () => {
      try {
        const timekeepingresponse = await api.get(
          `/TimekeepingSummary/${nasId}/${selectedSY}/${getSemesterValue(selectedSem)}`
        );
        const timekeepingdata = timekeepingresponse.data;
        setTimekeepingSummaries(timekeepingdata);
      } catch (error) {
        console.error(error);
        if (error.response.status === 404) {
          setTimekeepingSummaries([]);
        }
      }
    };

    fetchTimekeepingSummary();
  }, [api, nasId, selectedSY, selectedSem, getSemesterValue]);

  useEffect(() => {
    const fetchSchoolYearSemesterOptions = async () => {
      try {
        const response = await api.get(`/NAS/sysem/${nasId}`);
        setSyOptions(response.data);

        // Extract unique years from syOptions
        const years = [...new Set(response.data.map((option) => option.year))];
        setUniqueYears(years);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSchoolYearSemesterOptions();
  }, [api, nasId]);

  return (
    <>
      <div className="flex rounded-lg border border-gray-200 bg-white shadow-md flex-col w-9/10 mb-10">
        <div className="flex h-full flex-col">
          <ul className="text-sm md:text-base lg:text-lg font-medium rounded-t-lg bg-grey pr-4 py-4 grid max-[450px]:grid-cols-1 grid-cols-2 overflow-x-auto">
            <div className="flex w-auto mb-3 ml-5 min-[450px]:mb-0">
              <div className="flex flex-col lg:flex-row justify-start lg:items-center gap-3 lg:gap-10">
                <div>
                  <Dropdown
                    label="SY"
                    options={uniqueYears}
                    selectedValue={selectedSY}
                    onChange={(e) => handleSelectSY(e)}
                  />
                </div>
                <div>
                  <Dropdown
                    label="Semester"
                    options={sem_options}
                    selectedValue={selectedSem}
                    onChange={(e) => handleSelectSem(e)}
                  />
                </div>
                <div>
                  <Dropdown
                    label="Month"
                    options={monthOptions}
                    selectedValue={selectedMonth}
                    onChange={(e) => handleSelectedMonth(e)}
                  />
                </div>
              </div>
            </div>
          </ul>
          <div className="px-5 md:px-9 py-4">
            <div className="flex gap-10 mb-7 text-xs md:text-base lg:text-lg overflow-x-auto">
              <div className="font-bold" style={{ textTransform: "uppercase" }}>
                NAS NAME: {lastName}, {firstName} {middleName}
              </div>
              <div>
                <p className="font-bold" style={{ textTransform: "uppercase" }}>
                  DEPT/OFFICE: {office}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-2 md:gap-4">
              <p className="text-xs md:text-base lg:text-xl text-center font-bold text-primary overflow-x-auto">
                MONTHLY SUMMARY OF ABSENCES/LATE
              </p>
              <div className="overflow-x-auto">
                <MonthlySummary timekeepingSummaries={timekeepingSummaries} />
              </div>
              <p className="text-xs md:text-base lg:text-xl text-center font-bold text-primary overflow-x-auto">
                WEEKLY ATTENDANCE
              </p>
              <div className="overflow-x-auto">
                <WeeklyAttendance
                  nasId={nasId}
                  firstName={firstName}
                  lastName={lastName}
                  middleName={middleName}
                  selectedMonth={selectedMonthIndex}
                  selectedSem={selectedSem}
                  selectedSY={selectedSY}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
