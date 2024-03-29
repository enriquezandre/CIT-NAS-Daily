"use client";
import { Card, Avatar } from "flowbite-react";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import placeholder from "../placeholders/user.png";

export const NASList = ({ office, selectedSY, selectedSem }) => {
  const [nasList, setNasList] = useState([]);
  const [nasImages, setNasImages] = useState({}); //added for image
  const oasId = useParams().oasId;
  const navigate = useNavigate();
  const url = import.meta.env.VITE_APP_API_URL;

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
          baseURL: `${url}/api`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const response = await api.get(
          `/NAS/${office.id}/${selectedSY}/${getSemesterValue(selectedSem)}`
        );
        setNasList(response.data.nasEntries);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNasList();
  }, [office.id, selectedSY, selectedSem, url, getSemesterValue]);

  //added for image
  const getImage = async (nasId) => {
    try {
      const api = axios.create({
        baseURL: `${url}/api`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const response = await api.get(`/NAS/${nasId}`);
      return response.data.image;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  //added for image
  useEffect(() => {
    const fetchNasImages = async () => {
      const imagePromises = nasList.map(async (nas) => {
        const image = await getImage(nas.id);
        return { id: nas.id, image };
      });

      const images = await Promise.all(imagePromises);
      const imageMap = images.reduce((acc, { id, image }) => {
        acc[id] = image;
        return acc;
      }, {});

      setNasImages(imageMap);
    };

    fetchNasImages();
  }, [nasList]);

  const handleNASClick = (nasId) => {
    navigate(`/oas/${oasId}/${nasId}`);
  };

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
              {nasImages[nas.id] ? ( //added for image
                <Avatar img={`data:image/png;base64,${nasImages[nas.id]}`} rounded />
              ) : (
                <Avatar img={placeholder} rounded />
              )}
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
