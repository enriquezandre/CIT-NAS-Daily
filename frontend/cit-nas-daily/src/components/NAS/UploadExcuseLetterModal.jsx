import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "flowbite-react";

export const UploadExcuseLetterModal = ({ isOpen, closeModal, handleSubmit }) => {
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedFileName(selectedFile ? selectedFile.name : null);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleCloseUploadModal = () => {
    setSelectedFileName(null);
    setError("");
    closeModal();
  };

  const handleConfirm = async () => {
    try {
      const selectedFile = fileInputRef.current.files[0];

      if (selectedFile) {
        // Check if the selected file is a PDF
        if (selectedFile.type === "application/pdf") {
          // Convert the selected file to Base64
          const base64String = await fileToBase64(selectedFile);

          // Pass the Base64-encoded string to the handleSubmit function
          handleSubmit(base64String);
          setSelectedFileName(null);
          setError("");
          closeModal();
        } else {
          setError("Invalid file type. Please select a PDF file.");
        }
      } else {
        setError("No file selected");
      }
    } catch (error) {
      console.error("Error during file processing:", error);
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-999 bg-black bg-opacity-50"></div>
      )}
      <Modal show={isOpen} onClose={handleCloseUploadModal} className="rounded-2xl" size={"md"}>
        <Modal.Header
          style={{
            paddingTop: "1em",
            paddingBottom: "1em",
            alignItems: "center",
            borderBottom: "2px solid #c2c4c3",
          }}
        >
          <div>
            <p className="text-center font-bold text-base">Upload Excuse Letter</p>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div>
              <div
                className="border border-gray rounded"
                style={{ width: "20rem", display: "flex", alignItems: "center" }}
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
                <button
                  className="bg-primary text-white py-1 px-5 rounded"
                  style={{ height: "2rem", minWidth: "8rem" }}
                  onClick={handleButtonClick}
                >
                  Choose Files
                </button>
                <span
                  className="ml-3"
                  style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                >
                  {selectedFileName || "No file selected"}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray">Accepted file types: PDF</p>
              </div>
              <div className="pt-3 text-red text-center">
                <p>{error}</p>
              </div>
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
                className="bg-primary text-white py-2 px-6 rounded-full  hover:bg-secondary hover:text-primary"
                onClick={handleCloseUploadModal}
              >
                Cancel
              </button>
            </div>
            <div className="flex m-2">
              <button
                className="bg-primary text-white py-2 px-6 rounded-full  hover:bg-secondary hover:text-primary"
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

UploadExcuseLetterModal.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  handleSubmit: PropTypes.func,
};
