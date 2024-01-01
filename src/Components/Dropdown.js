import React from "react";

const Dropdown = ({ options, onChange }) => {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md shadow-sm my-2 w-56 px-3 h-10 focus:outline-none text-center bg-slate-50  border-white"
    >
      <option value="">Select</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.displayValue}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
