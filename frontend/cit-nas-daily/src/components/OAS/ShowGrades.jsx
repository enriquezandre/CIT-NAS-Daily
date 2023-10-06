"use client";
import PropTypes from "prop-types";
import GradeImage from "../../assets/image9.png"

export const ShowGrades = ({ show, close }) => {
    return (
        show && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="relative w-4/6">
                    <div className="flex flex-col bg-white rounded-lg shadow dark:bg-gray-700 px-8 py-20">
                        <img className="rounded-lg" src={GradeImage} alt="image description"></img>
                        <button type="button" className="text-primary hover:underline font-medium text-sm px-20 py-3.5" onClick={close}>Go Back</button>
                    </div>
                </div>
            </div>
        )
    )
}

ShowGrades.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};