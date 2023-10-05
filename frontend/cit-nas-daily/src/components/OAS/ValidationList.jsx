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
      <div className="border border-solid border-2 p-3 flex items-center">
          <Avatar rounded />
          <span className="ml-5">NAS Name</span>
        <div className="flex justify-end">
          <button type="button" class="text-white bg-primary hover:bg-primary hover:text-secondary font-medium rounded-lg text-sm px-5 py-2.5">View Letter</button>
              {/* Dropdown menu */}
              <select
                value={selectedOption}
                onChange={handleOptionChange}
                className="ml-2 p-2 border border-solid border-2 rounded-md"
              >
                <option value="">Choose Response</option>
                <option value="excused">Excused</option>
                <option value="unexcused">Unexcused</option>
              </select>
            <button type="button" class="text-white bg-primary hover:bg-primary hover:text-secondary font-medium rounded-lg text-sm px-5 py-2.5">Submit</button>
          </div>
        </div>
    </div>
  );
};
