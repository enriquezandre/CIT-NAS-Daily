"use client";
import { useState } from "react";
import { OASAttendance } from "../../pages/OAS/OASAttendance";
import { OASEvaluation } from "../../pages/OAS/OASEvaluation";
import { OASStatus } from "../../pages/OAS/OASStatus";

export const OASTabs = () => {
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
            Offices
          </button>
          <button
            className={`${
              activeTab === 2
                ? "font-bold bg-primary text-white"
                : "bg-secondary"
            } px-4 py-2 w-full rounded-lg m-1 text-sm hover:bg-primary hover:text-white`}
            onClick={() => handleTabClick(2)}
          >
            Attendance
          </button>
          <button
            className={`${
              activeTab === 3
                ? "font-bold bg-primary text-white"
                : "bg-secondary"
            } px-4 py-2 w-full rounded-lg m-1 text-sm hover:bg-primary hover:text-white`}
            onClick={() => handleTabClick(3)}
          >
            Evaluation
          </button>
          <button
            className={`${
              activeTab === 4
                ? "font-bold bg-primary text-white"
                : "bg-secondary"
            } px-4 py-2 w-full rounded-lg m-1 text-sm hover:bg-primary hover:text-white`}
            onClick={() => handleTabClick(4)}
          >
            NAS Status
          </button>
          <button
            className={`${
              activeTab === 5
                ? "font-bold bg-primary text-white"
                : "bg-secondary"
            } px-4 py-2 rounded-tr-lg w-full rounded-lg m-1 text-sm hover:bg-primary hover:text-white`}
            onClick={() => handleTabClick(5)}
          >
            Validation
          </button>
          <button
            className={`${
              activeTab === 6
                ? "font-bold bg-primary text-white"
                : "bg-secondary"
            } px-4 py-2 rounded-tr-lg w-full rounded-lg m-1 text-sm hover:bg-primary hover:text-white`}
            onClick={() => handleTabClick(6)}
          >
            NAS Masterlist
          </button>
        </div>
        <div className="p-4 bg-white rounded-b-lg">
          {/* Content for each tab */}
          {activeTab === 1 && <div>Offices Page Here</div>}
          {activeTab === 2 && (
            <div>
              <OASAttendance />
            </div>
          )}
          {activeTab === 3 && (
            <div>
              <OASEvaluation />
            </div>
          )}
          {activeTab === 4 && (
            <div>
              <OASStatus />
            </div>
          )}
          {activeTab === 5 && <div>Validation Page Here</div>}
          {activeTab === 6 && <div>NAS Masterlist Page Here</div>}
        </div>
      </div>
    </div>
  );
};