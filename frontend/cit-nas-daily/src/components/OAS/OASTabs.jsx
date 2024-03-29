import { useState } from "react";
import { OASOffices } from "../../pages/OAS/OASOffices";
import { OASAttendance } from "../../pages/OAS/OASAttendance";
import { OASSchedule } from "../../pages/OAS/OASSchedule";
import { OASEvaluation } from "../../pages/OAS/OASEvaluation";
import { OASStatus } from "../../pages/OAS/OASStatus";
import { OASMasterlist } from "../../pages/OAS/OASMasterlist";
import { OASValidation } from "../../pages/OAS/OASValidation";
import { OASManageData } from "../../pages/OAS/OASManageData";

export const OASTabs = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="bg-gray-2000 w-full">
      <div className="mx-auto ml-5 mr-5 md:ml-5 md:mr-5">
        <div className="flex flex-col gap-1 px-1 md:flex-row md:gap-2">
          <button
            className={`${
              activeTab === 1 ? "font-bold bg-primary text-white" : "bg-secondary"
            } px-4 py-2 rounded-tl-lg w-full rounded-lg text-xs sm:text-sm hover:bg-primary hover:text-white`}
            onClick={() => setActiveTab(1)}
          >
            Offices
          </button>
          <button
            className={`${
              activeTab === 2 ? "font-bold bg-primary text-white" : "bg-secondary"
            } px-4 py-2 w-full rounded-lg text-xs sm:text-sm hover:bg-primary hover:text-white`}
            onClick={() => setActiveTab(2)}
          >
            Attendance
          </button>
          <button
            className={`${
              activeTab === 3 ? "font-bold bg-primary text-white" : "bg-secondary"
            } px-4 py-2 w-full rounded-lg text-xs sm:text-sm hover:bg-primary hover:text-white`}
            onClick={() => setActiveTab(3)}
          >
            Schedule
          </button>
          <button
            className={`${
              activeTab === 4 ? "font-bold bg-primary text-white" : "bg-secondary"
            } px-4 py-2 w-full rounded-lg text-xs sm:text-sm hover:bg-primary hover:text-white`}
            onClick={() => setActiveTab(4)}
          >
            Evaluation
          </button>
          <button
            className={`${
              activeTab === 5 ? "font-bold bg-primary text-white" : "bg-secondary"
            } px-4 py-2 w-full rounded-lg text-xs sm:text-sm hover:bg-primary hover:text-white`}
            onClick={() => setActiveTab(5)}
          >
            NAS Status
          </button>
          <button
            className={`${
              activeTab === 6 ? "font-bold bg-primary text-white" : "bg-secondary"
            } px-4 py-2 rounded-tr-lg w-full rounded-lg text-xs sm:text-sm hover:bg-primary hover:text-white`}
            onClick={() => setActiveTab(6)}
          >
            Validation
          </button>
          <button
            className={`${
              activeTab === 7 ? "font-bold bg-primary text-white" : "bg-secondary"
            } px-4 py-2 rounded-tr-lg w-full rounded-lg text-xs sm:text-sm hover:bg-primary hover:text-white`}
            onClick={() => setActiveTab(7)}
          >
            NAS Masterlist
          </button>
          <button
            className={`${
              activeTab === 8 ? "font-bold bg-primary text-white" : "bg-secondary"
            } px-4 py-2 rounded-tr-lg w-full rounded-lg text-xs sm:text-sm hover:bg-primary hover:text-white`}
            onClick={() => setActiveTab(8)}
          >
            Manage Data
          </button>
        </div>
        <div className="pt-4 pr-1 pb-4 pl-1 bg-white rounded-b-lg">
          {/* Content for each tab */}
          {activeTab === 1 && (
            <div>
              <OASOffices />
            </div>
          )}
          {activeTab === 2 && (
            <div>
              <OASAttendance />
            </div>
          )}
          {activeTab === 3 && (
            <div>
              <OASSchedule />
            </div>
          )}
          {activeTab === 4 && (
            <div>
              <OASEvaluation />
            </div>
          )}
          {activeTab === 5 && (
            <div>
              <OASStatus />
            </div>
          )}
          {activeTab === 6 && (
            <div>
              <OASValidation />
            </div>
          )}
          {activeTab === 7 && (
            <div>
              <OASMasterlist />
            </div>
          )}
          {activeTab === 8 && (
            <div>
              <OASManageData />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
