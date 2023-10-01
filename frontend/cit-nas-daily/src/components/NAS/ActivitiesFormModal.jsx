"use client";
import PropTypes from "prop-types";
import { Button, Modal } from "flowbite-react";
import { Textarea } from "flowbite-react";

export function ActivitiesFormModal({ isOpen, closeModal }) {
  return (
    <div>
      <Modal show={isOpen} onClose={closeModal}>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div>Activities of the Day</div>
              <Textarea
                color="primary"
                id="comment"
                placeholder="Leave a comment..."
                required
                rows={5}
              />
            </div>
            <div>
              <div>Skills Learned</div>
              <Textarea
                color="primary"
                id="comment"
                placeholder="Leave a comment..."
                required
                rows={5}
              />
            </div>
            <div>
              <div>Values Learned</div>
              <Textarea
                color="primary"
                id="comment"
                placeholder="Leave a comment..."
                required
                rows={5}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={closeModal}>
            Submit
          </Button>
          <Button color="gray" onClick={closeModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

ActivitiesFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
