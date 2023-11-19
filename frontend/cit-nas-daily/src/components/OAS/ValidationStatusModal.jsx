import { Modal } from "flowbite-react";
import { useState } from "react";

export const ValidationStatusModal = ({ isOpen, closeModal, handleSubmit }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [mudHours, setMudHours] = useState(0); // Add state for the input value

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleMudHoursChange = (e) => {
    setMudHours(e.target.value);
  };

  return (
    <div>
      {isOpen && (
        <div
          id="modal-overlay"
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
          width: "35rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Modal.Header className="text-center">Update letter status</Modal.Header>
        <Modal.Body>
          <div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div className="pb-5">
                <p className="pr-3">Status: </p>
                <select
                  value={selectedOption}
                  onChange={handleOptionChange}
                  className="p-2 border border-solid rounded-md h-[2.6rem] w-[11rem] bg-[#ebeced]"
                >
                  <option value="">Choose Response</option>
                  <option value="excused">Excused</option>
                  <option value="unexcused">Unexcused</option>
                  <option value="formakeupduty">For Make Up Duty</option>
                  <option value="approved">Approved</option>
                  <option value="disapproved">Disapproved</option>
                  <option value="warning">Warning</option>
                  <option value="lastwarning">Last Warning</option>
                  <option value="report">Report to Office</option>
                </select>
              </div>
              <div className="pb-5">
                <p className="pr-3">Make-up duty hours: </p>
                <input
                  type="text"
                  value={mudHours}
                  onChange={handleMudHoursChange}
                  className="p-2 border border-solid rounded-md h-[2.6rem] w-[11rem] bg-[#ffffff]"
                  placeholder="No. of hours"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-center items-center">
                <div className="flex m-2">
                  <button
                    className="bg-primary text-white py-2 px-6 rounded-full hover:bg-secondary hover:text-primary"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
                <div className="flex m-2">
                  <button
                    className="bg-primary text-white py-2 px-6 rounded-full hover:bg-secondary hover:text-primary"
                    onClick={handleSubmit}
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
