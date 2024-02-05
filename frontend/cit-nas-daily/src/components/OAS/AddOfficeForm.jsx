import { useMemo, useRef, useState } from "react";
import { Snackbar } from "../Snackbar";
import axios from "axios";

export const AddOfficeForm = () => {
  const officenameRef = useRef();
  const [isSubmitted, setSubmitted] = useState(false);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [genError, setGenError] = useState("");
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const officename = officenameRef.current.value;
    if (!officename) {
      setGenError("Please enter office name.");
      return;
    }

    //REGISTER OFFICE
    try {
      const registeroffice = await api.post(`/Offices`, {
        officename: officename,
      });
      console.log(registeroffice);
      if (registeroffice.status === 200 || registeroffice.status === 201) {
        setSubmitted(true);
        setIsSnackbarVisible(true);
        setSnackbarMsg("Office added successfully!");
        officenameRef.current.value = "";
      } else {
        setSubmitted(false);
        setIsSnackbarVisible(true);
        setSnackbarMsg("Office not added. Please try again.");
      }
    } catch (error) {
      setSubmitted(false);
      setIsSnackbarVisible(true);
      setSnackbarMsg("Office not added. Please try again.");
    }
  };

  const handleSnackbarClose = () => {
    setIsSnackbarVisible(false);
  };

  const updateGenError = () => {
    setGenError("");
  };

  return (
    <div>
      <section>
        <div className="max-w-full mb-10 overflow-x-auto">
          <h2 className="mb-4 text-xl font-bold text-black">Add an Office</h2>
          <form action="#">
            <div className="grid gap-6">
              <div className="w-full">
                <label
                  htmlFor="officename"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Office Name
                </label>
                <input
                  ref={officenameRef}
                  type="text"
                  name="officename"
                  id="officename"
                  className="bg-gray-50 border border-gray text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Office name"
                  required=""
                  onChange={updateGenError}
                />
                <p className="text-red text-sm">{genError}</p>
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
      <Snackbar
        message={snackbarMsg}
        onClose={handleSnackbarClose}
        isSnackbarVisible={isSnackbarVisible}
        isSubmitted={isSubmitted}
      />
    </div>
  );
};
