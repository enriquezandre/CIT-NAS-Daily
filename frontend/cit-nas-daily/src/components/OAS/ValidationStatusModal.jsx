import { Modal } from "flowbite-react";

export const ValidationStatusModal = ({ isOpen, closeModal, handleSubmit }) => {
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
            <div className="text-center pt-3">
              <p className="font-bold text-lg">Confirm schedule?</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
