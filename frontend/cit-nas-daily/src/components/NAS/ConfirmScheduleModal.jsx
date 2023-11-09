import React from 'react';
import { Modal } from "flowbite-react";

const modalStyle = {
  padding: '0',
  zIndex: 1000,
};

const footerStyle = {
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  display: 'flex',
  justifyContent: 'flex-end',
};

export const ScheduleModal = ({ isOpen, closeModal, handleSubmit }) => {
  const handleConfirm = () => {
    handleSubmit(); // Call your submit function
    closeModal();  // Close the modal after submitting
  };

  return (
    <div>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.3)',
            zIndex: 999,
          }}
        ></div>
      )}
      <Modal show={isOpen} className="rounded-lg" style={modalStyle}>
        <Modal.Body>
          <div>
            <div className="text-center">
              <p className="font-bold text-lg">Confirm schedule?</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={footerStyle}>
          <div className="flex justify-end items-center">
            <div className="flex m-2">
              <button className="bg-primary text-white py-2 px-6 rounded-full" onClick={closeModal}>
                Cancel
              </button>
            </div>
            <div className="flex m-2">
              <button className="bg-primary text-white py-2 px-6 rounded-full" onClick={handleConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
