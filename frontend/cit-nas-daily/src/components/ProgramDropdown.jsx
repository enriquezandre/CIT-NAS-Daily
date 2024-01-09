import PropTypes from "prop-types";

const ProgramDropdown = ({ onChange, value }) => {
  return (
    <select
      name="program"
      id="program"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
      onChange={(e) => onChange(e.target.value)}
      value={value}
    >
      <option value="">Select program</option>
      <optgroup label="College of Engineering and Architecture">
        <option value="BS Architecture">BS Architecture</option>
        <option value="BS Chemical Engineering">BS Chemical Engineering</option>
        <option value="BS Civil Engineering">BS Civil Engineering</option>
        <option value="BS Computer Engineering">BS Computer Engineering</option>
        <option value="BS Electrical Engineering">BS Electrical Engineering</option>
        <option value="BS Electronics Engineering">BS Electronics Engineering</option>
        <option value="BS Industrial Engineering">BS Industrial Engineering</option>
        <option value="BS Mechanical Engineering">BS Mechanical Engineering</option>
        <option value="BS Mining Engineering">BS Mining Engineering</option>
      </optgroup>
      <optgroup label="College of Management, Business and Accountancy">
        <option value="BS Accountancy">BS Accountancy</option>
        <option value="BS Accounting Information Systems">BS Accounting Information Systems</option>
        <option value="BS Management Accounting">BS Management Accounting</option>
        <option value="BS Business Administration - Banking & Financial Management">
          BS Business Administration - Banking & Financial Management
        </option>
        <option value="BS Business Administration - Business Analytics">
          BS Business Administration - Business Analytics
        </option>
        <option value="BS Business Administration - General Business Management">
          BS Business Administration - General Business Management
        </option>
        <option value="BS Business Administration - Human Resource Management">
          BS Business Administration - Human Resource Management
        </option>
        <option value="BS Business Administration - Marketing Management">
          BS Business Administration - Marketing Management
        </option>
        <option value="BS Business Administration - Operations Management">
          BS Business Administration - Operations Management
        </option>
        <option value="BS Business Administration - Quality Management">
          BS Business Administration - Quality Management
        </option>
        <option value="BS Office Administration - Associate in Office Administration">
          BS Office Administration - Associate in Office Administration
        </option>
        <option value="BS Public Administration">BS Public Administration</option>
      </optgroup>
      <optgroup label="College of Arts, Sciences, and Education">
        <option value="AB Communication">AB Communication</option>
        <option value="AB English Language">AB English Language</option>
        <option value="Bachelor of Elementary Education">Bachelor of Elementary Education</option>
        <option value="Bachelor of Secondary Education Major in English">
          Bachelor of Secondary Education Major in English
        </option>
        <option value="Bachelor of Secondary Education Major in Filipino">
          Bachelor of Secondary Education Major in Filipino
        </option>
        <option value="Bachelor of Secondary Education Major in Mathematics">
          Bachelor of Secondary Education Major in Mathematics
        </option>
        <option value="Bachelor of Secondary Education Major in Science">
          Bachelor of Secondary Education Major in Science
        </option>
        <option value="Bachelor of Multimedia Arts">Bachelor of Multimedia Arts</option>
        <option value="BS Biology">BS Biology</option>
        <option value="BS Mathematics">BS Mathematics</option>
        <option value="BS Psychology">BS Psychology</option>
      </optgroup>
      <optgroup label="College of Nursing and Allied Health Sciences">
        <option value="BS Pharmacy">BS Pharmacy</option>
      </optgroup>
      <optgroup label="College of Computer Studies">
        <option value="BS Computer Science">BS Computer Science</option>
        <option value="BS Information Technology">BS Information Technology</option>
      </optgroup>
      <optgroup label="College of Criminal Justice">
        <option value="BS Criminology">BS Criminology</option>
      </optgroup>
    </select>
  );
};

ProgramDropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default ProgramDropdown;
