import PropTypes from "prop-types";

export const DataDisplayBox = ({ label, data }) => {
  return (
    <div className="w-full md:w-4/5 bg-white shadow-md flex md:m-1 text-sm">
      <div className="w-4/5">
        <div className="bg-primary p-2 h-full text-white rounded-l-lg flex items-center">{label}</div>
      </div>
      <div className="bg-secondary w-1/5 p-2 rounded-r-lg">
        <div className="flex items-center justify-center">{data}</div>
      </div>
    </div>
  );
};

DataDisplayBox.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};
