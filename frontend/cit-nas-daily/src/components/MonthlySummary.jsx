import PropTypes from "prop-types";

export const MonthlySummary = ({ timekeepingSummaries }) => {
  return (
    <table className="w-4/5 mx-auto mb-8">
      <tbody>
        <tr>
          <td className="w-2/5 border px-4 py-2">Make-up Duty Hours</td>
          <td className="border px-4 py-2 text-center">{timekeepingSummaries.makeUpDutyHours}</td>
          <td className="w-2/5 border px-4 py-2">Late {">"} 10 Minutes</td>
          <td className="border px-4 py-2 text-center">{timekeepingSummaries.lateOver10Mins}</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">Number of Unexcused Absences</td>
          <td className="border px-4 py-2 text-center">{timekeepingSummaries.unexcused}</td>
          <td className="border px-4 py-2">Late {">"} 45 Minutes </td>
          <td className="border px-4 py-2 text-center">{timekeepingSummaries.lateOver45Mins}</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">Number of Excused Absences</td>
          <td className="border px-4 py-2 text-center">{timekeepingSummaries.excused}</td>
          <td className="border px-4 py-2">FTP - Failure to Punch In/Out</td>
          <td className="border px-4 py-2 text-center">{timekeepingSummaries.failedToPunch}</td>
        </tr>
      </tbody>
    </table>
  );
};

MonthlySummary.propTypes = {
  timekeepingSummaries: PropTypes.arrayOf(
    PropTypes.shape({
      makeUpDutyHours: PropTypes.number.isRequired,
      lateOver10Mins: PropTypes.number.isRequired,
      unexcused: PropTypes.number.isRequired,
      lateOver45Mins: PropTypes.number.isRequired,
      excused: PropTypes.number.isRequired,
      failedToPunch: PropTypes.number.isRequired,
    })
  ).isRequired,
};
