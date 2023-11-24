import { useState, useMemo } from "react";
import { ManageUsersTable } from "../../components/OAS/ManageUsersTable";
import axios from "axios";

export const OASManageData = () => {
  const [selectedSY, setSelectedSY] = useState("2324");
  const [selectedSem, setSelectedSem] = useState("First");
  const [fileUploaded, setFileUploaded] = useState(false);
  const sy_options = ["2324", "2223", "2122", "2021"];
  const sem_options = ["First", "Second", "Summer"];

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

  const handleSelectSY = (event) => {
    const value = event.target.value;
    setSelectedSY(value);
  };

  const handleSelectSem = (event) => {
    const value = event.target.value;
    setSelectedSem(value);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    // List of allowed MIME types for Excel files
    const allowedTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type. Please upload an Excel file.");
      return;
    }

    setFileUploaded(file);
  };

  const handleSubmit = async () => {
    if (!fileUploaded) {
      alert("No file uploaded");
      return;
    }
    const formData = new FormData();
    formData.append("file", fileUploaded);

    try {
      const response = await api.post("/DTR/UploadExcel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        alert("File uploaded successfully");
        setFileUploaded(false); // Reset the file input after successful upload
      } else {
        alert("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  return (
    <>
      <div className="flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col w-9/10 mx-8 mb-10">
        <div className="flex h-full flex-col justify-center">
          <ul className="flex-wrap items-center text-lg font-medium rounded-t-lg bg-grey pr-4 py-4 grid grid-cols-2">
            <div className="flex flex-row items-center">
              <div className="flex items-center">
                <div className="flex flex-row justify-start items-center gap-10 ml-5 mr-4">
                  <div className="flex flex-row gap-2 items-center">
                    <div className="mr-2">SY:</div>
                    <select
                      id="sy"
                      name="sy"
                      value={selectedSY}
                      onChange={handleSelectSY}
                      className=" w-full text-base border rounded-md"
                    >
                      {Array.isArray(sy_options) &&
                        sy_options.map((sy, index) => (
                          <option key={index} value={sy}>
                            {sy}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <div className="mr-2">SEMESTER:</div>
                    <select
                      id="sem"
                      name="sem"
                      value={selectedSem}
                      onChange={handleSelectSem}
                      className=" w-full text-base border rounded-md"
                    >
                      {sem_options.map((sem, index) => (
                        <option key={index} value={sem}>
                          {sem}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <li className="flex justify-end">
              <div className="flex">
                <div className="relative w-auto">
                  <input
                    type="search"
                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded border"
                    placeholder="Search NAS..."
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
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          </ul>
          <div className="px-8 py-4">
            <div className="flex mt-2 mb-8">
              <p className="mr-5 font-bold">Upload DTR:</p>
              <div>
                <input
                  type="file"
                  id="fileUpload"
                  onChange={handleFileUpload}
                  accept=".xls,.xlsx"
                />
                {fileUploaded ? (
                  <button
                    className="py-2 rounded-md bg-secondary w-24 items-center justify center hover:bg-primary hover:text-white"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                ) : null}
              </div>
            </div>
            <ManageUsersTable />
          </div>
        </div>
      </div>
    </>
  );
};