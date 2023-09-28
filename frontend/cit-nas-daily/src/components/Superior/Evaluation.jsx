import React, { useState } from 'react';
import "../../assets/CSS/Evaluation.css"

export const Evaluation = () => {
    return(
        <>
            <div className="evaluation-container">
                <div class="grid grid-cols-1 sm:grid-cols-2">
                    <p class="mb-3 text-gray-500 dark:text-gray-400">
                        <strong class="font-semibold text-gray-900 dark:text-white">
                            NAME: BELDEROL, KAYE CASSANDRA
                        </strong>
                    </p>
                    <p class="mb-3 text-gray-500 dark:text-gray-400">
                        <strong class="font-semibold text-gray-900 dark:text-white">
                            COURSE: BSCS 3
                        </strong>
                    </p>
                    <p class="mb-3 text-gray-500 dark:text-gray-400">
                        <strong class="font-semibold text-gray-900 dark:text-white">
                            DEPT./OFFICE: ETO
                        </strong>
                    </p>
                    <p class="mb-3 text-gray-500 dark:text-gray-400">
                        <strong class="font-semibold text-gray-900 dark:text-white">
                            PERIOD: Second Semester S.Y. 2022-2023
                        </strong>
                    </p>
                </div>
                <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">VIEW PERFORMANCE SUMMARY</button>
                <p class="mb-3 text-justify text-gray-500 dark:text-gray-400">
                    <strong class="font-semibold text-gray-900 dark:text-white">OBJECTIVE: </strong> 
                        To encourage, promote and develop professionalism among the Non-Academic Scholars through a fair and objective assessment of their performance and their adherence to the policies and guidelines of their scholarship.
                </p>
            </div>
        </>
    );
};