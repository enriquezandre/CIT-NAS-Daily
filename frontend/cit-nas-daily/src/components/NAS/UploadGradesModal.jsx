import { useRef } from "react";
import PropTypes from "prop-types";
import { Modal } from "flowbite-react";

export const UploadGradesModal = ({ isOpen, closeModal }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log("Selected file:", selectedFile);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      {isOpen && (
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
              <div className="pb-5"></div>
              <div className="text-left">
                <p className="font-bold text-lg">Upload Excuse letter</p>
              </div>
              <div className="pt-5">
                <input
                  type="file"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
                <button className="bg-primary text-white py-2 px-5" onClick={handleButtonClick}>
                  Choose Files
                </button>
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
                  className="bg-primary text-white py-2 px-6 rounded-full"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
              <div className="flex m-2">
                <button
                  className="bg-primary text-white py-2 px-6 rounded-full"
                  // onClick={handleConfirm}
                >
                  Submit
                </button>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

UploadGradesModal.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
};
