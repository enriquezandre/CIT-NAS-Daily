"use client";
import { Card, Avatar } from "flowbite-react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const NASList = ({ office }) => {
  const [nasList, setNasList] = useState([]);

  useEffect(() => {
    const fetchNasList = async () => {
      try {
        const api = axios.create({
          baseURL: "https://localhost:7001/api",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const response = await api.get(`/NAS/${office.id}/offices`);
        setNasList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNasList();
  }, [office.id]);

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
    name: PropTypes.string,
  }).isRequired,
};
export default NASList;
