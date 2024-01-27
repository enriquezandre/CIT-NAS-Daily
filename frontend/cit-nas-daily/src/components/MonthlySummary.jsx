import PropTypes from "prop-types";

export const MonthlySummary = ({ timekeepingSummaries }) => {
  return (
    <table className="w-4/5 mx-auto mb-8">
      <tbody>
        <tr>
          <td className="w-2/5 border px-4 py-2 text-xs md:text-base lg:text-lg">
            Make-up Duty Hours
          </td>
          <td className="border px-4 py-2 text-center text-xs md:text-base lg:text-lg">
            {timekeepingSummaries.makeUpDutyHours !== null
              ? timekeepingSummaries.makeUpDutyHours
              : 0}
          </td>
          <td className="w-2/5 border px-4 py-2 text-xs md:text-base lg:text-lg">
            Late {">"} 10 Minutes
          </td>
          <td className="border px-4 py-2 text-center text-xs md:text-base lg:text-lg">
            {timekeepingSummaries.lateOver10Mins !== null ? timekeepingSummaries.lateOver10Mins : 0}
          </td>
        </tr>
        <tr>
          <td className="border px-4 py-2 text-xs md:text-base lg:text-lg">
            Number of Unexcused Absences
          </td>
          <td className="border px-4 py-2 text-center text-xs md:text-base lg:text-lg">
            {timekeepingSummaries.unexcused !== null ? timekeepingSummaries.unexcused : 0}
          </td>
          <td className="border px-4 py-2 text-xs md:text-base lg:text-lg">
            Late {">"} 45 Minutes{" "}
          </td>
          <td className="border px-4 py-2 text-center text-xs md:text-base lg:text-lg">
            {timekeepingSummaries.lateOver45Mins !== null ? timekeepingSummaries.lateOver45Mins : 0}
          </td>
        </tr>
        <tr>
          <td className="border px-4 py-2 text-xs md:text-base lg:text-lg">
            Number of Excused Absences
          </td>
          <td className="border px-4 py-2 text-center text-xs md:text-base lg:text-lg">
            {timekeepingSummaries.excused !== null ? timekeepingSummaries.excused : 0}
          </td>
          <td className="border px-4 py-2 text-xs md:text-base lg:text-lg">
            FTP - Failure to Punch In/Out
          </td>
          <td className="border px-4 py-2 text-center text-xs md:text-base lg:text-lg">
            {timekeepingSummaries.failedToPunch !== null ? timekeepingSummaries.failedToPunch : 0}
          </td>
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
