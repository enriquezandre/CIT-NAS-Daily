"use client";
import { Card } from "flowbite-react";
import { Avatar } from "flowbite-react";

const NASList = () => {
  return (
    <div className="flex justify-center items-center">
      <Card className="w-3/5 mt-5">
        <h5 className="text-2xl font-bold tracking-tight">
          <p>ENROLLMENT TECHNICAL OFFICE</p>
        </h5>
        {/* Placed only 1 placeholder para e loop nalang sya sa tanan nga NAS assigned gikan sa db*/}
        <div className="grid gap-3">
          <button className="border-solid border-2 p-3 flex items-center hover:bg-grey">
            <Avatar rounded />
            <span className="ml-5">NAS Name</span>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default NASList;
