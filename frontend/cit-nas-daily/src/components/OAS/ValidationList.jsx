import { Avatar } from "flowbite-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ValidationStatusModal } from "./ValidationStatusModal"; // Import the modal

export const ValidationList = () => {
  const [validation, setValidation] = useState([]);
  const [isStatusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedValidationItem, setSelectedValidationItem] = useState(null);

  const formatDateString = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const date = new Date(dateString);
    return date.toLocaleString("en-US", options);
  };

  const viewPDF = (base64String) => {
    const newWindow = window.open();
    newWindow.document.write(
      `<iframe width='100%' height='100%' src='data:application/pdf;base64,${base64String}'></iframe>`
    );
  };

  const openStatusModal = (item) => {
    setSelectedValidationItem(item);
    setStatusModalOpen(true);
  };

  const closeStatusModal = () => {
    setSelectedValidationItem(null);
    setStatusModalOpen(false);
  };

  useEffect(() => {
    const fetchValidation = async () => {
      try {
        const api = axios.create({
          baseURL: "https://localhost:7001/api",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const response = await api.get("/Validation");
        const validationData = await Promise.all(
          response.data.map(async (item) => {
            const nasResponse = await api.get(`/NAS/${item.nasId}`);
            return {
              ...item,
              nasName: nasResponse.data.fullName,
            };
          })
        );

        setValidation(validationData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchValidation();
  }, []);

  const handleSubmit = async (selectedOption, mudHours) => {
    try {
      const api = axios.create({
        baseURL: "https://localhost:7001/api",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const validationId = selectedValidationItem.id;

      // Create an object to send in the PUT request
      const requestData = {
        validationStatus: selectedOption,
        makeUpHours: mudHours,
      };

      // Make the PUT request to update the validation status
      await api.put(`/Validation?validationId=${validationId}`, requestData);

      // Close the modal after the request is successful
      closeStatusModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="grid gap-3">
        {validation.map((item) => (
          <div
            key={item.id}
            className="border border-solid rounded-md p-3 flex items-center justify-between"
          >
            <div className="flex items-center">
              <Avatar rounded />
              <p className="ml-5">
                <span>{item.nasName}</span>
                <br />
                <span className="text-xs">{formatDateString(item.dateSubmitted)}</span>
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="text-white bg-primary hover:bg-primary hover:text-secondary font-medium rounded-lg text-sm px-5 py-2.5 h-[2.6rem]"
                onClick={() => viewPDF(item.nasLetter)}
              >
                View Letter
              </button>
              <button
                type="button"
                className="text-white bg-primary hover:bg-primary hover:text-secondary font-medium rounded-lg text-sm px-5 py-2.5 h-[2.6rem]"
                onClick={() => openStatusModal(item)} // Open the status modal for the specific item
              >
                Update status
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Status Modal */}
      <ValidationStatusModal
        isOpen={isStatusModalOpen}
        closeModal={closeStatusModal}
        handleSubmit={handleSubmit}
        selectedItem={selectedValidationItem}
      />
    </>
  );
};
