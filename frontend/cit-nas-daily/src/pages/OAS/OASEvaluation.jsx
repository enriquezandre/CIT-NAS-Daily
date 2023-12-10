import { useState, useEffect, useMemo } from "react";
import { Button } from "flowbite-react";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { SuperiorEval } from "../../components/SuperiorEval";
import { Dropdown } from "../../components/Dropdown";
import { calculateSchoolYear, calculateSemester } from "../../components/SySemUtils";
import axios from "axios";

//get current schoolyear
const currentSchoolYear = calculateSchoolYear();
const currentSem = calculateSemester();

export const OASEvaluation = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [middleName, setMiddlename] = useState("");
  const [office, setOffice] = useState("");
  const [nasId, setNasId] = useState(1);
  const [nasArray, setNasArray] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [maxNasId, setMaxNasId] = useState(1);
  const [selectedSY, setSelectedSY] = useState(currentSchoolYear);
  const [selectedSem, setSelectedSem] = useState(currentSem);
  // eslint-disable-next-line no-unused-vars
  const [syOptions, setSyOptions] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);
  const sem_options = ["First", "Second", "Summer"];

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

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSelectSY = (event) => {
    const value = event.target.value;
    setSelectedSY(value);
  };

  const handleSelectSem = (event) => {
    const value = event.target.value;
    setSelectedSem(value);
  };

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

  useEffect(() => {
    const fetchNas = async () => {
      try {
        const nasResponse = await api.get(`/NAS/${nasId}/noimg`); //TO CHANGE WITH PARAMS SY AND SEM
        const nasData = nasResponse.data;

        setFirstname(nasData.firstName);
        setMiddlename(nasData.middleName);
        setLastname(nasData.lastName);
        setOffice(nasData.officeName);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNas();
  }, [selectedSY, selectedSem, nasId, api]);

  useEffect(() => {
    const fetchNasData = async () => {
      try {
        const response = await api.get(`/NAS/${selectedSY}/${getSemesterValue(selectedSem)}/noimg`);
        setNasArray(response.data);

        const maxId = Math.max(...response.data.map((nas) => nas.id), 1);
        setMaxNasId(maxId);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNasData();
  }, [api, selectedSY, selectedSem, getSemesterValue]);

  useEffect(() => {
    const results = nasArray.filter((data) =>
      data.fullName.toLowerCase().includes(searchInput.toLowerCase())
    );
    if (results[0]) {
      setNasId(results[0].id);
    }
  }, [searchInput, nasArray]);

  return (
    <>
      <div className="flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col w-9/10 mb-10">
        <div className="flex h-full flex-col justify-center">
          <ul className="flex-wrap items-center text-lg font-medium rounded-t-lg bg-grey pr-4 py-4 grid grid-cols-2">
            <div className={`flex items-center w-auto ${nasId === 1 ? "ml-10" : ""}`}>
              <div>
                {nasId > 1 && (
                  <Button className="text-black" onClick={() => setNasId(nasId - 1)}>
                    <HiOutlineArrowLeft className="h-6 w-6" />
                  </Button>
                )}
              </div>
              <div className="flex flex-row justify-start items-center gap-10">
                <div className="flex flex-row gap-2 items-center">
                  <Dropdown
                    label="SY"
                    options={uniqueYears}
                    selectedValue={selectedSY}
                    onChange={(e) => handleSelectSY(e)}
                  />
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <Dropdown
                    label="Semester"
                    options={sem_options}
                    selectedValue={selectedSem}
                    onChange={(e) => handleSelectSem(e)}
                  />
                </div>
              </div>
            </div>
            <li className="flex justify-end">
              <div className="flex ">
                <div className="relative w-auto">
                  <input
                    type="search"
                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded border"
                    placeholder="Search NAS..."
                    value={searchInput}
                    onChange={handleSearchChange}
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
              {nasId < maxNasId ? (
                <Button
                  className="text-black"
                  onClick={() => {
                    setNasId(nasId + 1);
                  }}
                >
                  <HiOutlineArrowRight className="h-6 w-6" />
                </Button>
              ) : (
                ""
              )}
            </li>
          </ul>
          <div className="px-9 py-4">
            <div className="flex gap-10 mb-7 text-lg">
              <div className="font-bold" style={{ textTransform: "uppercase" }}>
                NAS NAME: {lastName}, {firstName} {middleName}
              </div>
              <div>
                <p className="font-bold text-center" style={{ textTransform: "uppercase" }}>
                  DEPT/OFFICE: {office}
                </p>
              </div>
            </div>
            <div>
              {" "}
              <SuperiorEval
                nasId={nasId}
                selectedSem={getSemesterValue(selectedSem)}
                selectedSY={selectedSY}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
