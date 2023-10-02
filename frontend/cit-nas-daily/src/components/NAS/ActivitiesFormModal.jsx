"use client";
import PropTypes from "prop-types";
import { Modal } from "flowbite-react";

export function ActivitiesFormModal({ isOpen, closeModal }) {
  return (
    <div>
      <Modal show={isOpen} onClose={closeModal}>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="font-bold text-lg">Activities of the Day</div>
              <div className="mt-4">
                <textarea
                  className="border border-black p-2 w-full h-32" // You can adjust the height here
                  placeholder="Enter your activities done for the day"
                ></textarea>
              </div>
            </div>
            <div>
              <div className="font-bold text-lg">Skills Learned</div>
              <div className="mt-4">
                <textarea
                  className="border border-black p-2 w-full h-32" // You can adjust the height here
                  placeholder="Enter the skills you learned"
                ></textarea>
              </div>
            </div>
            <div>
              <div className="font-bold text-lg">Values Learned</div>
              <div className="mt-4">
                <textarea
                  className="border border-black p-2 w-full h-32" // You can adjust the height here
                  placeholder="Enter the values you learned"
                ></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bg-primary text-white py-2 px-4 rounded"
            onClick={closeModal}
          >
            Submit
          </button>
          <button
            className="bg-primary text-white py-2 px-4 rounded"
            color="gray"
            onClick={closeModal}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

ActivitiesFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
