import { useState, useEffect, useMemo } from "react";
import { SuperiorEval } from "../../components/SuperiorEval";
import { Dropdown } from "../Dropdown";
import { calculateSchoolYear, calculateSemester } from "../SySemUtils.js";
import axios from "axios";
import { useParams } from "react-router-dom";

export const SpecificNASEvaluation = () => {
  const currentYear = calculateSchoolYear();
  const currentSem = calculateSemester();
  const [selectedSY, setSelectedSY] = useState(currentYear);
  const [selectedSem, setSelectedSem] = useState(currentSem);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [middleName, setMiddlename] = useState("");
  const [office, setOffice] = useState("");
  const [uniqueYears, setUniqueYears] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [syOptions, setSyOptions] = useState([]);
  const sem_options = ["First", "Second", "Summer"];
  const nasId = useParams().nasId;
  const url = import.meta.env.VITE_APP_API_URL;

  const api = useMemo(
    () =>
      axios.create({
        baseURL: `${url}/api`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    [url]
  );

  const handleSelectSY = (event) => {
    const value = event.target.value;
    setSelectedSY(value);
  };

  const handleSelectSem = (event) => {
    const value = event.target.value;
    setSelectedSem(value);
  };

  function getSemesterValue(sem) {
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
  }

  useEffect(() => {
    const fetchNas = async () => {
      try {
        const nasResponse = await api.get(`/NAS/${nasId}/noimg`);
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
        <div className="flex h-full flex-col justify-center">
          <ul className="text-sm md:text-base lg:text-lg font-medium rounded-t-lg bg-grey pr-4 py-4 grid max-[450px]:grid-cols-1 grid-cols-2 overflow-x-auto">
            <div className="flex w-auto mb-3 ml-5 min-[450px]:mb-0">
              <div className="flex flex-col md:flex-row justify-start md:items-center gap-3 lg:gap-10">
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
              </div>
            </div>
          </ul>
          <div className="px-5 md:px-9 py-4">
            <div className="flex gap-10 mb-7 text-xs md:text-base lg:text-lg overflow-x-auto">
              <div className="font-bold" style={{ textTransform: "uppercase" }}>
                NAS NAME: {lastName}, {firstName} {middleName}
              </div>
              <div>
                <p className="font-bold text-center" style={{ textTransform: "uppercase" }}>
                  DEPT/OFFICE: {office}
                </p>
              </div>
            </div>
            <hr className="my-5 border-t-2 border-gray-300" />
            <div className="overflow-x-auto">
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
