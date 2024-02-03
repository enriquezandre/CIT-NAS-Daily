import PropTypes from "prop-types";

export const Dropdown = ({ label, options, selectedValue, onChange }) => {
  return (
    <div className="flex flex-row gap-1 md:gap-0.5 items-center">
      <div className="mr-1 lg:mr-2 text-sm">{label}:</div>
      <select
        value={selectedValue}
        onChange={onChange}
        className="w-auto text-sm lg:text-base border rounded-md sm:w-[5.5rem]"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
