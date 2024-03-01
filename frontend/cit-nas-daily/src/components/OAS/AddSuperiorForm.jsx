import { useMemo, useRef, useEffect, useState } from "react";
import { Snackbar } from "../Snackbar";
import axios from "axios";

export const AddSuperiorForm = () => {
  const [offices, setOffices] = useState([]);
  const lastnameRef = useRef();
  const firstnameRef = useRef();
  const officeRef = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [genError, setGenError] = useState("");
  const [officeError, setOfficeError] = useState("");
  const url = import.meta.env.VITE_APP_API_URL;

  const api = useMemo(
    () =>
      axios.create({
        baseURL: `${url}/api`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    [url]
  );

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const response = await api.get(`/Offices`);
        const filteredData = response.data.filter(
          (office) => !office.superiorFirstName && !office.superiorLastName
        );
        setOffices(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOffices();
  }, [api, submitted]);

  const handleSnackbarClose = () => {
    setIsSnackbarVisible(false);
  };

  const updateOfficeError = () => {
    setOfficeError("");
  };

  const updateGenError = () => {
    setGenError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const lastname = lastnameRef.current.value;
    const firstname = firstnameRef.current.value;
    const officeId = officeRef.current.value;
    const username = `${lastname}${firstname}`.toLowerCase().replace(/[^a-z0-9]/g, "");

    const inputs = [lastname, firstname, officeId, username];
    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i]) {
        setGenError("Please fill out all fields.");
        return;
      }
    }

    if (officeId === "Select office") {
      setOfficeError("Please select an office.");
      return;
    }

    //REGISTER AS USER
    try {
      const registeruser = await api.post(`/Auth/register/`, {
        username: username,
        password: username,
        role: "Superior",
      });
      console.log(registeruser);
    } catch (error) {
      console.error(error);
    }

    //REGISTER AS SUPERIOR
    try {
      const registersuperior = await api.post(`/Superiors`, {
        firstName: firstname,
        lastName: lastname,
        username: username,
      });
      console.log(registersuperior);
    } catch (error) {
      console.error(error);
    }

    //ASSIGN SUPERIOR TO OFFICE
    const officeData = {
      id: officeId,
      superiorFirstName: firstname,
      superiorLastName: lastname,
    };

    const officeresponse = await api.put(`/Offices`, officeData);
    if (officeresponse.status === 200 || officeresponse.status === 201) {
      setSubmitted(true);
      setIsSnackbarVisible(true);
      setSnackbarMsg("Superior added successfully!");
      firstnameRef.current.value = "";
      lastnameRef.current.value = "";
      officeRef.current.value = "Select office";
    } else {
      setSubmitted(false);
      setIsSnackbarVisible(true);
      setSnackbarMsg("Failed to add Superior. Please try again.");
    }
  };

  return (
    <div>
      <section>
        <div className="max-w-full mb-10 overflow-x-auto">
          <h2 className="mb-4 text-xl font-bold text-black">Add a Superior</h2>
          <form action="#">
            <div className="grid md:grid-cols-4 gap-6">
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
              {/* TO IMPLEMENT IF BACKEND IS UPDATED */}
              <div className="w-full">
                <label
                  htmlFor="middlename"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Middle Name
                </label>
                <input
                  // ref={firstnameRef}
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
                <select
                  ref={officeRef}
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  onChange={updateOfficeError}
                >
                  <option selected="">Select office</option>
                  {offices.map((office) => (
                    <option key={office.id} value={office.id}>
                      {office.officeName}
                    </option>
                  ))}
                </select>
                <p className="text-red text-sm">{officeError}</p>
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
        isSubmitted={submitted}
      />
    </div>
  );
};
