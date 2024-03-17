import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { MasterlistTable } from "../../components/OAS/MasterlistTable";
import { Dropdown } from "../../components/Dropdown";
import { calculateSchoolYear, calculateSemester } from "../../components/SySemUtils";
import { AddExistingNASModal } from "../../components/OAS/AddExistingNASModal";

const currentYear = calculateSchoolYear();
const currentSem = calculateSemester();

export const OASMasterlist = () => {
  const [selectedSY, setSelectedSY] = useState(currentYear);
  // eslint-disable-next-line no-unused-vars
  const [syOptions, setSyOptions] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);
  const [selectedSem, setSelectedSem] = useState(currentSem);
  const [searchInput, setSearchInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const sem_options = ["First", "Second", "Summer"];
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

  const handleSelectSY = (event) => {
    const value = event.target.value;
    setSelectedSY(value);
  };

  const handleSelectSem = (event) => {
    const value = event.target.value;
    setSelectedSem(value);
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleSubmitted = (isSubmitted) => {
    setSubmitted(isSubmitted);
  };

  useEffect(() => {
    if (submitted) {
      setSubmitted(false);
    }
  }, [submitted]);

  return (
    <>
      <div className="flex rounded-lg border border-gray-200 bg-white shadow-md flex-col w-9/10 mb-10 max-h-screen">
        <div className="flex flex-col justify-center max-h-screen pb-3">
          <ul className="text-sm md:text-base lg:text-lg font-medium rounded-t-lg bg-grey pr-4 py-4 grid min-[450px]:grid-cols-2 overflow-x-auto max-h-screen">
            <div className="flex flex-col md:flex-row justify-start md:items-center gap-3 lg:gap-10 w-auto mb-3 ml-5 max-h-screen">
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
            <div>
              <div className="flex md:justify-end ml-5 md:ml-0">
                <button
                  className="btn btn-primary bg-secondary min-[450px]:justify-start px-3 py-1 md:px-4 md:py-2 rounded-lg md:m-1 text-xs md:text-sm hover:bg-primary hover:text-white font-normal mr-3"
                  onClick={handleAdd}
                >
                  Add existing NAS
                </button>
                <div className="relative w-auto">
                  <input
                    type="search"
                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded border"
                    placeholder="Search NAS..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="absolute top-0 right-0 p-2.5 text-sm font-medium"
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
            </div>
          </ul>
          <div className="py-4 max-h-screen overflow-x-auto mr-6 ml-6">
            <MasterlistTable
              searchInput={searchInput}
              selectedSY={selectedSY}
              selectedSem={selectedSem}
              submitted={submitted}
            />
          </div>
        </div>
      </div>
      <AddExistingNASModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        toaddSY={selectedSY}
        toaddSem={selectedSem}
        onSubmitted={handleSubmitted}
      />
    </>
  );
};
