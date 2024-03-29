import { Modal } from "flowbite-react";
import { useState } from "react";
import PropTypes from "prop-types";

export const ValidationStatusModal = ({ isOpen, closeModal, handleSubmit }) => {
  const [validationStatus, setvalidationStatus] = useState(0);
  const [mudHours, setMudHours] = useState(0); // Add state for the input value

  const ValidationStatus = {
    Pending: 0,
    Excused: 1,
    Unexcused: 2,
    "For Make-up Duty": 3,
    Approved: 4,
    Disapproved: 5,
    Warning: 6,
    LastWarning: 7,
    "Report To Office": 8,
  };

  const handleStatusChange = (e) => {
    const selectedStatus = Number(e.target.value);
    setvalidationStatus(selectedStatus);

    // If the selected status is not "For Make-up Duty," set mudHours to 0
    if (selectedStatus !== 3) {
      setMudHours(0);
    }
  };

  const handleCancel = () => {
    closeModal();
    resetInput();
  };

  const resetInput = () => {
    setvalidationStatus(0);
    setMudHours(0);
  };

  const handleMudHoursChange = (e) => {
    setMudHours(e.target.value);
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-999 bg-black bg-opacity-50"></div>
      )}
      <Modal
        dismissible
        show={isOpen}
        className="rounded-1xl"
        position={"center"}
        onClose={handleCancel}
        size={"md"}
      >
        <Modal.Header
          style={{
            paddingTop: "1em",
            paddingBottom: "1em",
            alignItems: "center",
            borderBottom: "2px solid #c2c4c3",
          }}
        >
          <div>
            <p className="text-center font-bold text-base">Update Validation Status</p>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div className="pb-5">
                <p className="pr-3">Status: </p>
                <select
                  className="p-2 border border-solid rounded-md h-[2.6rem] w-[11rem] bg-[#ebeced]"
                  value={validationStatus}
                  onChange={handleStatusChange}
                >
                  {Object.entries(ValidationStatus).map(([status, value]) => (
                    <option key={value} value={value}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div
                className={`pb-5 ${validationStatus !== 3 ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <p>Make-up duty hours:</p>
                <input
                  type="text"
                  value={mudHours}
                  id="mudHours"
                  onChange={handleMudHoursChange}
                  className="p-2 border border-solid rounded-md h-[2.6rem] w-[11rem] bg-[#ffffff]"
                  placeholder="No. of hours"
                  disabled={validationStatus !== 3}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-center items-center">
                <div className="flex m-2">
                  <button
                    className="bg-primary text-white py-2 px-6 rounded-full hover:bg-secondary hover:text-primary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
                <div className="flex m-2">
                  <button
                    className="bg-primary text-white py-2 px-6 rounded-full hover:bg-secondary hover:text-primary"
                    onClick={() => handleSubmit(validationStatus, mudHours)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

ValidationStatusModal.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  handleSubmit: PropTypes.func,
};
