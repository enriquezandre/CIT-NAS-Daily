import { Modal } from "flowbite-react";
import icon from "../../assets/Vector.png";
import PropType from "prop-types";

export const ConfirmAddScheduleModal = ({ isOpen, closeModal, handleSubmit }) => {
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
      <Modal show={isOpen} className="rounded-2xl p-0 z-[1000] w-full">
        <Modal.Body>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div>
              <img src={icon} alt="infoicon" style={{ width: "35px", height: "35px" }} />
            </div>
            <div className="text-center pt-3">
              <p className="font-semibold text-lg">Do you want to delete this schedule?</p>
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

ConfirmAddScheduleModal.propTypes = {
  isOpen: PropType.bool.isRequired,
  closeModal: PropType.func.isRequired,
  handleSubmit: PropType.func.isRequired,
};
