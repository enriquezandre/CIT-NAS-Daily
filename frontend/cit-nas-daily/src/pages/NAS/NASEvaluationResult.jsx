"use client";
import { useState } from "react";
import { Dropdown } from "../../components/Dropdown.jsx";

export const NASEvaluationResult = () => {
  const [selectedSY, setSelectedSY] = useState("");
  const [selectedSem, setSelectedSem] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);

  const sy_options = ["2324", "2223", "2122", "2021"];
  const sem_options = ["First", "Second", "Summer"];

  const handleSelectSY = (value) => {
    setSelectedSY(value);
  };

  const handleSelectSem = (value) => {
    setSelectedSem(value);
  };

  const handleFileUpload = (event) => {
    if (event.target.files.length > 0) {
      setFileUploaded(true); // Step 3: Update state when a file is selected
    } else {
      setFileUploaded(false);
    }
  };

  return (
    <div className="justify-center w-full h-full items-center border border-solid rounded-lg">
      <div className="m-3">
        <div className="m-2">
          <div className="flex items-center justify-center text-xl font-bold">
            Evaluation Result
          </div>
          <div className="flex mt-2 ml-2">
            <div className="w-48 z-10">
              SY: <Dropdown options={sy_options} onSelect={handleSelectSY} />
              <p className="mt-4">Selected Value: {selectedSY}</p>
            </div>
            <div className="w-56 z-10">
              SEMESTER:{" "}
              <Dropdown options={sem_options} onSelect={handleSelectSem} />
              <p className="mt-4">Selected Value: {selectedSem}</p>
            </div>
          </div>
          <hr className="my-5 border-t-2 border-gray-300 mx-2" />
          <div className="flex gap-44 ml-2">
            <div className="flex flex-col mt-2">
              <div className="flex flex-row gap-28 justify-start items-center text-lg">
                <div>SUPERIOR EVALUATION:</div>
                <div className="font-bold">4.8</div>
              </div>
              <div className="flex flex-row gap-24 justify-start items-center text-lg mt-2">
                <div>TIMEKEEPING STATUS:</div>
                <div className="font-bold text-green">EXCELLENT</div>
              </div>
              <div className="flex flex-row gap-16 justify-start items-center text-lg mt-2">
                <div>ALLOWED FOR ENROLLMENT:</div>
                <div className="font-bold">YES</div>
              </div>
            </div>
            <div className="flex flex-col mt-2">
              <div className="flex flex-row gap-16 justify-start items-center text-lg">
                <div>NUMBER OF UNITS ALLOWED:</div>
                <div className="font-bold">18</div>
              </div>
              <div className="flex flex-row gap-36 justify-start items-center text-lg mt-2">
                <div>GRADE STATUS:</div>
                <div className="text-sm">
                  <input
                    type="file"
                    id="fileUpload"
                    accept=".pdf, .doc, .docx"
                    onChange={handleFileUpload}
                  />
                  {fileUploaded ? (
                    <button className="py-2 rounded-md bg-secondary w-24 items-center justify center hover:bg-primary hover:text-white">
                      Submit
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-7 bg-good p-3 rounded-lg">
            <p>
              Please upload your grades to finalize your evaluation and number
              of units allowed for you to enroll. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Nam porttitor sed justo sit amet
              pharetra. Vivamus sit amet pretium velit. Curabitur vitae metus
              sed enim convallis rhoncus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
