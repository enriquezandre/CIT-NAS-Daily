import { Avatar } from "flowbite-react";

export const SuperiorHeader = () => {
  return (
    <div className="flex mt-20 ml-10 items-center justify-between">
      <div className="flex items-center">
        <div className="mr-4">
          <Avatar rounded />
        </div>
        <div className="text-base">Superior</div>
      </div>
      <button className="text-base text-red-500 mr-10">Logout</button>
    </div>
  );
};
