"use client";
import PropTypes from "prop-types";

export const ShowGrades = ({ show, close, grade }) => {
  return (
    show && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="relative max-w-full max-h-screen">
          <div className="flex flex-col bg-white rounded-lg shadow dark:bg-gray-700 px-8 py-5">
            {grade ? (
              <img
                className="rounded-lg max-h-96"
                src={`data:image/png;base64,${grade}`}
                alt="image description"
              ></img>
            ) : (
              <p className="w-4/5">NAS has not uploaded grades.</p>
            )}
            <button
              type="button"
              className="text-primary hover:underline font-medium text-sm px-20 py-3.5"
              onClick={close}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  );
};

ShowGrades.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  grade: PropTypes.string.isRequired,
};
