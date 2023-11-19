"use client";
import PropTypes from "prop-types";
import { Table } from "flowbite-react";

import { useState, useEffect } from "react";
import { MonthlySummary } from "../MonthlySummary";
import axios from "axios";

export const PerfSummary = ({
  show,
  close,
  nasId,
  selectedSem,
  selectedSY,
}) => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [activitySummaries, setActivitySummaries] = useState([]);
  const [filteredSummaries, setFilteredSummaries] = useState([]);
  const [timekeepingSummaries, setTimekeepingSummaries] = useState([]);
  const [timekeepingStatus, setTimekeepingStatus] = useState("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function getSemesterValue(sem) {
    switch (sem) {
      case "First":
        return 0;
      case "Second":
        return 1;
      case "Summer":
        return 3;
      default:
        return "Invalid semester";
    }
  }

  useEffect(() => {
    const fetchNas = async () => {
      try {
        // Create an Axios instance with the Authorization header
        const api = axios.create({
          baseURL: "https://localhost:7001/api",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const activitiesresponse = await api.get(`/ActivitiesSummary/${nasId}`);
        const activitiesdata = activitiesresponse.data;

        setActivitySummaries(activitiesdata);
        setFilteredSummaries(activitiesdata);

        const timekeepingresponse = await api.get(
          `/TimekeepingSummary/${nasId}`
        );
        let timekeepingdata = timekeepingresponse.data[0];
        if (!timekeepingdata) {
          // If there's no record
          timekeepingdata = {
            excused: "NR",
            failedToPunch: "NR",
            lateOver10Mins: "NR",
            lateOver45Mins: "NR",
            makeUpDutyHours: "NR",
            schoolYear: "NR",
            semester: "NR",
            unexcused: "NR",
          };
        }

        setTimekeepingSummaries(timekeepingdata);

        const summaryEvaluationResponse = await api.get(
          `SummaryEvaluation/${selectedSY}/${getSemesterValue(
            selectedSem
          )}/${nasId}`
        );
        const summaryEvaluationData = summaryEvaluationResponse.data;
        setTimekeepingStatus(summaryEvaluationData.timekeepingStatus);
      } catch (error) {
        console.error(error);
        setTimekeepingStatus("");
        setActivitySummaries([]);
        setFilteredSummaries([]);
        setTimekeepingSummaries([]);
      }
    };

    fetchNas();
  }, [nasId, selectedSem, selectedSY]);

  const handleChange = (event) => {
    const newSelectedMonth = event.target.value;

    // Filter activitySummaries based on selected month
    const filtered = activitySummaries.filter((summary) => {
      const date = new Date(summary.dateOfEntry);
      const summaryMonth = date.getMonth();
      return months[summaryMonth] === newSelectedMonth;
    });

    setSelectedMonth(newSelectedMonth);
    setFilteredSummaries(filtered);
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
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={close}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col px-6 gap-6">
              <div>
                <h3 className="flex gap-6 text-xl text-left w-full font-semibold">
                  TIMEKEEPING STATUS:
                  {timekeepingStatus === "EXCELLENT" ? (
                    <p className="text-green">{timekeepingStatus}</p>
                  ) : timekeepingStatus === "GOOD" ? (
                    <p className="text-secondary">{timekeepingStatus}</p>
                  ) : (
                    <p className="text-red">{timekeepingStatus}</p>
                  )}
                </h3>
              </div>
              <MonthlySummary timekeepingSummaries={timekeepingSummaries} />
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
                  <Table hoverable className="border">
                    <Table.Head className="border">
                      <Table.HeadCell className="text-center border">
                        DATE
                      </Table.HeadCell>
                      <Table.HeadCell className="text-center border">
                        Activities of the Day
                      </Table.HeadCell>
                      <Table.HeadCell className="text-center border">
                        Skills Learned
                      </Table.HeadCell>
                      <Table.HeadCell className="text-center border">
                        Values Learned
                      </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      {filteredSummaries.map((summary) => (
                        <Table.Row key={summary.id}>
                          <Table.Cell
                            className="text-center border"
                            style={{
                              overflowWrap: "break-word",
                              maxWidth: "100px",
                            }}
                          >
                            {new Date(summary.dateOfEntry).toLocaleDateString()}
                          </Table.Cell>
                          <Table.Cell
                            className="text-center border"
                            style={{
                              overflowWrap: "break-word",
                              maxWidth: "100px",
                            }}
                          >
                            {summary.activitiesOfTheDay}
                          </Table.Cell>
                          <Table.Cell
                            className="text-center border"
                            style={{
                              overflowWrap: "break-word",
                              maxWidth: "100px",
                            }}
                          >
                            {summary.skillsLearned}
                          </Table.Cell>
                          <Table.Cell
                            className="text-center border"
                            style={{
                              overflowWrap: "break-word",
                              maxWidth: "100px",
                            }}
                          >
                            {summary.valuesLearned}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center p-6 space-x-2 border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                className="text-white bg-primary hover:bg-secondary hover:text-primary font-medium rounded-lg text-sm px-10 py-2.5 text-center"
                onClick={close}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

PerfSummary.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  nasId: PropTypes.number.isRequired,
  selectedSem: PropTypes.number.isRequired,
  selectedSY: PropTypes.number.isRequired,
};
