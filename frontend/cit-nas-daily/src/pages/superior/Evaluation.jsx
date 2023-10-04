import React, { useState } from 'react';
import { Card } from "flowbite-react";
import { Header } from "../../components/Header";
import { PerfSummary } from "../../components/Superior/PerfSummary.jsx";

export const Evaluation = () => {
    const [selectedOptions, setSelectedOptions] = useState({});
    const [isViewingPerfSummary, setIsViewingPerfSummary] = useState(false);

    const openPerfSummary = () => {
        setIsViewingPerfSummary(true);
    };

    const closePerfSummary = () => {
        setIsViewingPerfSummary(false);
    };

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
    return (
        <>
            <Header role={"Superior"} />

            <Card className="w-9/10 mx-8 mb-10">
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
                <div className="flex items-center justify-center">
                    <button type="button" class="text-white bg-primary hover:bg-secondary hover:text-primary font-medium rounded-lg text-sm px-5 py-2.5" onClick={openPerfSummary}>VIEW PERFORMANCE SUMMARY</button>
                </div>
                <PerfSummary show={isViewingPerfSummary} close={closePerfSummary} />
                <hr className="my-2 border-t-2 border-gray-300 ml-7 mr-7" />
                <p class="my-2 text-justify text-gray-500 dark:text-gray-400">
                    <strong class="font-bold text-gray-900 dark:text-white">OBJECTIVE: </strong>
                    To encourage, promote and develop professionalism among the Non-Academic Scholars through a fair and
                    objective assessment of their performance and their adherence to the policies and guidelines of their
                    scholarship.
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
                    <div class="flex justify-end gap-10 items-center mt-5">
                        <strong className="font-bold text-gray-900 dark:text-white">
                            OVERALL RATING: _____
                        </strong>
                        <button type="button" class="text-white bg-primary hover:bg-secondary hover:text-primary font-medium rounded-lg text-sm px-10 py-2.5">SUBMIT</button>
                    </div>
                </form>
            </Card>
        </>
    );
};