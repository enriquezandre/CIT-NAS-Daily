"use client";
import PropTypes from "prop-types";
import { Modal } from "flowbite-react";
import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const ActivitiesFormModal = ({ isOpen, closeModal, currentYear, currentSem }) => {
  const { nasId } = useParams();
  const [activitiesOfTheDay, setActivitiesOfTheDay] = useState("");
  const [skillsLearned, setSkillsLearned] = useState("");
  const [valuesLearned, setValuesLearned] = useState("");

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const api = axios.create({
        baseURL: "https://localhost:7001/api",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const response = await api.post(
        `https://localhost:7001/api/ActivitiesSummary/${nasId}/${currentYear}/${getSemesterValue(
          currentSem
        )}`,
        {
          activitiesOfTheDay,
          skillsLearned,
          valuesLearned,
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-999 bg-black bg-opacity-50"></div>
      )}
      <Modal show={isOpen} onClose={closeModal}>
        <Modal.Header
          style={{
            paddingTop: "1em",
            paddingBottom: "1em",
            alignItems: "center",
            borderBottom: "2px solid #c2c4c3",
          }}
        >
          <div>
            <p className="text-center font-bold">NSWA Form</p>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-row justify-start items-center gap-10 mb-6">
            <div className="flex flex-row gap-2 items-center">
              <div className="mr-2">SY:</div>
              <select
                id="sy"
                name="sy"
                className=" w-full text-base border rounded-md"
                style={{ width: "7rem" }}
                disabled
              >
                <option>{currentYear}</option>
              </select>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <div className="mr-2">SEMESTER:</div>
              <select
                id="sem"
                name="sem"
                className="w-full text-base border rounded-md"
                style={{ width: "7rem" }}
                disabled
              >
                <option>{currentSem}</option>
              </select>
            </div>
          </div>
          <div className="space-y-6 bg-[url('/src/assets/CIT.png')] bg-cover bg-center">
            <div>
              <div className="font-bold text-lg">Activities of the Day</div>
              <div className="mt-4">
                <textarea
                  className="border border-black p-2 w-full h-32 bg-transparent"
                  placeholder="Enter your activities done for the day"
                  value={activitiesOfTheDay}
                  onChange={(e) => setActivitiesOfTheDay(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div>
              <div className="font-bold text-lg">Skills Learned</div>
              <div className="mt-4">
                <textarea
                  className="border border-black p-2 w-full h-32 bg-transparent"
                  placeholder="Enter the skills you learned"
                  value={skillsLearned}
                  onChange={(e) => setSkillsLearned(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div>
              <div className="font-bold text-lg">Values Learned</div>
              <div className="mt-4">
                <textarea
                  className="border border-black p-2 w-full h-32 bg-transparent"
                  placeholder="Enter the values you learned"
                  value={valuesLearned}
                  onChange={(e) => setValuesLearned(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{
            paddingTop: "1rem",
            paddingBottom: "1rem",
            display: "flex",
            justifyContent: "flex-end",
            borderTop: "2px solid #c2c4c3",
          }}
        >
          <button
            className="bg-primary text-white py-2 px-6 rounded-full  hover:bg-secondary hover:text-primary"
            color="gray"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary text-white py-2 px-6 rounded-full  hover:bg-secondary hover:text-primary"
            onClick={(event) => {
              closeModal();
              handleSubmit(event);
            }}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

ActivitiesFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  currentYear: PropTypes.string.isRequired,
  currentSem: PropTypes.string.isRequired,
};
