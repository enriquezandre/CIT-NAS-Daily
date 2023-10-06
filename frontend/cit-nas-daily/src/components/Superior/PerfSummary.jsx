import { useState } from 'react';
import { MonthlySummary } from "../MonthlySummary";

export const PerfSummary = ({ show, close }) => {
  const [selectedMonth, setSelectedMonth] = useState('');

  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
  };
  return (
    show && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="relative w-full mx-8">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-center p-4 rounded-t">
              <h3 className="text-xl text-center w-full font-bold text-gray-900 dark:text-white">
                PERFORMANCE SUMMARY
              </h3>
              <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={close}>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col px-6 gap-6">
              <div>
                <h3 className="flex gap-6 text-xl text-left w-full font-semibold">
                  TIMEKEEPING STATUS:
                  <p className="text-secondary">GOOD</p>
                </h3>
              </div>
              <MonthlySummary />
              <div>
                <h3 className="flex gap-6 text-xl text-left w-full font-semibold">
                  SUMMARY OF DAILY ACTIVITIES:
                </h3>
                <div className="w-1/5 mt-3 mb-5">
                  <select
                    id="month"
                    name="month"
                    value={selectedMonth}
                    onChange={handleChange}
                    className="block w-full pl-3 pr-10 py-2 text-base border focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select a Month</option>
                    {months.map((month, index) => (
                      <option key={index} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="table-wrapper overflow-auto max-h-40">
                  <table className="border w-full">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2 w-1/5">DATE</th>
                        <th className="border px-4 py-2">Activities of the Day</th>
                        <th className="border px-4 py-2">SKILLS LEARNED</th>
                        <th className="border px-4 py-2">VALUES LEARNED</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                        <td className="border px-4 py-2 text-center">Lorem Ipsum</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center p-6 space-x-2 border-gray-200 rounded-b dark:border-gray-600">
              <button type="button" className="text-white bg-primary hover:bg-secondary hover:text-primary font-medium rounded-lg text-sm px-10 py-2.5 text-center" onClick={close}>CLOSE</button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}