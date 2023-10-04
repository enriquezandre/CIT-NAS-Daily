"use client";
import { useState } from "react";
import { TimeInLog } from "../../pages/NAS/TimeInLog";

export const NASTabs = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="bg-gray-2000 w-full">
      <div className="mx-auto ml-10 mr-10">
        <div className="flex justify-center w-full">
          <button
            className={`${
              activeTab === 1
                ? "font-bold bg-primary text-white"
                : "bg-secondary"
            } px-4 py-2 rounded-tl-lg w-full rounded-lg m-1 text-sm hover:bg-primary hover:text-white`}
            onClick={() => handleTabClick(1)}
          >
            Home
          </button>
          <button
            className={`${
              activeTab === 2
                ? "font-bold bg-primary text-white"
                : "bg-secondary"
            } px-4 py-2 w-full rounded-lg m-1 text-sm hover:bg-primary hover:text-white`}
            onClick={() => handleTabClick(2)}
          >
            Personal Information
          </button>
          <button
            className={`${
              activeTab === 3
                ? "font-bold bg-primary text-white"
                : "bg-secondary"
            } px-4 py-2 w-full rounded-lg m-1 text-sm hover:bg-primary hover:text-white`}
            onClick={() => handleTabClick(3)}
          >
            Attendance Summary
          </button>
          <button
            className={`${
              activeTab === 4
                ? "font-bold bg-primary text-white"
                : "bg-secondary"
            } px-4 py-2 w-full rounded-lg m-1 text-sm hover:bg-primary hover:text-white`}
            onClick={() => handleTabClick(4)}
          >
            Activities Summary
          </button>
          <button
            className={`${
              activeTab === 5
                ? "font-bold bg-primary text-white"
                : "bg-secondary"
            } px-4 py-2 rounded-tr-lg w-full rounded-lg m-1 text-sm hover:bg-primary hover:text-white`}
            onClick={() => handleTabClick(5)}
          >
            Schedule of Duty
          </button>
          <button
            className={`${
              activeTab === 6
                ? "font-bold bg-primary text-white"
                : "bg-secondary"
            } px-4 py-2 rounded-tr-lg w-full rounded-lg m-1 text-sm hover:bg-primary hover:text-white`}
            onClick={() => handleTabClick(6)}
          >
            Evaluation Result
          </button>
        </div>
        <div className="p-4 bg-white rounded-b-lg">
          {/* Content for each tab */}
          {activeTab === 1 && (
            <div>
              <TimeInLog />
            </div>
          )}
          {activeTab === 2 && <div>Personal Information Page Here</div>}
          {activeTab === 3 && <div>Attendance Summary Page Here</div>}
          {activeTab === 4 && <div>Activities Summary Page Here</div>}
          {activeTab === 5 && <div>Schedule of Duty Here</div>}
          {activeTab === 6 && <div>Evaluation Result Here</div>}
        </div>
      </div>
    </div>
  );
};