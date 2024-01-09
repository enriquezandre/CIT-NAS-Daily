import { Modal } from "flowbite-react";
import { useState } from "react";
import PropType from "prop-types";

export const UploadImageModal = ({ isModalOpen, closeModal, handleAvatarChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const handleCancel = () => {
    setError("");
    closeModal();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      console.log("Selected file:", file);
      // Check if the file size is less than 500 KB (in bytes)
      const maxSizeInBytes = 500 * 1024; // 500 KB

      if (file.size > maxSizeInBytes) {
        // Show an alert and return without setting the selectedFile
        setError("File size must be less than 500KB.");
        return;
      }

      // Set the selectedFile if the size is within the limit
      setSelectedFile(file);
    }
  };

  const handleConfirm = async () => {
    console.log("Handling confirm with file:", selectedFile);
    handleAvatarChange(selectedFile);
    closeModal();
  };

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-999 bg-black bg-opacity-50"></div>
      )}
      <Modal
        show={isModalOpen}
        onClose={handleCancel}
        className="rounded-2xl"
        style={{
          padding: "0",
          zIndex: 1000,
          maxWidth: "30rem",
          width: "100%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Modal.Header style={{ paddingTop: "1em", paddingBottom: "1em", alignItems: "center" }}>
          <div>
            <p className="text-center font-bold text-base">Upload Profile Picture</p>
          </div>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="avatar-square"
              style={{ width: "100px", height: "100px", border: "2px solid gray" }}
            >
              {selectedFile && (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  className="avatar-image"
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </div>
            <div className="ml-3" style={{ width: "15rem" }}>
              <label
                className="rounded bg-primary text-white"
                htmlFor="fileInput"
                style={{
                  cursor: "pointer",
                  display: "inline-block",
                  padding: "5px 10px",
                }}
              >
                Choose image
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </label>

              <p className="pb-3 text-gray">PNG or JPG (MAX: 500KB).</p>
              <p className=" text-red">{error}</p>
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
                className="bg-primary text-white py-2 px-5 rounded-full  hover:bg-secondary hover:text-primary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
            <div className="flex">
              <button
                className="bg-primary text-white py-2 px-5 rounded-full  hover:bg-secondary hover:text-primary"
                onClick={handleConfirm}
              >
                Upload Photo
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

UploadImageModal.propTypes = {
  isModalOpen: PropType.bool.isRequired,
  closeModal: PropType.func.isRequired,
  handleAvatarChange: PropType.func.isRequired,
};
