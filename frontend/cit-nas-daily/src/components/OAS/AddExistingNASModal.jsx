"use client";
import PropTypes from "prop-types";
import { Table } from "flowbite-react";
import { useState, useEffect, useMemo } from "react";
import { Modal } from "flowbite-react";
import { Dropdown } from "../Dropdown";
import axios from "axios";

export const AddExistingNASModal = ({ isOpen, closeModal, toaddSY, toaddSem, onSubmitted }) => {
  // eslint-disable-next-line no-unused-vars
  const [syOptions, setSyOptions] = useState([]);
  const [currentNasList, setCurrentNasList] = useState([]);
  const [nasData, setNasData] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);
  const [selectedSY, setSelectedSY] = useState(toaddSY);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedSem, setSelectedSem] = useState("First");
  const sem_options = ["First", "Second", "Summer"];

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

  //fetches list of NAS to be add on that sy and sem
  useEffect(() => {
    const fetchNas = async () => {
      try {
        const nasresponse = await api.get(
          `/NAS/${selectedSY}/${getSemesterValue(selectedSem)}/noimg`
        );
        const nasData = nasresponse.data;
        setNasData(nasData);
        console.log("nasData", nasData);
      } catch (error) {
        console.error(error);
        if (error.response.status === 404) {
          setNasData([]);
        }
      }
    };

    fetchNas();
  }, [toaddSY, toaddSem, selectedSY, selectedSem, api, getSemesterValue, onSubmitted]);

  //fetches list of current NAS in that sy and sem
  useEffect(() => {
    const fetchCurrentNAS = async () => {
      setCurrentNasList([]);
      try {
        const currentnasresponse = await api.get(
          `/NAS/${toaddSY}/${getSemesterValue(toaddSem)}/noimg`
        );
        const currentnas = currentnasresponse.data;
        setCurrentNasList(currentnas);
        console.log("currentnas", currentnas);
      } catch (error) {
        console.error(error);
        if (error.response.status === 404) {
          setNasData([]);
        }
      }
    };

    fetchCurrentNAS();
  }, [toaddSY, toaddSem, api, getSemesterValue, onSubmitted]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      nasIds: selectedIds,
      semester: getSemesterValue(toaddSem),
      year: toaddSY,
    };
    console.log("DATA", data);
    try {
      const response = await api.put(`https://localhost:7001/api/NAS`, data);
      console.log(response);
      onSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectSY = (event) => {
    const value = event.target.value;
    setSelectedSY(value);
  };

  const handleSelectSem = (event) => {
    const value = event.target.value;
    setSelectedSem(value);
  };

  const handleCheckboxClick = (id) => {
    setSelectedIds((prevSelectedIds) => {
      // Check if the id is already selected
      if (prevSelectedIds.includes(id)) {
        // If it is, remove it from the array
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        // If it's not, add it to the array
        return [...prevSelectedIds, id].sort((a, b) => a - b);
      }
    });
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-999 bg-black bg-opacity-50"></div>
      )}
      <Modal show={isOpen} onClose={closeModal}>
        <Modal.Body className="w-full">
          <div className="flex flex-row justify-start items-center gap-10 w-auto">
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
          <Table hoverable className="border mt-5 items-center">
            <Table.Head className="border">
              <Table.HeadCell className="text-center border w-1">Select</Table.HeadCell>
              <Table.HeadCell className="text-center border w-24">ID No.</Table.HeadCell>
              <Table.HeadCell className="text-center border p-2 w-60">Name</Table.HeadCell>
              <Table.HeadCell className="text-center border w-36">Office</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {nasData
                .filter((data) => !currentNasList.find((currentData) => currentData.id === data.id))
                .map((index) => (
                  <Table.Row key={index.id}>
                    <Table.Cell className="text-center text-xs border p-3">
                      <input type="checkbox" onChange={() => handleCheckboxClick(index.id)} />
                    </Table.Cell>
                    <Table.Cell
                      className="text-center text-xs border p-3"
                      style={{ overflowWrap: "break-word", maxWidth: "100px" }}
                    >
                      {index.studentIDNo}
                    </Table.Cell>
                    <Table.Cell
                      className="text-center text-xs border"
                      style={{ overflowWrap: "break-word", maxWidth: "100px" }}
                    >
                      {index.fullName}
                    </Table.Cell>
                    <Table.Cell
                      className="text-center text-xs border p-3"
                      style={{ overflowWrap: "break-word", maxWidth: "100px" }}
                    >
                      {index.officeName}
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded text-xs"
            onClick={(event) => {
              closeModal();
              handleSubmit(event);
              setSelectedIds([]);
            }}
          >
            Submit
          </button>
          <button
            className="bg-primary text-white py-2 px-4 rounded text-xs"
            color="gray"
            onClick={() => {
              closeModal();
              setSelectedIds([]);
            }}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

AddExistingNASModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  toaddSY: PropTypes.string.isRequired,
  toaddSem: PropTypes.string.isRequired,
  onSubmitted: PropTypes.func.isRequired,
};
