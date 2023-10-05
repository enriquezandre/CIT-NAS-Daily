import { Avatar } from "flowbite-react";
import PropTypes from "prop-types";

export const Header = ({ role }) => {
  return (
    <>
      <div className="flex mt-5 ml-10 items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4">
            <Avatar
              alt="NAS Image"
              img="/src/placeholders/profile-img.jpg"
              rounded
            />
          </div>
          <div className="text-base">{role}</div>
        </div>
        <button className="text-base text-red-500 mr-10">Logout</button>
      </div>
      <hr className="my-5 border-t-2 border-gray-300 ml-7 mr-7" />
    </>
  );
};

Header.propTypes = {
  role: PropTypes.string.isRequired,
};
