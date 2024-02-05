"use client";
import { useState } from "react";
import { SuperiorChangePassword } from "../../pages/superior/SuperiorChangePassword";
import SuperiorList from "./SuperiorList";
import { Homepage } from "../../pages/Homepage";

export const SuperiorTabs = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="w-full">
      <div className="px-7">
        <div className="flex flex-col gap-1 px-1 md:flex-row md:gap-2">
          <button
            className={`${
              activeTab === 1 ? "font-bold bg-primary text-white" : "bg-secondary"
            } px-4 py-2 rounded-tl-lg w-full rounded-lg text-sm hover:bg-primary hover:text-white`}
            onClick={() => handleTabClick(1)}
          >
            Home
          </button>
          <button
            className={`${
              activeTab === 2 ? "font-bold bg-primary text-white" : "bg-secondary"
            } px-4 py-2 rounded-tl-lg w-full rounded-lg text-sm hover:bg-primary hover:text-white`}
            onClick={() => handleTabClick(2)}
          >
            NAS List
          </button>
          <button
            className={`${
              activeTab === 3 ? "font-bold bg-primary text-white" : "bg-secondary"
            } px-4 py-2 rounded-tl-lg w-full rounded-lg text-sm hover:bg-primary hover:text-white`}
            onClick={() => handleTabClick(3)}
          >
            Change Password
          </button>
        </div>
        <div className="pt-4 pr-1 pb-4 pl-1 bg-white rounded-b-lg">
          {activeTab === 1 && (
            <div>
              <Homepage />
            </div>
          )}
          {activeTab === 2 && (
            <div>
              <SuperiorList />
            </div>
          )}
          {activeTab === 3 && (
            <div>
              <SuperiorChangePassword />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
