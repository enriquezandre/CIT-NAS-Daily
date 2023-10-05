import React, { useState } from 'react';
import { Header } from "../../components/Header";
import { OASButtons } from "../../components/OAS/OASButtons";
import { MasterlistTable } from '../../components/OAS/MasterlistTable';

export const Masterlist = () => {
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
        <>
            <Header role={"OAS"} />
            <OASButtons />
            <div className="flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col w-9/10 mx-8 mb-10">
                <div class="flex h-full flex-col justify-center">
                    <ul class="flex justify-end items-center text-lg font-medium rounded-t-lg bg-grey px-8 py-4">
                        <li class="w-1/4">
                            <div class="flex justify-end">
                                <div class="relative w-full">
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
                                    id="sy"
                                    name="sy"
                                    className="block w-full pl-3 pr-10 py-2 text-base border rounded-md"
                                >
                                    <option value="">2324</option>
                                </select>
                            </div>
                            <div class="flex flex-row gap-2 items-center">
                                <p>SEMESTER:</p>
                                <select
                                    id="semester"
                                    name="month"
                                    className="block w-full pl-3 pr-10 py-2 text-base border rounded-md"
                                >
                                    <option value="">SECOND</option>
                                </select>
                            </div>
                            <div class="flex flex-row gap-2 items-center">
                                <p>MONTH:</p>
                                <select
                                    id="month"
                                    name="month"
                                    value={selectedMonth}
                                    onChange={handleChange}
                                    className="block w-full pl-3 pr-10 py-2 text-base border rounded-md"
                                >
                                    <option value="">Select a Month</option>
                                    {months.map((month, index) => (
                                    <option key={index} value={month}>
                                        {month}
                                    </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <MasterlistTable />
                    </div>
                </div>
            </div>
        </>
    );
}