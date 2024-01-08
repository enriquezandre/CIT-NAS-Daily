import { useMemo, useRef, useEffect, useState } from "react";
import axios from "axios";

export const AddNASForm = () => {
  const [offices, setOffices] = useState([]);
  const lastnameRef = useRef();
  const firstnameRef = useRef();
  const middlenameRef = useRef();
  const officeRef = useRef();
  const idnumberRef = useRef();
  const programRef = useRef();
  const genderRef = useRef();
  const birthdateRef = useRef();
  const datestartedRef = useRef();
  const yearlevelRef = useRef();
  const unitsAllowedRef = useRef();
  const syRef = useRef();
  const semRef = useRef();

  const api = useMemo(
    () =>
      axios.create({
        baseURL: "https://localhost:7001/api",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    []
  );

  const getSemesterValue = useMemo(() => {
    return (sem) => {
      switch (sem) {
        case "First":
          return 0;
        case "Second":
          return 1;
        case "Summer":
          return 2;
        default:
          return "Invalid semester";
      }
    };
  }, []);

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const response = await api.get(`/Offices`);
        setOffices(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOffices();
  }, [api]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const lastname = lastnameRef.current.value;
    const firstname = firstnameRef.current.value;
    const middlename = middlenameRef.current.value;
    const username = `${lastname}${firstname}`.toLowerCase().replace(/[^a-z0-9]/g, "");
    const officeId = officeRef.current.value;
    const program = programRef.current.value;
    const gender = genderRef.current.value;
    const sy = syRef.current.value;
    const sem = semRef.current.value;
    const yearlevel = yearlevelRef.current.value;
    const unitsAllowed = unitsAllowedRef.current.value;
    const idnumber = idnumberRef.current.value;

    const inputs = [
      lastname,
      firstname,
      username,
      officeId,
      idnumber,
      program,
      gender,
      sy,
      sem,
      yearlevel,
      unitsAllowed,
    ];
    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i]) {
        alert("Please fill out all fields.");
        return;
      }
    }

    let birthDate = birthdateRef.current.value;
    let birth = new Date(birthDate);
    let birthYear = birth.getFullYear();
    if (isNaN(birth.getTime()) || birthYear < 1000 || birthYear > 9999) {
      alert("Please enter a valid date.");
      return;
    }
    let birthDateISOString = birth.toISOString();
    let datestarted = datestartedRef.current.value;
    let start = new Date(datestarted);
    let startYear = start.getFullYear();
    if (isNaN(start.getTime()) || startYear < 1000 || startYear > 9999) {
      alert("Please enter a valid date.");
      return;
    }
    let datestartedISOString = start.toISOString();

    const selectInputs = [officeId, program, gender, sem];
    for (let i = 0; i < selectInputs.length; i++) {
      if (
        selectInputs[i] === "Select office" ||
        selectInputs[i] === "Select program" ||
        selectInputs[i] === "Select gender" ||
        selectInputs[i] === "Select semester"
      ) {
        alert("Please recheck and select a valid option.");
        return;
      }
    }

    const idnumberFormat = /^(?:\d{2}-\d{4}-\d{3}|\d{4}-\d{5})$/;
    if (!idnumberFormat.test(idnumber)) {
      alert("ID number is not in the correct format. Please use XX-XXXX-XXX or XXXX-XXXXX.");
      return;
    }

    //REGISTER AS USER
    try {
      const registeruser = await api.post(`/Auth/register/`, {
        username: username,
        password: username,
        role: "NAS",
      });
      console.log(registeruser);
    } catch (error) {
      console.error(error);
    }

    //REGISTER AS NAS
    try {
      const nasData = {
        studentIDNo: idnumber,
        username: username,
        firstName: firstname,
        middleName: middlename,
        lastName: lastname,
        gender: gender,
        birthDate: birthDateISOString,
        course: program,
        yearLevel: yearlevel,
        sySem: [
          {
            year: sy,
            semester: getSemesterValue(sem),
          },
        ],
        unitsAllowed: unitsAllowed,
        officeId: officeId,
        enNo: null,
        dateStarted: datestartedISOString,
      };

      const registernas = await api.post(`/NAS`, nasData);

      if (registernas.status === 200 || registernas.status === 201) {
        alert("Submitted successfully");
        firstnameRef.current.value = "";
        lastnameRef.current.value = "";
        middlenameRef.current.value = "";
        officeRef.current.value = "Select office";
        idnumberRef.current.value = "";
        programRef.current.value = "";
        genderRef.current.value = "Select gender";
        syRef.current.value = "";
        semRef.current.value = "Select semester";
        birthdateRef.current.value = "";
        datestartedRef.current.value = "";
        yearlevelRef.current.value = "";
        unitsAllowedRef.current.value = "";
      } else {
        alert("Submission failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <section>
        <div className="max-w-full mb-10">
          <h2 className="mb-4 text-xl font-bold text-black">Add a NAS</h2>
          <form action="#">
            <div className="grid grid-cols-3 gap-6">
              <div className="w-full">
                <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900">
                  Last Name
                </label>
                <input
                  ref={lastnameRef}
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="bg-gray-50 border border-gray text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Last name"
                  required=""
                />
              </div>
              <div className="w-full">
                <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900">
                  First Name
                </label>
                <input
                  ref={firstnameRef}
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="First name"
                  required=""
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="middlename"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Middle Name
                </label>
                <input
                  ref={middlenameRef}
                  type="text"
                  name="middlename"
                  id="middlename"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Middle name (Optional)"
                  required=""
                />
              </div>
              <div>
                <label htmlFor="office" className="block mb-2 text-sm font-medium text-gray-900">
                  Assigned Office
                </label>
                <select
                  ref={officeRef}
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                >
                  <option selected="">Select office</option>
                  {offices.map((office) => (
                    <option key={office.id} value={office.id}>
                      {office.officeName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="idNumber" className="block mb-2 text-sm font-medium text-gray-900">
                  ID Number
                </label>
                <input
                  ref={idnumberRef}
                  type="text"
                  name="item-weight"
                  id="item-weight"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="XX-XXXX-XXX or XXXX-XXXXX"
                  required=""
                />
              </div>
              <div className="w-full">
                <label htmlFor="program" className="block mb-2 text-sm font-medium text-gray-900">
                  Program
                </label>
                <select
                  ref={programRef}
                  name="program"
                  id="program"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                >
                  <option value="">Select program</option>
                  <optgroup label="College of Engineering and Architecture">
                    <option value="BS Architecture">BS Architecture</option>
                    <option value="BS Chemical Engineering">BS Chemical Engineering</option>
                    <option value="BS Civil Engineering">BS Civil Engineering</option>
                    <option value="BS Computer Engineering">BS Computer Engineering</option>
                    <option value="BS Electrical Engineering">BS Electrical Engineering</option>
                    <option value="BS Electronics Engineering">BS Electronics Engineering</option>
                    <option value="BS Industrial Engineering">BS Industrial Engineering</option>
                    <option value="BS Mechanical Engineering">BS Mechanical Engineering</option>
                    <option value="BS Mining Engineering">BS Mining Engineering</option>
                  </optgroup>
                  <optgroup label="College of Management, Business and Accountancy">
                    <option value="BS Accountancy">BS Accountancy</option>
                    <option value="BS Accounting Information Systems">
                      BS Accounting Information Systems
                    </option>
                    <option value="BS Management Accounting">BS Management Accounting</option>
                    <option value="BS Business Administration - Banking & Financial Management">
                      BS Business Administration - Banking & Financial Management
                    </option>
                    <option value="BS Business Administration - Business Analytics">
                      BS Business Administration - Business Analytics
                    </option>
                    <option value="BS Business Administration - General Business Management">
                      BS Business Administration - General Business Management
                    </option>
                    <option value="BS Business Administration - Human Resource Management">
                      BS Business Administration - Human Resource Management
                    </option>
                    <option value="BS Business Administration - Marketing Management">
                      BS Business Administration - Marketing Management
                    </option>
                    <option value="BS Business Administration - Operations Management">
                      BS Business Administration - Operations Management
                    </option>
                    <option value="BS Business Administration - Quality Management">
                      BS Business Administration - Quality Management
                    </option>
                    <option value="BS Office Administration - Associate in Office Administration">
                      BS Office Administration - Associate in Office Administration
                    </option>
                    <option value="BS Public Administration">BS Public Administration</option>
                  </optgroup>
                  <optgroup label="College of Arts, Sciences, and Education">
                    <option value="AB Communication">AB Communication</option>
                    <option value="AB English Language">AB English Language</option>
                    <option value="Bachelor of Elementary Education">
                      Bachelor of Elementary Education
                    </option>
                    <option value="Bachelor of Secondary Education Major in English">
                      Bachelor of Secondary Education Major in English
                    </option>
                    <option value="Bachelor of Secondary Education Major in Filipino">
                      Bachelor of Secondary Education Major in Filipino
                    </option>
                    <option value="Bachelor of Secondary Education Major in Mathematics">
                      Bachelor of Secondary Education Major in Mathematics
                    </option>
                    <option value="Bachelor of Secondary Education Major in Science">
                      Bachelor of Secondary Education Major in Science
                    </option>
                    <option value="Bachelor of Multimedia Arts">Bachelor of Multimedia Arts</option>
                    <option value="BS Biology">BS Biology</option>
                    <option value="BS Mathematics">BS Mathematics</option>
                    <option value="BS Psychology">BS Psychology</option>
                  </optgroup>
                  <optgroup label="College of Nursing and Allied Health Sciences">
                    <option value="BS Pharmacy">BS Pharmacy</option>
                  </optgroup>
                  <optgroup label="College of Computer Studies">
                    <option value="BS Computer Science">BS Computer Science</option>
                    <option value="BS Information Technology">BS Information Technology</option>
                  </optgroup>
                  <optgroup label="College of Criminal Justice">
                    <option value="BS Criminology">BS Criminology</option>
                  </optgroup>
                </select>
              </div>
              <div>
                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">
                  Gender
                </label>
                <select
                  ref={genderRef}
                  id="gender"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                >
                  <option selected="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="w-full">
                <label htmlFor="sy" className="block mb-2 text-sm font-medium text-gray-900">
                  School Year
                </label>
                <input
                  ref={syRef}
                  type="number"
                  name="sy"
                  id="sy"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Format: 2324"
                  required=""
                />
              </div>
              <div className="w-full">
                <label htmlFor="sem" className="block mb-2 text-sm font-medium text-gray-900">
                  Semester
                </label>
                <select
                  ref={semRef}
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                >
                  <option selected="">Select semester</option>
                  <option value="First">First</option>
                  <option value="Second">Second</option>
                  <option value="Summer">Summer</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-6 mt-5">
              <div className="w-full">
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
                  Birthdate
                </label>
                <input
                  ref={birthdateRef}
                  type="date"
                  name="middlename"
                  id="middlename"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="$2999"
                  required=""
                />
              </div>
              <div className="w-full">
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
                  Date Started
                </label>
                <input
                  ref={datestartedRef}
                  type="date"
                  name="middlename"
                  id="middlename"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="$2999"
                  required=""
                />
              </div>
              <div className="w-full">
                <label htmlFor="yearLevel" className="block mb-2 text-sm font-medium text-gray-900">
                  Year Level
                </label>
                <input
                  ref={yearlevelRef}
                  type="number"
                  name="yearLevel"
                  id="yearLevel"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="1, 2, 3, 4, etc."
                  required=""
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="unitsAllowed"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Units Allowed
                </label>
                <input
                  ref={unitsAllowedRef}
                  type="number"
                  name="unitsAllowed"
                  id="unitsAllowed"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="18"
                  required=""
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-black bg-secondary rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary hover:text-white"
              onClick={handleSubmit}
            >
              Add
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
