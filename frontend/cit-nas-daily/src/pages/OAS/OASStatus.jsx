import { useState } from "react";
import { EvaluateGrades } from "../../components/OAS/EvaluateGrades";

export const OASStatus = () => {
  const [isViewingEvaluateGrades, setIsViewingEvaluateGrades] = useState(false);

  const openEvaluateGrades = () => {
    setIsViewingEvaluateGrades(true);
  };

  const closeEvaluateGrades = () => {
    setIsViewingEvaluateGrades(false);
  };

  return (
    <>
      <div className="flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col w-9/10 mx-8 mb-10">
        <div className="flex h-full flex-col justify-center">
          <ul className="flex justify-end items-center text-lg font-medium rounded-t-lg bg-grey px-8 py-4">
            <li className="w-1/4">
              <div className="flex justify-end">
                <div className="relative w-full">
                  <input
                    type="search"
                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded border"
                    placeholder="Search NAS..."
                    required
                  />
                  <button
                    type="submit"
                    className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          </ul>
          <div className="px-8 py-4">
            <div className="flex flex-row justify-start items-center gap-10 mt-2 mb-8">
              <div className="flex flex-row gap-2 items-center">
                <p>SY:</p>
                <select
                  id="sy"
                  name="sy"
                  className="block w-full pl-3 pr-10 py-2 text-base border rounded-md"
                >
                  <option value="">2324</option>
                </select>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <p>SEMESTER:</p>
                <select
                  id="semester"
                  name="month"
                  className="block w-full pl-3 pr-10 py-2 text-base border rounded-md"
                >
                  <option value="">SECOND</option>
                </select>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <p className="text-bold mb-3 text-xl font-bold">
                  NAME: BELDEROL, KAYE CASSANDRA
                </p>
                <p className="text-bold mb-3 text-xl font-bold">
                  COURSE: BSCS 3
                </p>
                <p className="text-bold mb-3 text-xl font-bold">
                  DEPT./OFFICE: ETO
                </p>
              </div>
            </div>
            <hr className="my-5 border-t-2 border-gray-300" />
            <div className="flex flex-col">
              <p className="text-bold text-center text-xl font-bold mb-8">
                PERFORMANCE EVALUATION
              </p>
              <div className="flex flex-row gap-6 justify-start items-center mb-4">
                <p className="text-bold text-xl">
                  SUPERIOR&#39;S EVALUATION OVERALL RATING:
                </p>
                <p className="text-bold text-xl font-bold">4.8</p>
              </div>
              <div className="flex flex-row gap-6 justify-start items-center mb-4">
                <p className="text-bold text-xl">ACADEMIC PERFORMANCE:</p>
                <button
                  type="button"
                  className="text-primary bg-secondary hover:bg-primary hover:text-secondary font-medium rounded-lg text-sm px-5 py-2.5"
                  onClick={openEvaluateGrades}
                >
                  EVALUATE GRADES
                </button>
                <EvaluateGrades
                  show={isViewingEvaluateGrades}
                  close={closeEvaluateGrades}
                />
              </div>
              <div className="flex flex-row gap-6 justify-start items-center mb-4">
                <p className="text-bold">TIMEKEEPING STATUS:</p>
                <p className="text-bold text-xl font-bold text-green">
                  EXCELLENT
                </p>
              </div>
              <div className="flex flex-row gap-6 justify-start items-center mb-4">
                <p className="text-bold text-xl">ALLOWED FOR ENROLLMENT:</p>
                <p className="text-bold text-xl font-bold text-green">YES</p>
              </div>
              <div className="flex flex-row gap-6 justify-start items-center mb-4">
                <p className="text-bold text-xl">NUMBER OF UNITS ALLOWED:</p>
                <p className="text-bold text-xl font-bold">_____</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
