import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "flowbite-react";

export const UploadGradesModal = ({ isOpen, closeModal, handleSubmit }) => {
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log("Selected file:", selectedFile);
    setSelectedFileName(selectedFile ? selectedFile.name : null);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleConfirm = () => {
    // Add any additional logic or validation before calling handleSubmit
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
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div>
              <p className="font-bold text-lg">Upload Excuse Letter</p>
            </div>
            <div className="pt-5">
              <input
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              <button className="bg-primary text-white py-1 px-5" onClick={handleButtonClick}>
                Choose Files
              </button>
              <span className="ml-3">{selectedFileName || "No file selected"}</span>
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
                Submit
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

UploadGradesModal.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  handleSubmit: PropTypes.func,
};
