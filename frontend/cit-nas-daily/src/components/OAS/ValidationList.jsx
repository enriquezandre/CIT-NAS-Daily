import { Card } from "flowbite-react";
import { Avatar } from "flowbite-react";
import { useState } from "react";

export const ValidationList = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    // one place holder
    <div className="grid gap-3">
      <div className="border border-solid border-2 p-3 flex items-center justify-between">
        <div className="flex items-center">
          <Avatar rounded />
          <span className="ml-5">NAS Name</span>
        </div>
        <div className="flex items-center space-x-2">
          <button type="button" class="text-white bg-primary hover:bg-primary hover:text-secondary font-medium rounded-lg text-sm px-5 py-2.5 h-[2.6rem]">View Letter</button>
          {/* Dropdown menu */}
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className="p-2 border border-solid rounded-md h-[2.6rem] bg-[#ebeced]"
          >
            <option value="">Choose Response</option>
            <option value="excused">Excused</option>
            <option value="unexcused">Unexcused</option>
            <option value="formakeupduty">For Make Up Duty</option>
            <option value="approved">Approved</option>
            <option value="disapproved">Disapproved</option>
            <option value="warning">Warning</option>
            <option value="lastwarning">Last Warning</option>
            <option value="report">Report to Office</option>

          </select>
          <button type="button" class="text-white bg-primary hover:bg-primary hover:text-secondary font-medium rounded-lg text-sm px-5 py-2.5 h-[2.6rem]">Submit</button>
        </div>
      </div>
    </div>

  );
};
