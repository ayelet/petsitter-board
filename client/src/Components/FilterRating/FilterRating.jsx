import React, { useState } from "react";
import { FaPaw } from "react-icons/fa";
import { IoPawOutline } from "react-icons/io5";
import "./FilterRating.css";

const ratingDesc = {
  4: "4 paws and up",
  3: "3 paws and up",
  2: "2 paws and up",
  1: "All reviews",
};

const FilterRating = () => {
  const [option, setOption] = useState("3 & Up");

  const onValueChanged = (event) => {
    setOption(event.target.value);
  };

  return (
    <div className="reviews-filter">
      <div className="reviews-title">
        <span>Reviews</span>
      </div>
      <div className="radio">
        <label>
          <input
            type="radio"
            value="4"
            checked={setOption === "4"}
            onChange={onValueChanged}
          />
          <FaPaw /> <FaPaw /> <FaPaw /> <FaPaw /> <IoPawOutline /> & up
        </label>
      </div>
      <div className="radio">
        <label>
          <input
            type="radio"
            value="3"
            checked={setOption === "3"}
            onChange={onValueChanged}
          />
          <FaPaw /> <FaPaw /> <FaPaw /> <IoPawOutline /> <IoPawOutline /> & up
        </label>
      </div>
      <div className="radio">
        <label>
          <input
            type="radio"
            value="2"
            checked={setOption === "2"}
            onChange={onValueChanged}
          />
          <FaPaw /> <FaPaw /> <IoPawOutline /> <IoPawOutline /> <IoPawOutline />{" "}
          & up
        </label>
      </div>
      <div>Selected option is : {ratingDesc[option]}</div>
    </div>
  );
};

export default FilterRating;
