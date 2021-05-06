import React, { useState, useRef } from "react";
import "./Filter.css";

const Filter = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const handleApply = (e) => {
    console.log("Apply button from filter menu");
  };

  const renderDropDown = () => {
    console.log("isOpen", isOpen);
    return (
      <div ref={dropdownRef} className="filter-dropdown">
        <div className="filter-dropdown">"This is the drop down content"</div>
        <div className="filter-dropdown-actions">
          <button className="filter-dropdown-button" onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className="filter">
        <button className="filter-button" onClick={() => setIsOpen(!isOpen)}>
          {props.name}
        </button>
      </div>
      {/* isOpen */}
      {isOpen && renderDropDown()}
    </div>
  );
};

export default Filter;

//  {isOpen && (
//     <div ref="{dropdownRef}" classname="filter__dropdown">
//     ‍<div className="filter-dropdown">
//     ‍
//     {`Dropdown content goes here `}
//     </div>
//     ‍

//     <div classname="filter__dropdown__actions">
//     ‍
//     <button onclick={handleApply} classname="filter-dropdown-button">
//     ‍
//     Apply
//     </button>
//     </div>

//     </div>
//     </div>
// ‍
//   )}
