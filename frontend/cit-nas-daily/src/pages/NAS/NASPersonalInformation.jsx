import React, { useState } from 'react';

export const NASPersonalInformation = () => {
  const [studentId, setStudentId] = useState('20-2615-260');
  const [firstName, setFirstName] = useState('Kaye');
  const [middleName, setMiddleName] = useState('Capalac');
  const [lastName, setLastName] = useState('Belderol');
  const [gender, setGender] = useState('Female');
  const [bday, setBday] = useState('08/10/2001');
  const [course, setCourse] = useState('BS Computer Science');
  const [yearLevel, setYearLevel] = useState('4');
  const [office, setOffice] = useState('Enrollment and Technical Office');
  const [dateStarted, setDateStarted] = useState('11/01/2023');
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
        <div className="flex">
          <div className="m-3 flex-1">
            <div>
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
                readOnly="true"
                style={{ backgroundColor: '#E3E3E3' }}
              />
            </div>
            <br/>
            <div>
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
                readOnly="true"
                style={{ backgroundColor: '#E3E3E3' }}
              />
            </div>
          </div>
          
          <div className="m-3 flex-1">
            <div>
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
                readOnly="true"
                style={{ backgroundColor: '#E3E3E3' }}
              />
            </div>
            <br/>
            <div>
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
                readOnly="true"
                style={{ backgroundColor: '#E3E3E3' }}
              />
            </div>
          </div>
          <div className="m-3 flex-1">
            <div>
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
                readOnly="true"
                style={{ backgroundColor: '#E3E3E3' }}
              />
            </div>
          </div>
          <div className="m-3 flex-1">
            <div>
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
                  readOnly="true"
                  style={{ backgroundColor: '#E3E3E3' }}
                />
            </div>
          </div>

          <div className='m-3 flex-2'>
            <div className="avatar-square" style={{ width: '200px', height: '200px', border: '2px solid gray', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {avatar ? ( 
                <img
                  src={URL.createObjectURL(avatar)}
                  alt="Avatar"
                  className="avatar-image"
                  style={{ width: '100%', height: '100%' }}
                />
              ) : (
                <label htmlFor="avatar" style={{ cursor: 'pointer' }}>
                  Upload Photo
                  <input
                    type="file"
                    id="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    style={{ display: 'none' }}
                  /> 
                </label>
              )}
            </div>
          </div>
        </div>

      {/* horizontal line */}
      <hr className="my-5 border-t-2 border-gray-300 mx-2" />
      
      {/* below the horiztonal line fields*/}
      <div className="m-3 flex-1">
        <label htmlFor="office" className="block mb-2 font-bold text-gray-600">
          Office Assigned:
        </label>
        <input
          type="text"
          id="office"
          name="office"
          value={office}
          onChange={(e) => setOffice(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          readOnly="true"
          style={{ backgroundColor: '#E3E3E3' }}
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
            readOnly="true"
            style={{ backgroundColor: '#E3E3E3' }}
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
            readOnly="true"
            style={{ backgroundColor: '#E3E3E3' }}
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
            readOnly="true"
            style={{ backgroundColor: '#E3E3E3' }}
          />
        </div>
      </div>
    </div>
  );
};
