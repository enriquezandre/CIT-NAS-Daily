import React, { useState, useEffect } from 'react';

export const OASOffices = () => {

  const [offices, setOffices] = useState([]);

  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    // Temp data
    const placeholderData = [
      { name: 'Office 1', scholarCount: 2 },
      { name: 'Office 2', scholarCount: 3 },
      { name: 'Office 3', scholarCount: 1 },
      { name: 'Office 4', scholarCount: 7 },
      { name: 'Office 5', scholarCount: 2 },
      { name: 'Office 6', scholarCount: 4 },
      { name: 'Office 6', scholarCount: 4 },
    ];
    setOffices(placeholderData);
  }, []);

  // Function to filter offices based on search input
  const filteredOffices = offices.filter((office) =>
    office.name.toLowerCase().includes(searchInput.toLowerCase())
  );

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
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          </ul>
          <div className="grid grid-cols-2 gap-4 p-6">
            {/* Render the list of offices in a 2-column layout */}
            {filteredOffices.map((office, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">{office.name}</h2>
                <p className="text-gray-600">Non-Academic Scholars: {office.scholarCount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
