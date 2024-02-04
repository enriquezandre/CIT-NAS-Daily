import { ValidationList } from "../../components/OAS/ValidationList";
import { Dropdown } from "../../components/Dropdown";
import { calculateSchoolYear, calculateSemester } from "../../components/SySemUtils";
import { useState, useEffect } from "react";
import axios from "axios";

export const OASValidation = () => {
  const [selectedSY, setSelectedSY] = useState(calculateSchoolYear());
  // eslint-disable-next-line no-unused-vars
  const [syOptions, setSyOptions] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);
  const [selectedSem, setSelectedSem] = useState(calculateSemester());
  const sem_options = ["First", "Second", "Summer"];
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSchoolYearSemesterOptions = async () => {
      try {
        const api = axios.create({
          baseURL: "https://localhost:7001/api",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const response = await api.get("/NAS/sysem");
        const syOptionsData = response.data;

        setSyOptions(syOptionsData);

        // Extract unique years from syOptions
        const years = [...new Set(syOptionsData.map((option) => option.year))];
        setUniqueYears(years);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSchoolYearSemesterOptions();
  }, []);

  const handleSelectSY = (event) => {
    const value = event.target.value;
    setSelectedSY(value);
    console.log(value);
  };

  const handleSelectSem = (event) => {
    const value = event.target.value;
    setSelectedSem(value);
    console.log(value);
  };

  return (
    <>
      <div className="flex rounded-lg border border-gray-200 bg-white shadow-md flex-col w-9/10 mb-10">
        <div className="flex h-full flex-col justify-center">
          <ul className="text-sm md:text-base lg:text-lg font-medium rounded-t-lg bg-grey pr-4 py-4 grid max-[530px]:grid-cols-1 grid-cols-2 overflow-x-auto">
            <div className="flex max-[530px]:flex-col flex-row justify-start min-[530px]:items-center gap-3 lg:gap-10 w-auto mb-3 ml-5 min-[530px]:mb-0">
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
            <div className="flex max-[530px]:justify-start max-[530px]:ml-5 justify-end">
              <div className="relative w-auto">
                <input
                  type="search"
                  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded border"
                  placeholder="Search NAS..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                  required
                />
                <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium">
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
          </ul>
          <div className="px-8 py-4">
            <ValidationList
              searchQuery={searchQuery}
              selectedSem={selectedSem}
              selectedSy={selectedSY}
            />
          </div>
        </div>
      </div>
    </>
  );
};
