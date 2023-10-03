import { Avatar } from "flowbite-react";

export const NASHeader = () => {
  return (
    <div className="flex mt-20 ml-10 items-center justify-between">
      <div className="flex items-center">
        <div className="mr-4">
          {/* Placeholder only, will change if database is finalized in backend */}
          <Avatar
            alt="NAS Image"
            img="/src/placeholders/profile-img.jpg"
            rounded
          />
        </div>
        <button className="text-base">NAS Name</button>
      </div>
      <button className="text-base text-red-500 mr-10">Logout</button>
    </div>
  );
};
