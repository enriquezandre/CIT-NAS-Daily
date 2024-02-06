import { useMemo, useRef, useState } from "react";
import axios from "axios";
import ProgramDropdown from "../ProgramDropdown";
import OfficeDropdown from "../OfficeDropdown";
import { Snackbar } from "../Snackbar";

export const AddNASForm = () => {
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedOfficeName, setSelectedOfficeName] = useState(null);
  const [selectedOfficeId, setOfficeId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [bdayError, setBdayError] = useState("");
  const [genError, setgenError] = useState("");
  const [idNumError, setIdNumError] = useState("");
  const [dateStartError, setDateStartError] = useState("");
  const lastnameRef = useRef();
  const firstnameRef = useRef();
  const middlenameRef = useRef();
  const idnumberRef = useRef();
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

  const handleOfficeChange = (id) => {
    setOfficeId(id);
    setSelectedOfficeName(id);
    setgenError("");
  };

  const handleSnackbarClose = () => {
    setIsSnackbarVisible(false);
  };

  const updateBdayError = () => setBdayError("");
  const updateGenError = () => setgenError("");
  const updateIdNumError = () => setIdNumError("");
  const updateDateStartError = () => setDateStartError("");

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const lastname = lastnameRef.current.value;
    const firstname = firstnameRef.current.value;
    const middlename = middlenameRef.current.value;
    const username = `${lastname}${firstname}`.toLowerCase().replace(/[^a-z0-9]/g, "");
    const officeId = selectedOfficeId;
    const program = selectedProgram;
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
        setgenError("Please fill out all fields.");
        return;
      }
    }

    let birthDate = birthdateRef.current.value;
    let birth = new Date(birthDate);
    let birthYear = birth.getFullYear();
    if (isNaN(birth.getTime()) || birthYear < 1000 || birthYear > 9999) {
      setBdayError("Please enter a valid date.");
      return;
    }
    let birthDateISOString = birth.toISOString();
    let datestarted = datestartedRef.current.value;
    let start = new Date(datestarted);
    let startYear = start.getFullYear();
    if (isNaN(start.getTime()) || startYear < 1000 || startYear > 9999) {
      setDateStartError("Please enter a valid date.");
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
        setgenError("Please recheck and select a valid option.");
        return;
      }
    }

    const idnumberFormat = /^(?:\d{2}-\d{4}-\d{3}|\d{4}-\d{5})$/;
    if (!idnumberFormat.test(idnumber)) {
      setIdNumError(
        "ID number is not in the correct format. Please use XX-XXXX-XXX or XXXX-XXXXX."
      );
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
        setIsSubmitted(true);
        setIsSnackbarVisible(true);
        setSnackbarMsg("NAS added successfully!");
        firstnameRef.current.value = "";
        lastnameRef.current.value = "";
        middlenameRef.current.value = "";
        setSelectedOfficeName("");
        setOfficeId();
        idnumberRef.current.value = "";
        setSelectedProgram("");
        genderRef.current.value = "Select gender";
        syRef.current.value = "";
        semRef.current.value = "Select semester";
        birthdateRef.current.value = "";
        datestartedRef.current.value = "";
        yearlevelRef.current.value = "";
        unitsAllowedRef.current.value = "";
      } else {
        setIsSubmitted(false);
        setIsSnackbarVisible(true);
        setSnackbarMsg("Failed to add NAS. Please try again.");
      }
    } catch (error) {
      setIsSubmitted(false);
      setIsSnackbarVisible(true);
      setSnackbarMsg("Failed to add NAS. Please try again.");
    }
  };

  return (
    <div>
      <section>
        <div className="max-w-full mb-10 overflow-x-auto">
          <h2 className="mb-4 text-xl font-bold text-black">Add a NAS</h2>
          <form action="#">
            <div className="grid md:grid-cols-3 gap-6">
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
                  onChange={updateGenError}
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
                  onChange={updateGenError}
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
                  onChange={updateGenError}
                />
              </div>
              <div>
                <label htmlFor="office" className="block mb-2 text-sm font-medium text-gray-900">
                  Assigned Office
                </label>
                <OfficeDropdown onChange={handleOfficeChange} value={selectedOfficeName} />
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
                  onChange={updateIdNumError}
                />
                <p className="text-red text-sm">{idNumError}</p>
              </div>
              <div className="w-full">
                <label htmlFor="program" className="block mb-2 text-sm font-medium text-gray-900">
                  Program
                </label>
                <ProgramDropdown
                  onChange={(value) => setSelectedProgram(value)}
                  value={selectedProgram}
                />
              </div>
              <div>
                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">
                  Gender
                </label>
                <select
                  ref={genderRef}
                  id="gender"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  onChange={updateGenError}
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
                  onChange={updateGenError}
                />
              </div>
              <div className="w-full">
                <label htmlFor="sem" className="block mb-2 text-sm font-medium text-gray-900">
                  Semester
                </label>
                <select
                  ref={semRef}
                  id="category"
                  onChange={updateGenError}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                >
                  <option selected="">Select semester</option>
                  <option value="First">First</option>
                  <option value="Second">Second</option>
                  <option value="Summer">Summer</option>
                </select>
              </div>
            </div>
            <div className="grid md:grid-cols-4 gap-6 mt-5">
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
                  onChange={updateBdayError}
                />
                <p className="text-red text-sm">{bdayError}</p>
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
                  onChange={updateDateStartError}
                />
                <p className="text-red text-sm">{dateStartError}</p>
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
                  onChange={updateGenError}
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
                  onChange={updateGenError}
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
            <p className="text-red text-sm">{genError}</p>
          </form>
        </div>
      </section>
      <Snackbar
        message={snackbarMsg}
        onClose={handleSnackbarClose}
        isSnackbarVisible={isSnackbarVisible}
        isSubmitted={isSubmitted}
      />
    </div>
  );
};
