import { useState } from "react";
import { Modal } from "flowbite-react";
import PropType from "prop-types";
import icon from "../../assets/Vector.png";
import { UploadExcuseLetterModal } from "./UploadExcuseLetterModal";

export const ValidationModal = ({ isOpen, closeModal, handleSubmit }) => {
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const handleYes = () => {
    setConfirmationModalOpen(true);
    closeModal();
  };

  const handleCloseValidationModal = () => {
    setConfirmationModalOpen(false);
    closeModal();
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-999 bg-black bg-opacity-50"></div>
      )}
      <Modal show={isOpen} className="rounded-2xl" size={"md"}>
        <Modal.Body>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div>
              <img src={icon} alt="infoicon" style={{ width: "35px", height: "35px" }} />
            </div>
            <div className="text-center pt-3">
              <p className="font-bold text-lg">Appeal to the</p>
              <p className="font-bold text-lg">Office of Admission and Scholarships?</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{
            paddingTop: "0.3rem",
            paddingBottom: "0.3rem",
            display: "flex",
            justifyContent: "flex-end",
            borderTop: "2px solid #c2c4c3",
          }}
        >
          <div className="flex justify-end items-center">
            <div className="flex m-2">
              <button
                className="bg-primary text-white py-2 px-6 rounded-full hover:bg-secondary hover:text-primary"
                onClick={closeModal}
              >
                No
              </button>
            </div>
            <div className="flex m-2">
              <button
                className="bg-primary text-white py-2 px-6 rounded-full hover:bg-secondary hover:text-primary"
                onClick={handleYes}
              >
                Yes
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
      <UploadExcuseLetterModal
        isOpen={isConfirmationModalOpen}
        closeModal={handleCloseValidationModal}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

ValidationModal.propTypes = {
  isOpen: PropType.bool.isRequired,
  closeModal: PropType.func.isRequired,
  handleSubmit: PropType.func.isRequired,
};
