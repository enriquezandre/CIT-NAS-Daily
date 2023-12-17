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

  const lastname = lastnameRef.current.value;
  const firstname = firstnameRef.current.value;
  const middlename = middlenameRef.current.value;
  const username = `${firstname}${lastname}`.toLowerCase();
  const officeId = officeRef.current.value;
  const idnumber = idnumberRef.current.value;
  const program = programRef.current.value;
  const gender = genderRef.current.value;
  const sy = syRef.current.value;
  const sem = semRef.current.value;
  const yearlevel = yearlevelRef.current.value;
  const unitsAllowed = unitsAllowedRef.current.value;
  let birthDate = birthdateRef.current.value;
  let birth = new Date(birthDate);
  let birthDateISOString = birth.toISOString();
  let datestarted = datestartedRef.current.value;
  let start = new Date(datestarted);
  let datestartedISOString = start.toISOString();

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
                  placeholder="XX-XXXX-XX or XXXX-XXXXX"
                  required=""
                />
              </div>
              <div className="w-full">
                <label htmlFor="program" className="block mb-2 text-sm font-medium text-gray-900">
                  Program
                </label>
                <input
                  ref={programRef}
                  type="text"
                  name="program"
                  id="program"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Program"
                  required=""
                />
              </div>
              <div>
                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">
                  Gender
                </label>
                <select
                  ref={genderRef}
                  id="category"
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
