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
  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = (e) => {
    // Handle the image selection
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  return (
    <div className="justify-center w-full h-full items-center border border-solid rounded-lg">
      <div className="m-3">
        
      <div className="flex">
        <div className="m-3 flex-1">
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
        <div className="mt-2">
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
          />
          </div>
          {avatar && (
            <img
              src={URL.createObjectURL(avatar)}
              alt="Avatar"
              className="mt-2"
              style={{ width: '200px', height: '200px' }}
            />
          )}
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
        <div className="m-3 flex-1">
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
        <div className="m-3 flex-1">
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
          <label htmlFor="gender" className="block mb-2 font-bold text-gray-600">
            Gender:
          </label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="m-3 flex-1">
          <label htmlFor="bday" className="block mb-2 font-bold text-gray-600">
            Birthdate:
          </label>
          <input
            type="text"
            id="bday"
            name="bday"
            value={bday}
            onChange={(e) => setBday(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="m-3 flex-1"></div> {/* Create a blank div with the same width */}
      </div>

      {/* horizontal line */}
      <hr className="my-5 border-t-2 border-gray-300 mx-2" />
      
      <div className="m-3 flex-1">
        <label htmlFor="office" className="block mb-2 font-bold text-gray-600">
          Office Assigned:
        </label>
        <input
          type="text"
          id="office"
          name="office"
          value={office.name}
          onChange={(e) => setOffice(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>
      <div className="flex">
        <div className="m-3 flex-1">
          <label htmlFor="course" className="block mb-2 font-bold text-gray-600">
            Course:
          </label>
          <input
            type="text"
            id="course"
            name="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="m-3 flex-1">
          <label htmlFor="yearLevel" className="block mb-2 font-bold text-gray-600">
            Year Level:
          </label>
          <input
            type="text"
            id="yearLevel"
            name="yearLevel"
            value={yearLevel}
            onChange={(e) => setYearLevel(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="m-3 flex-1">
          <label htmlFor="dateStarted" className="block mb-2 font-bold text-gray-600">
            Date Started:
          </label>
          <input
            type="text"
            id="dateStarted"
            name="dateStarted"
            value={dateStarted}
            onChange={(e) => setDateStarted(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
      </div>
    </div>
  );
};
