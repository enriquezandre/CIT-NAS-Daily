"use client";
import PropTypes from "prop-types";
import { useState } from "react";
import { ShowGrades } from "./ShowGrades";

export const EvaluateGrades = ({ show, close, grade, nasId, handleSubmit }) => {
  const [isViewingShowGrades, setIsViewingShowGrades] = useState(false);
  const [numCoursesFailed, setNumCoursesFailed] = useState(0);
  const [allCoursesPassed, setAllCoursesPassed] = useState(true);
  const [enrollmentAllowed, setEnrollmentAllowed] = useState(null);

  const handleCoursePassedChange = (event) => {
    const value = event.target.value;
    setAllCoursesPassed(value === "yes");
  };

  const handleCoursesFailed = (event) => {
    const value = event.target.value;
    setNumCoursesFailed(value);
  };

  const handleAllowEnrollment = (event) => {
    const value = event.target.value;
    setEnrollmentAllowed(value === "yes");
  };

  const handleGoBack = () => {
    setAllCoursesPassed(true);
    setNumCoursesFailed(0);
    setEnrollmentAllowed(null);
    close();
  };

  const openShowGrades = () => {
    setIsViewingShowGrades(true);
  };

  const closeShowGrades = () => {
    setIsViewingShowGrades(false);
  };

  return (
    show && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="relative w-full sm:w-4/6 sm:max-w-md h-auto sm:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="bg-opacity-50">
              <div className="flex flex-col items-center justify-center px-8 sm:px-12 py-6 sm:py-10 rounded-t">
                <p className="text-xl sm:text-lg text-center w-full font-bold text-primary">
                  GRADE EVALUATION
                </p>
                <button
                  type="button"
                  className="text-white bg-primary hover:bg-secondary hover:text-primary font-medium rounded-lg text-xs sm:text-sm px-4 sm:px-5 py-2 my-6 sm:my-10"
                  onClick={openShowGrades}
                >
                  EVALUATE GRADES
                </button>
                <ShowGrades show={isViewingShowGrades} close={closeShowGrades} grade={grade} />
                <div className="flex flex-col sm:flex-row w-full sm:items-center gap-4 mb-6 sm:mb-10">
                  <p className="text-base sm:text-lg text-left w-full sm:w-2/4">
                    ALL COURSES PASSED:
                  </p>
                  <div className="flex flex-row gap-2 justify-center items-center w-full sm:w-1/4">
                    <input
                      id="default-radio-1"
                      type="radio"
                      value="yes"
                      name="course-passed"
                      className="h-4 w-4 sm:h-5 sm:w-5"
                      onChange={handleCoursePassedChange}
                    />
                    <label
                      htmlFor="default-radio-1"
                      className="ml-2 text-base sm:text-lg font-medium text-green"
                    >
                      YES
                    </label>
                  </div>
                  <div className="flex flex-row gap-2 justify-center items-center w-full sm:w-1/4">
                    <input
                      id="default-radio-2"
                      type="radio"
                      value="no"
                      name="course-passed"
                      className="h-4 w-4 sm:h-5 sm:w-5"
                      onChange={handleCoursePassedChange}
                    />
                    <label
                      htmlFor="default-radio-2"
                      className="ml-2 text-base sm:text-lg font-medium text-red"
                    >
                      NO
                    </label>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row w-full sm:items-center gap-4 mb-6 sm:mb-10">
                  <p className="text-base sm:text-lg text-left w-full sm:w-2/4">
                    ALLOW ENROLLMENT:
                  </p>
                  <div className="flex flex-row gap-2 justify-center items-center w-full sm:w-1/4">
                    <input
                      id="default-radio-1"
                      type="radio"
                      value="yes"
                      name="allow-enroll"
                      className="h-4 w-4 sm:h-5 sm:w-5"
                      onChange={handleAllowEnrollment}
                    />
                    <label
                      htmlFor="default-radio-1"
                      className="ml-2 text-base sm:text-lg font-medium text-green"
                    >
                      YES
                    </label>
                  </div>
                  <div className="flex flex-row gap-2 justify-center items-center w-full sm:w-1/4">
                    <input
                      id="default-radio-2"
                      type="radio"
                      value="no"
                      name="allow-enroll"
                      className="h-4 w-4 sm:h-5 sm:w-5"
                      onChange={handleAllowEnrollment}
                    />
                    <label
                      htmlFor="default-radio-2"
                      className="ml-2 text-base sm:text-lg font-medium text-red"
                    >
                      NO
                    </label>
                  </div>
                </div>
                {allCoursesPassed ? null : (
                  <div className="flex flex-col sm:flex-row w-full sm:items-center mb-6 sm:mb-10">
                    <p className="text-base sm:text-lg text-left w-full sm:w-3/4">
                      NUMBER OF COURSES FAILED:
                    </p>
                    <input
                      type="number"
                      name="num-courses-failed"
                      className="w-full sm:w-1/4 border-2 border-gray-300 rounded-md px-2 py-1"
                      onChange={handleCoursesFailed}
                    />
                  </div>
                )}

                <button
                  type="button"
                  className="text-white bg-primary hover:bg-secondary hover:text-primary font-medium rounded-xl text-xs sm:text-sm px-8 sm:px-12 py-2.5 sm:py-3"
                  onClick={() => {
                    handleSubmit(nasId, enrollmentAllowed, allCoursesPassed, numCoursesFailed);
                  }}
                >
                  SUBMIT
                </button>
                <button
                  type="button"
                  className="text-primary hover:underline font-medium text-xs sm:text-sm px-8 sm:px-12 py-2.5 sm:py-3"
                  onClick={handleGoBack}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

EvaluateGrades.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  grade: PropTypes.string.isRequired,
  nasId: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
