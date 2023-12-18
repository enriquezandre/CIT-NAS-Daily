"use client";
import { Card, Avatar } from "flowbite-react";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

export const NASList = ({ office, selectedSY, selectedSem }) => {
  const [nasList, setNasList] = useState([]);
  const oasId = useParams().oasId;
  console.log("OASID:", oasId);
  const navigate = useNavigate();

  const handleNASClick = (nasId) => {
    navigate(`/oas/${oasId}/${nasId}`);
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
    const fetchNasList = async () => {
      try {
        const api = axios.create({
          baseURL: "https://localhost:7001/api",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const response = await api.get(
          `/NAS/${office.id}/${selectedSY}/${getSemesterValue(selectedSem)}`
        );
        console.log(response.data);
        setNasList(response.data.nasEntries);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNasList();
  }, [office.id, selectedSY, selectedSem, getSemesterValue]);

  return (
    <div className="flex justify-center items-center">
      <Card className="w-3/5 m-5">
        <h5 className="text-2xl font-bold tracking-tight">
          <p>{office.officeName}</p>
        </h5>
        <div className="grid gap-3">
          {nasList.map((nas) => (
            <button
              key={nas.id}
              className="border-solid border-2 p-3 flex items-center hover:bg-grey"
              onClick={() => handleNASClick(nas.id)}
            >
              <Avatar rounded />
              <span className="ml-5" style={{ textTransform: "capitalize" }}>
                {nas.firstName} {nas.lastName}
              </span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};

NASList.propTypes = {
  office: PropTypes.shape({
    id: PropTypes.number,
    officeName: PropTypes.string,
  }).isRequired,
  selectedSY: PropTypes.string,
  selectedSem: PropTypes.string,
};
export default NASList;
