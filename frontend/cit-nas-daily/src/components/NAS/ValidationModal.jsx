import { Modal } from "flowbite-react";
import PropType from "prop-types";
import icon from "../../assets/Vector.png";

export const ValidationModal = ({ isOpen, closeModal, handleSubmit }) => {
  const handleConfirm = () => {
    handleSubmit();
    closeModal();
  };

  return (
    <div>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.3)",
            zIndex: 999,
          }}
        ></div>
      )}
      <Modal
        show={isOpen}
        className="rounded-2xl"
        style={{
          padding: "0",
          zIndex: 1000,
          width: "30rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Modal.Body>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div>
              <img src={icon} alt="infoicon" style={{ width: "35px", height: "35px" }} />
            </div>
            <div className="text-center">
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
          }}
        >
          <div className="flex justify-end items-center">
            <div className="flex m-2">
              <button className="bg-primary text-white py-2 px-6 rounded-full" onClick={closeModal}>
                Cancel
              </button>
            </div>
            <div className="flex m-2">
              <button
                className="bg-primary text-white py-2 px-6 rounded-full"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

ValidationModal.propTypes = {
  isOpen: PropType.bool.isRequired,
  closeModal: PropType.func.isRequired,
  handleSubmit: PropType.func.isRequired,
};
