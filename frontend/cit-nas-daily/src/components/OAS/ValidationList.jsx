import { Avatar } from "flowbite-react";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { ValidationStatusModal } from "./ValidationStatusModal"; // Import the modal
import placeholder from "../../placeholders/user.png";
import { Snackbar } from "../Snackbar";

export const ValidationList = ({ searchQuery, selectedSem, selectedSy }) => {
  const [validation, setValidation] = useState([]);
  const [isStatusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedValidationItem, setSelectedValidationItem] = useState(null);
  const [nasImages, setNasImages] = useState({}); //added for image
  const [isFirstSubmitted, setFirstIsSubmitted] = useState(false);
  const [isFirstSnackbarVisible, setFirstSnackbarVisible] = useState(false);
  const [firstSnackbarMsg, setFirstSnackbarMsg] = useState("");
  const [isScndSubmitted, setScndIsSubmitted] = useState(false);
  const [isScndSnackbarVisible, setScndSnackbarVisible] = useState(false);
  const [scndSnackbarMsg, setScndSnackbarMsg] = useState("");

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

  const formatDateString = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
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

  const fetchValidation = async () => {
    try {
      const response = await api.get("/Validation");

      // Filter the data based on selected semester and school year
      const filteredData = response.data.filter(
        (item) =>
          item.validationStatus === 0 &&
          item.semester === getSemesterValue(selectedSem) &&
          item.schoolYear === parseInt(selectedSy)
      );

      const validationData = await Promise.all(
        filteredData.map(async (item) => {
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

  useEffect(() => {
    fetchValidation();
  }, [selectedSem, selectedSy]);

  const handleSubmit = async (validationStatus, mudHours) => {
    try {
      const validationId = selectedValidationItem.id;

      const requestData = {
        validationStatus: validationStatus,
        makeUpHours: mudHours,
      };

      const response = await api.put(`/Validation?validationId=${validationId}`, requestData);

      if (response.status === 200 || response.status === 201) {
        setFirstIsSubmitted(true);
        setFirstSnackbarVisible(true);
        setFirstSnackbarMsg("Status updated successfully!");
        updateNasTimekeeping(selectedValidationItem.nasId);
        closeStatusModal();
      } else {
        setFirstSnackbarVisible(true);
        setFirstSnackbarMsg("Status update failed.");
      }
      fetchValidation();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredValidation = validation.filter((item) =>
    item.nasName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateNasTimekeeping = async (nasId) => {
    try {
      const validationResponse = await api.get(`/Validation/nas/${nasId}`);
      const filteredValidation = validationResponse.data.filter(
        (item) =>
          item.semester === getSemesterValue(selectedSem) &&
          item.schoolYear === parseInt(selectedSy)
      );

      let excusedCount = 0;
      let unexcusedCount = 0;
      let forMakeUpDutyCount = 0;
      filteredValidation.forEach((item) => {
        if (item.validationStatus === 1) {
          excusedCount = excusedCount + 1;
        } else if (item.validationStatus === 2) {
          unexcusedCount = unexcusedCount + 1;
        } else if (item.validationStatus === 3) {
          forMakeUpDutyCount = forMakeUpDutyCount + item.makeUpHours;
        }
      });

      const updatedExcusedCount = excusedCount;
      const updatedUnexcusedCount = unexcusedCount;
      const updatedMakeUpDutyHours = forMakeUpDutyCount;

      const updateData = {
        excused: updatedExcusedCount,
        unexcused: updatedUnexcusedCount,
        makeUpDutyHours: updatedMakeUpDutyHours,
      };

      const updateResponse = await api.put(
        `/TimekeepingSummary/${nasId}/${selectedSy}/${getSemesterValue(selectedSem)}`,
        updateData
      );

      if (updateResponse.status === 200 || updateResponse.status === 201) {
        // Display the second snackbar for successful status update
        setScndIsSubmitted(true);
        setScndSnackbarVisible(true);
        setScndSnackbarMsg("Timekeeping updated!");
      } else {
        // Display the second snackbar for status update failure
        setScndSnackbarVisible(true);
        setScndSnackbarMsg("Timekeeping not updated.");
      }
      fetchValidation();
    } catch (error) {
      // Display the second snackbar for an error during status update
      setScndSnackbarVisible(true);
      setScndSnackbarMsg("An error occurred.");
    }
  };

  //added for image
  const getImage = async (nasId) => {
    try {
      const api = axios.create({
        baseURL: "https://localhost:7001/api",
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
      const imagePromises = validation.map(async (item) => {
        const image = await getImage(item.nasId);
        return { id: item.nasId, image };
      });

      const images = await Promise.all(imagePromises);
      const imageMap = images.reduce((acc, { id, image }) => {
        acc[id] = image;
        return acc;
      }, {});

      setNasImages(imageMap);
    };

    fetchNasImages();
  }, [validation]);

  const handleFirstSnackbarClose = () => {
    setFirstSnackbarVisible(false);
  };

  const handleScndSnackbarClose = () => {
    setScndSnackbarVisible(false);
  };

  return (
    <>
      <div className="grid gap-3">
        {filteredValidation.map((item) => (
          <div
            key={item.id}
            className="border border-solid rounded-md p-3 flex items-center justify-between"
          >
            <div className="flex items-center">
              <Avatar
                img={
                  nasImages[item.nasId]
                    ? `data:image/png;base64,${nasImages[item.nasId]}`
                    : placeholder
                }
                rounded
              />
              <p className="ml-5">
                <span>{item.nasName}</span>
                <br />
                <span className="text-xs">
                  Submission Date: {formatDateString(item.dateSubmitted)}, Absent Date:{" "}
                  {formatDateString(item.absenceDate)}
                </span>
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
      {/*Update Status Modal */}
      <ValidationStatusModal
        isOpen={isStatusModalOpen}
        closeModal={closeStatusModal}
        handleSubmit={handleSubmit}
        selectedItem={selectedValidationItem}
      />
      <Snackbar
        message={firstSnackbarMsg}
        onClose={handleFirstSnackbarClose}
        isSnackbarVisible={isFirstSnackbarVisible}
        isSubmitted={isFirstSubmitted}
      />
      <Snackbar
        message={scndSnackbarMsg}
        onClose={handleScndSnackbarClose}
        isSnackbarVisible={isScndSnackbarVisible}
        isSubmitted={isScndSubmitted}
      />
    </>
  );
};

ValidationList.propTypes = {
  searchQuery: PropTypes.string,
  selectedSem: PropTypes.string,
  selectedSy: PropTypes.string,
};
