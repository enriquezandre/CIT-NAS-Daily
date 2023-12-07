"use client";
import PropTypes from "prop-types";
import { Modal } from "flowbite-react";
import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const ActivitiesFormModal = ({ isOpen, closeModal, selectedSY, selectedSem }) => {
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
          return 3;
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
        `https://localhost:7001/api/ActivitiesSummary/${nasId}/${selectedSY}/${getSemesterValue(
          selectedSem
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
      <Modal show={isOpen} onClose={closeModal}>
        <Modal.Body>
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
        <Modal.Footer>
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded"
            onClick={(event) => {
              closeModal();
              handleSubmit(event);
            }}
          >
            Submit
          </button>
          <button
            className="bg-primary text-white py-2 px-4 rounded"
            color="gray"
            onClick={closeModal}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

ActivitiesFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  selectedSY: PropTypes.string.isRequired,
  selectedSem: PropTypes.string.isRequired,
};
