import { useState, useEffect } from "react";
import { NASList } from "../../components/NASList";
import { Button } from "flowbite-react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import axios from "axios";

export const OASOffices = () => {
  const [offices, setOffices] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState(1);
  const [showNASList, setShowNASList] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  // Function to filter offices based on search input
  const filteredOffices = offices.filter((office) =>
    office.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleOfficeClick = (office) => {
    setSelectedOffice(office);
    setShowNASList(true);
  };

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        // Create an Axios instance with the Authorization header
        const api = axios.create({
          baseURL: "https://localhost:7001/api",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const response = await api.get(`/Offices`);
        console.log(response);
        setOffices(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOffices();
  }, []);

  return (
    <>
      <div className="flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col w-9/10 mx-8 mb-10">
        <div className="flex h-full flex-col justify-center">
          <ul className="flex-wrap items-center text-lg font-medium rounded-t-lg bg-grey pr-4 py-4 grid grid-cols-2">
            <div className="flex items-center w-auto">
              {showNASList ? (
                <div>
                  <Button
                    className="text-black"
                    onClick={() => setShowNASList(false)}
                  >
                    <HiOutlineArrowLeft className="h-6 w-6" />
                  </Button>
                </div>
              ) : (
                ""
              )}
            </div>
            <li className="flex justify-end">
              <div className="flex justify-end">
                <div className="relative w-auto">
                  {showNASList ? (
                    ""
                  ) : (
                    <div>
                      {" "}
                      <input
                        type="search"
                        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded border"
                        placeholder="Search Office..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
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
                  )}
                </div>
              </div>
            </li>
          </ul>
          <div>
            {showNASList ? (
              <div>
                <NASList office={selectedOffice} />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 p-6">
                {filteredOffices.map((office, index) => (
                  <button
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md text-left"
                    onClick={() => handleOfficeClick(office)}
                  >
                    <h2 className="text-xl font-semibold">{office.name}</h2>
                    <p className="text-gray-600">
                      Non-Academic Scholars: {office.scholarCount}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
