"use client";
import { SuperiorHeader } from "../../components/SuperiorHeader";
import NASList from "../../components/NASList";

export const SuperiorNASList = () => {
  return (
    <div>
      SuperiorNASList
      <SuperiorHeader />
      <hr className="my-5 border-t-2 border-gray-300 ml-7 mr-7" />
      <div>
        <NASList />
      </div>
    </div>
  );
};
