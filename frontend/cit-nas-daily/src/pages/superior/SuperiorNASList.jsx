"use client";
import { Header } from "../../components/Header";
import NASList from "../../components/NASList";

export const SuperiorNASList = () => {
  return (
    <div>
      <Header role={"SUPERIOR Name"} />
      <div>
        <NASList />
      </div>
    </div>
  );
};
