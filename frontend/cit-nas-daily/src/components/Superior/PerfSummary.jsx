import "../../assets/CSS/PerfSummary.css"
import React, { useState } from 'react';
const PerfSummary = ({ onClose }) => {
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const [selectedMonth, setSelectedMonth] = useState('');

  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
  };
  return (
    <>
      <strong class="font-bold text-gray-900 dark:text-white mb-5">
        PERFORMANCE SUMMARY
      </strong>
      <div class="flex content-center gap-10">
        <p class="font-semibold text-gray-900 dark:text-white mb-5">
          TIMEKEEPING STATUS:
        </p>
        <p class="font-semibold mb-5">
          GOOD
        </p>
      </div>
      <table class="custom-width-table border w-3/4">
        <tbody>
          <tr>
            <th class="border px-6 py-1">
              Number of lates
            </th>
            <td class="border px-6 py-1">
              0
            </td>
            <th class="border px-6 py-1">
              Late 10 Minutes
            </th>
            <td class="border px-6 py-1">
              0
            </td>
          </tr>
          <tr>
            <th class="border px-6 py-1">
              Number of Unexcused Absences
            </th>
            <td class="border px-6 py-1">
              0
            </td>
            <th class="border px-6 py-1">
              Late 45 Minutes
            </th>
            <td class="border px-6 py-1">
              0
            </td>
          </tr>
          <tr>
            <th class="border px-6 py-1">
              Number of Excused Absences
            </th>
            <td class="border px-6 py-1">
              0
            </td>
            <th class="border px-6 py-1">
              FTP - Failure to Punch In/Out
            </th>
            <td class="border px-6 py-1">
              0
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <p class="font-semibold text-gray-900 dark:text-white">
        SUMMARY OF DAILY ACTIVITIES:
      </p>
      <div className="w-64 mb-5">
        <select
          id="month"
          name="month"
          value={selectedMonth}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">-- Select a Month --</option>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <table class="border w-100 equal-width-table">
        <thead>
          <tr>
            <th className="border weekly">DATE</th>
            <th className="border weekly">Activities of the Day</th>
            <th className="border weekly">SKILLS LEARNED</th>
            <th className="border weekly">VALUES LEARNED</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border">Lorem Ipsum</td>
            <td class="border">Lorem Ipsum</td>
            <td class="border">Lorem Ipsum</td>
            <td class="border">Lorem Ipsum</td>
          </tr>
        </tbody>
      </table>
      <br />
    </>
  );
};

export default PerfSummary;