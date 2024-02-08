"use client";
import { Card, Avatar } from "flowbite-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "../../components/Dropdown.jsx";
import axios from "axios";

export const SuperiorList = () => {
  const { superiorId } = useParams();
  const [nasList, setNasList] = useState([]);
  const [office, setOffice] = useState({});
  const [selectedSY, setSelectedSY] = useState(2324);
  const [selectedSem, setSelectedSem] = useState("First");
  // eslint-disable-next-line no-unused-vars
  const [syOptions, setSyOptions] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);
  const sem_options = ["First", "Second", "Summer"];
  const navigate = useNavigate();

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
    const fetchSchoolYearSemesterOptions = async () => {
      try {
        const api = axios.create({
          baseURL: "https://localhost:7001/api",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

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
  }, []);

  useEffect(() => {
    const fetchNasList = async () => {
      try {
        const api = axios.create({
          baseURL: "https://localhost:7001/api",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const officeresponse = await api.get(`/Offices/superior/${superiorId}`);
        const officeData = officeresponse.data;

        const response = await api.get(
          `/NAS/${officeData.id}/${selectedSY}/${getSemesterValue(selectedSem)}`
        );

        setOffice(officeData);
        setNasList(response.data.nasEntries);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNasList();
  }, [superiorId, selectedSY, selectedSem]);

  const handleNasClick = (nasId) => {
    navigate(`/superior/${superiorId}/evaluation/${nasId}`);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-start sm:items-center gap-3 lg:gap-10">
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
            label="SEMESTER"
            options={sem_options}
            selectedValue={selectedSem}
            onChange={(e) => handleSelectSem(e)}
          />
        </div>
      </div>
      <div className="flex justify-center items-center pt-2">
        <Card className=" w-full md:w-3/5 m-5">
          <h5 className="text-2xl font-bold tracking-tight">
            <p>{office.officeName}</p>
          </h5>
          <div className="grid gap-3 overflow-x-auto">
            {nasList.map((nas) => (
              <button
                key={nas.id}
                className="border-solid border-2 p-3 flex items-center hover:bg-grey"
                onClick={() => handleNasClick(nas.id)}
              >
                <Avatar rounded />
                <span className="ml-5 text-xs sm:text-base" style={{ textTransform: "capitalize" }}>
                  {nas.firstName} {nas.lastName}
                </span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SuperiorList;
