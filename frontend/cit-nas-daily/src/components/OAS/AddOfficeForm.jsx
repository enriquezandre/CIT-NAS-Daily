import { useMemo, useRef } from "react";
import axios from "axios";

export const AddOfficeForm = () => {
  const officenameRef = useRef();
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

    //REGISTER OFFICE
    try {
      const registeroffice = await api.post(`/Offices`, {
        officename: officename,
      });
      console.log(registeroffice);
      if (registeroffice.status === 200 || registeroffice.status === 201) {
        alert("Submitted successfully");
        officenameRef.current.value = "";
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
          <h2 className="mb-4 text-xl font-bold text-black">Add an Office</h2>
          <form action="#">
            <div className="grid grid-cols-3 gap-6">
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
