import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const OfficeDropdown = ({ onChange, value }) => {
  const [offices, setOffices] = useState([]);

  const api = useMemo(
    () =>
      axios.create({
        baseURL: "https://localhost:7001/api",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    []
  );

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const response = await api.get(`/Offices`);
        setOffices(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOffices();
  }, [api]);

  return (
    <select
      id="category"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
      onChange={(e) => onChange(e.target.value)}
      value={value}
    >
      <option selected={value}>Select office</option>
      {offices.map((office) => (
        <option key={office.id} value={`${office.id}`}>
          {office.officeName}
        </option>
      ))}
    </select>
  );
};

OfficeDropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default OfficeDropdown;
