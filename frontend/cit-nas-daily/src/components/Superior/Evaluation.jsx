import React, { useState } from 'react';
import "../../assets/CSS/Evaluation.css"
import PerfSummary from './PerfSummary';

export const Evaluation = () => {
    const [selectedOptions, setSelectedOptions] = useState({});
    const [viewPerfSummary, setViewPerfSummary] = useState(false);

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
            {/* "ViewPerfSummary" component */}
            {viewPerfSummary && (
                <div className="overlay">
                    <div className="popup">
                        <PerfSummary />
                        <button type="button" class="eval-button mt-1 mb-4" onClick={() => setViewPerfSummary(false)}>CLOSE</button>
                    </div>
                </div>
            )}
            <div className='flex content-center items-center m-0'>
                <div className='eval-container'>
                    <div class="grid grid-cols-1 sm:grid-cols-2">
                        <p class="mb-3 text-gray-500 dark:text-gray-400">
                            <strong class="font-bold text-gray-900 dark:text-white">
                                NAME: BELDEROL, KAYE CASSANDRA
                            </strong>
                        </p>
                        <p class="mb-3 text-gray-500 dark:text-gray-400">
                            <strong class="font-bold text-gray-900 dark:text-white">
                                COURSE: BSCS 3
                            </strong>
                        </p>
                        <p class="mb-3 text-gray-500 dark:text-gray-400">
                            <strong class="font-bold text-gray-900 dark:text-white">
                                DEPT./OFFICE: ETO
                            </strong>
                        </p>
                        <p class="mb-3 text-gray-500 dark:text-gray-400">
                            <strong class="font-bold text-gray-900 dark:text-white">
                                PERIOD: Second Semester S.Y. 2022-2023
                            </strong>
                        </p>
                    </div>
                    <div class="button-container">
                        <button type="button" class="eval-button mt-1 mb-4" onClick={() => setViewPerfSummary(true)}>VIEW PERFORMANCE SUMMARY</button>
                    </div>
                    <hr />
                    <p class="my-3 text-justify text-gray-500 dark:text-gray-400">
                        <strong class="font-bold text-gray-900 dark:text-white">OBJECTIVE: </strong> 
                            To encourage, promote and develop professionalism among the Non-Academic Scholars through a fair and objective assessment of their performance and their adherence to the policies and guidelines of their scholarship.
                    </p>
                    <div class="grid grid-cols-1 sm:grid-cols-6 my-2">
                        <p>
                            <strong class="font-bold text-gray-900 dark:text-white">
                                LEGEND:
                            </strong>
                        </p>
                        <p>5 - Excellent</p>
                        <p>4 - Very Good</p>
                        <p>3 - Good</p>
                        <p>2 - Fair</p>
                        <p>1 - Poor</p>
                    </div>
                    <br />
                    <form>
                        <table>
                        <thead>
                            <tr>
                                <th class="text-left pl-0"><strong class="font-bold text-gray-900 dark:text-white">A. OVERALL RATING </strong> </th>
                                <th><strong class="font-semibold text-gray-900 dark:text-white">5</strong></th>
                                <th><strong class="font-semibold text-gray-900 dark:text-white">4</strong></th>
                                <th><strong class="font-semibold text-gray-900 dark:text-white">3</strong></th>
                                <th><strong class="font-semibold text-gray-900 dark:text-white">2</strong></th>
                                <th><strong class="font-semibold text-gray-900 dark:text-white">1</strong></th>
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
                                    <td key={value}>
                                        <input
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
                                <br/>
                            </React.Fragment>
                            ))}
                        </tbody>
                        </table>
                        <div class="flex justify-end space-x-10 items-center">
                            <strong className="font-bold text-gray-900 dark:text-white">
                                OVERALL RATING: _____
                            </strong>
                            <button type="button" class="eval-button mt-1 mb-4">SUBMIT</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};