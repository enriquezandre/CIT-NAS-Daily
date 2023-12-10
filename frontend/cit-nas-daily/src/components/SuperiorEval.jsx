import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const SuperiorEval = ({ nasId, selectedSem, selectedSY }) => {
  const [evaluationData, setEvaluationData] = useState([]);

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        // Create an Axios instance with the Authorization header
        const api = axios.create({
          baseURL: "https://localhost:7001/api",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const evaluationResponse = await api.get(
          `SuperiorEvaluationRating?nasId=${nasId}&semester=${selectedSem}&year=${selectedSY}`
        );
        let evalData = evaluationResponse.data;
        if (!evalData) {
          // If there's no record
          evalData = {
            attendanceAndPunctuality: 0,
            attitudeAndWorkBehaviour: 0,
            overallAssessment: 0,
            overallRating: 0,
            quanOfWorkOutput: 0,
            qualOfWorkOutput: 0,
          };
        }
        setEvaluationData(evalData);
      } catch (error) {
        console.error(error);
        setEvaluationData({
          attendanceAndPunctuality: 0,
          attitudeAndWorkBehaviour: 0,
          overallAssessment: 0,
          overallRating: 0,
          quanOfWorkOutput: 0,
          qualOfWorkOutput: 0,
        });
      }
    };

    fetchEvaluation();
  }, [selectedSY, selectedSem, nasId]);

  return (
    <>
      <div className="flex flex-col ">
        <div className="flex h-full flex-col justify-center">
          <div className="flex flex-col">
            <p className="text-center text-xl font-bold mb-8 text-primary">
              SUPERIOR EVALUATION SUMMARY
            </p>
            <table className="text-xl justify-center w-4/5 items-center">
              <tbody>
                <tr>
                  <td className="w-2/5 py-2">Attendance and Punctuality</td>
                  <td className="py-2 text-center">
                    {(evaluationData.attendanceAndPunctuality / 2).toFixed(1)}
                  </td>
                </tr>
                <tr>
                  <td className="py-2">Quality of Work - Output:</td>
                  <td className="py-2 text-center">
                    {(evaluationData.qualOfWorkOutput / 3).toFixed(1)}
                  </td>
                </tr>
                <tr>
                  <td className="py-2">Quantity of Work - Output</td>
                  <td className="py-2 text-center">
                    {(evaluationData.quanOfWorkOutput / 2).toFixed(1)}
                  </td>
                </tr>
                <tr>
                  <td className="py-2">Attitude and Work Behaviour:</td>
                  <td className="py-2 text-center">
                    {(evaluationData.attitudeAndWorkBehaviour / 5).toFixed(1)}
                  </td>
                </tr>
                <tr>
                  <td className="py-2">Overall Assessment of NAS Performance:</td>
                  <td className="py-2 text-center">
                    {(evaluationData.overallAssessment / 1).toFixed(1)}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 font-bold">Superior&#39;s Evaluation Overall Rating:</td>
                  <td className="py-2 text-center font-bold">
                    {(evaluationData.overallRating / 1).toFixed(1)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

SuperiorEval.propTypes = {
  nasId: PropTypes.number.isRequired,
  selectedSem: PropTypes.number.isRequired,
  selectedSY: PropTypes.string.isRequired,
};
