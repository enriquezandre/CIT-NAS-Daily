"use client";
import { useState } from "react";
import { Homepage } from "../../pages/Homepage";
import { AttendanceSummary } from "../../pages/NAS/AttendanceSummary";
import { ActivitiesSummary } from "../../pages/NAS/ActivitiesSummary";
import { NASEvaluationResult } from "../../pages/NAS/NASEvaluationResult";
import { NASPersonalInformation } from "../../pages/NAS/NASPersonalInformation";
import { NASSchedule } from "../../pages/NAS/NASSchedule";
import { NASChangePassword } from "../../pages/NAS/NASChangePassword";

export const NASTabs = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <>
      <div className="bg-gray-2000 w-full"></div>
      <div className="px-7">
        <div className="flex flex-col gap-1 px-1 md:flex-row md:gap-2">
          <button className={`${activeTab === 1 ? "font-bold bg-primary text-white" : "bg-secondary"} 
            px-4 py-2 rounded-tl-lg w-full rounded-lg text-sm hover:bg-primary hover:text-white`}
            onClick={() => handleTabClick(1)}
          >
            Home
          </button>
          <button
            className={`${activeTab === 2 ? "font-bold bg-primary text-white" : "bg-secondary"
              } px-4 py-2 w-full rounded-lg text-sm hover:bg-primary hover:text-white`}
            onClick={() => handleTabClick(2)}
          >
            Personal Information
          </button>
          <button
            className={`${activeTab === 3 ? "font-bold bg-primary text-white" : "bg-secondary"
              } px-4 py-2 w-full rounded-lg text-sm hover:bg-primary hover:text-white`}
            onClick={() => handleTabClick(3)}
          >
            Attendance Summary
          </button>
          <button
            className={`${activeTab === 4 ? "font-bold bg-primary text-white" : "bg-secondary"
              } px-4 py-2 w-full rounded-lg text-sm hover:bg-primary hover:text-white`}
            onClick={() => handleTabClick(4)}
          >
            Activities Summary
          </button>
          <button
            className={`${activeTab === 5 ? "font-bold bg-primary text-white" : "bg-secondary"
              } px-4 py-2 rounded-tr-lg w-full rounded-lg text-sm hover:bg-primary hover:text-white`}
            onClick={() => handleTabClick(5)}
          >
            Schedule
          </button>
          <button
            className={`${activeTab === 6 ? "font-bold bg-primary text-white" : "bg-secondary"
              } px-4 py-2 rounded-tr-lg w-full rounded-lg text-sm hover:bg-primary hover:text-white`}
            onClick={() => handleTabClick(6)}
          >
            Evaluation Result
          </button>
          <button
            className={`${activeTab === 7 ? "font-bold bg-primary text-white" : "bg-secondary"
              } px-4 py-2 rounded-tr-lg w-full rounded-lg text-sm hover:bg-primary hover:text-white`}
            onClick={() => handleTabClick(7)}
          >
            Change Password
          </button>
        </div>
        <div className="pt-4 pr-1 pb-4 pl-1 bg-white rounded-b-lg">
          {/*Content for each tab*/}
          {activeTab === 1 && (
            <div>
              <Homepage />
            </div>
          )}
          {activeTab === 2 && (
            <div>
              <NASPersonalInformation />
            </div>
          )}
          {activeTab === 3 && (
            <div>
              <AttendanceSummary />
            </div>
          )}
          {activeTab === 4 && (
            <div>
              <ActivitiesSummary />
            </div>
          )}
          {activeTab === 5 && (
            <div>
              <NASSchedule />
            </div>
          )}
          {activeTab === 6 && (
            <div>
              <NASEvaluationResult />
            </div>
          )}
          {activeTab === 7 && (
            <div>
              <NASChangePassword />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
