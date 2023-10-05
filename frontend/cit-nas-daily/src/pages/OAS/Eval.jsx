import React, { useState } from 'react';
import { Header } from '../../components/Header';
import { OASButtons } from '../../components/OAS/OASButtons';

export const Eval = () => {
    const [selectedOptions, setSelectedOptions] = useState({});

    const handleOptionChange = (rowName, selectedValue) => {
        setSelectedOptions({
            ...selectedOptions,
            [rowName]: selectedValue,
        });
    };

    const categories = [
        {
            title: "ATTENDANCE AND PUNCTUALITY",
            rows: [
                "Regularity of Attendance",
                "Promptness in Reporting for Duty",
            ],
        },
        {
            title: "QUALITY OF WORK - OUTPUT",
            rows: [
                "Accuracy and Thoroughness of Work",
                "Organization and/or Presentation/Neatness of Work",
                "Effectiveness (Satisfaction of Clients: No/Less Complaints)",
            ],
        },
        {
            title: "QUANTITY OF WORK - OUTPUT",
            rows: [
                "Accomplishes more work on the given time",
                "Timeliness in accomplishing tasks/duties",
            ],
        },
        {
            title: "ATTITUDE AND WORK BEHAVIOUR",
            rows: [
                "Sense of Responsibility and Urgency",
                "Dependability and Reliability",
                "Industry and Resourcefulness",
                "Alertness and Initiative",
                "Sociability and Pleasant Disposition",
            ],
        },
        {
            title: "OVERALL ASSESSMENT OF NAS PERFORMANCE",
            rows: [
                "Overall Rating",
            ],
        },
    ];

    return(
        <>
            <Header role={"OAS"} />
            <OASButtons />

            <div className="flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col w-9/10 mx-8 mb-10">
                <div class="flex h-full flex-col justify-center">
                    <ul class="flex flex-wrap items-center text-lg font-medium rounded-t-lg bg-grey px-8 py-4 grid grid-cols-3">
                        <li>
                            <p class="font-bold">
                                BELDEROL, KAYE CASSANDRA
                            </p>
                        </li>
                        <li>
                            <p class="font-bold text-center">
                                DEPT./OFFICE: ETO
                            </p>
                        </li>
                        <li>
                            <div class="flex justify-end">
                                <div class="relative w-4/5">
                                    <input type="search" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded border" placeholder="Search NAS..." required/>
                                    <button type="submit" class="absolute top-0 right-0 p-2.5 text-sm font-medium h-full">
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="px-8 py-4">
                        <div class="flex flex-row justify-start items-center gap-10 mt-2 mb-8">
                            <div class="flex flex-row gap-2 items-center">
                                <p>SY:</p>
                                <select
                                    id="month"
                                    name="month"
                                    className="block w-full pl-3 pr-10 py-2 text-base border rounded-md"
                                >
                                    <option value="">2324</option>
                                </select>
                            </div>
                            <div class="flex flex-row gap-2 items-center">
                                <p>SEMESTER:</p>
                                <select
                                    id="month"
                                    name="month"
                                    className="block w-full pl-3 pr-10 py-2 text-base border rounded-md"
                                >
                                    <option value="">SECOND</option>
                                </select>
                            </div>
                        </div>
                        <hr className="my-5 border-t-2 border-gray-300" />
                        <p class="text-xl font-bold text-center mb-4">SUMMARY OF EVALUATION</p>
                        <form>
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th class="text-left pl-0"><strong class="font-bold text-gray-900 dark:text-white">A. OVERALL RATING </strong> </th>
                                        <th class="font-semibold text-gray-900 dark:text-white px-8">5</th>
                                        <th class="font-semibold text-gray-900 dark:text-white px-8">4</th>
                                        <th class="font-semibold text-gray-900 dark:text-white px-8">3</th>
                                        <th class="font-semibold text-gray-900 dark:text-white px-8">2</th>
                                        <th class="font-semibold text-gray-900 dark:text-white px-8">1</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((category, index) => (
                                        <React.Fragment key={index}>
                                            <tr>
                                                <td className="pl-0 text-left">
                                                    <strong className="font-bold text-gray-900 dark:text-white">
                                                        {category.title}
                                                    </strong>
                                                </td>
                                            </tr>
                                            {category.rows.map((row, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    <td className="text-left">{row}</td>
                                                    {[5, 4, 3, 2, 1].map((value) => (
                                                        <td key={value} className="text-center">
                                                            <input
                                                                className="form-radio h-5 w-5"
                                                                type="radio"
                                                                name={`row${index}-${rowIndex}`}
                                                                value={`Option ${value}`}
                                                                checked={selectedOptions[`row${index}-${rowIndex}`] === `Option ${value}`}
                                                                onChange={() => handleOptionChange(`row${index}-${rowIndex}`, `Option ${value}`)}
                                                            />
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                            <br />
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
            <div class="flex flex-row justify-end gap-10 items-center mt-5 w-9/10 mx-20 mb-10">
                <p className="font-bold text-xl">
                    OVERALL RATING:
                </p>
                <p className="font-bold text-xl">
                    4.8
                </p>
            </div>
        </>
    );
}