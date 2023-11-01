import React, { useState } from 'react';

export const NASPersonalInformation = () => {
  const [studentId, setStudentId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [bday, setBday] = useState('');
  const [course, setCourse] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [office, setOffice] = useState('');
  const [dateStarted, setDateStarted] = useState('');
  

  return (
    <div className="justify-center w-full h-full items-center border border-solid rounded-lg">
      <div className="m-3">
        <label htmlFor="studentId" className="block mb-2 font-bold text-gray-600">
          Student ID:
        </label>
        <input
          type="text"
          id="studentId"
          name="studentId"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>
      <div className="flex">
        <div className="m-3 flex-1">
          <label htmlFor="firstName" className="block mb-2 font-bold text-gray-600">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="m-3 flex-1"> {/* Make each name input flexible */}
          <label htmlFor="middleName" className="block mb-2 font-bold text-gray-600">
            Middle Name:
          </label>
          <input
            type="text"
            id="middleName"
            name="middleName"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="m-3 flex-1"> {/* Make each name input flexible */}
          <label htmlFor="lastName" className="block mb-2 font-bold text-gray-600">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
      </div>
      <div className="flex">
        <div className="m-3 flex-1">
          <label htmlFor="firstName" className="block mb-2 font-bold text-gray-600">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="m-3 flex-1"> {/* Make each name input flexible */}
          <label htmlFor="middleName" className="block mb-2 font-bold text-gray-600">
            Middle Name:
          </label>
          <input
            type="text"
            id="middleName"
            name="middleName"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="m-3 flex-1"> {/* Make each name input flexible */}
          <label htmlFor="lastName" className="block mb-2 font-bold text-gray-600">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
      </div>
      {/* horizontal line */}
      <hr className="my-5 border-t-2 border-gray-300 mx-2" />
    </div>
  );
};
