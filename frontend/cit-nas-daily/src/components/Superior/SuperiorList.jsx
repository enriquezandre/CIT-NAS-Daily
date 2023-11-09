"use client";
import { Card, Avatar } from "flowbite-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

export const SuperiorList = () => {
  const { superiorId } = useParams();
  const [nasList, setNasList] = useState([]);
  const [office, setOffice] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNasList = async () => {
      try {
        const api = axios.create({
          baseURL: "https://localhost:7001/api",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const officeresponse = await api.get(`/Offices/${superiorId}`);
        const officeData = officeresponse.data;

        const response = await api.get(`/NAS/${officeData.id}/offices`);

        setOffice(officeData);
        setNasList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNasList();
  }, [superiorId]);

  const handleNasClick = (nasId) => {
    navigate(`/superior/${superiorId}/evaluation/${nasId}`);
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-3/5 m-5">
        <h5 className="text-2xl font-bold tracking-tight">
          <p>{office.name}</p>
        </h5>
        <div className="grid gap-3">
          {nasList.map((nas) => (
            <button
              key={nas.id}
              className="border-solid border-2 p-3 flex items-center hover:bg-grey"
              onClick={() => handleNasClick(nas.id)}
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

SuperiorList.propTypes = {
  office: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
};
export default SuperiorList;
