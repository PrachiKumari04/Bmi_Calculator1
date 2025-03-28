import React, { useState } from "react";
import "./BMICalculator.css"; // Ensure this file exists

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm"); // Default unit
  const [gender, setGender] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");

  const convertHeightToMeters = (height, unit) => {
    if (unit === "cm") return height / 100;
    if (unit === "m") return height;
    if (unit === "ft") return height * 0.3048; // Convert feet to meters
    return 0;
  };

  const calculateBMI = () => {
    if (!weight || !height || !gender) {
      alert("Please enter weight, height, and select gender.");
      return;
    }

    const heightInMeters = convertHeightToMeters(height, heightUnit);
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);

    let category = "";
    if (gender === "male") {
      if (bmiValue < 18.5) category = "Underweight";
      else if (bmiValue < 24.9) category = "Normal weight";
      else if (bmiValue < 29.9) category = "Overweight";
      else category = "Obese";
    } else {
      if (bmiValue < 18) category = "Underweight";
      else if (bmiValue < 23.9) category = "Normal weight";
      else if (bmiValue < 28.9) category = "Overweight";
      else category = "Obese";
    }

    setStatus(category);
  };

  return (
    <div className="bmi-container">
      <h1>BMI Calculator</h1>

      <div className="input-group">
        <label>Gender:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
            />
            Female
          </label>
        </div>
      </div>

      <div className="input-group">
        <label>Weight (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter weight"
        />
      </div>

      <div className="input-group">
        <label>Height:</label>
        <div className="height-group">
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height"
          />
          <select value={heightUnit} onChange={(e) => setHeightUnit(e.target.value)}>
            <option value="cm">cm</option>
            <option value="m">m</option>
            <option value="ft">feet</option>
          </select>
        </div>
      </div>

      <button onClick={calculateBMI}>Calculate BMI</button>

      {bmi && (
        <div className="result">
          <h2>Your BMI: {bmi}</h2>
          <p>Status: <strong>{status}</strong></p>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
