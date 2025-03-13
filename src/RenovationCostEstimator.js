import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";


export default function RenovationCostEstimator() {
  const [projectType, setProjectType] = useState("Kitchen");
  const [squareFootage, setSquareFootage] = useState(300);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [customCosts, setCustomCosts] = useState({ Kitchen: 90, Bathroom: 80, "Living Room": 70, "Mudroom": 75, "Laundry Room": 85, "Pantry": 78, "Additions": 100 });
  const [optionCosts, setOptionCosts] = useState({ Cabinets: 5000, Counters: 3000, Backsplash: 1500, Flooring: 4000, Lighting: 1200, "Faucet & Sink": 1800, "Toilet": 1000 });

  const projectOptions = {
    Kitchen: ["Cabinets", "Counters", "Backsplash", "Flooring", "Lighting", "Faucet & Sink"],
    Bathroom: ["Vanity", "Shower", "Toilet", "Flooring", "Lighting"],
    "Living Room": ["Flooring", "Lighting", "Paint", "Windows"],
    Mudroom: ["Storage", "Flooring", "Lighting"],
    "Laundry Room": ["Cabinets", "Countertops", "Flooring", "Lighting"],
    Pantry: ["Shelving", "Lighting", "Flooring"],
    Additions: ["Framing", "Insulation", "Electrical", "HVAC"],
  };

  useEffect(() => {
    if (submitted) {
      let baseCost = squareFootage * (customCosts[projectType] || 90);
      selectedOptions.forEach(option => {
        baseCost += optionCosts[option] || 2000;
      });
      setEstimatedCost(Math.round(baseCost));
    }
  }, [squareFootage, selectedOptions, projectType, submitted]);

  const handleSubmit = () => {
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto mt-10 shadow-lg rounded-lg border bg-white font-[Open_Sans]">
      <CardContent>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 font-[Playfair_Display]">Renovation Cost Estimator</h2>
        <div className="mb-4">
          <Label className="text-lg font-semibold">Project Type</Label>
          <select
            className="w-full border p-3 rounded-lg bg-gray-50 text-gray-700"
            value={projectType}
            onChange={(e) => {
              setProjectType(e.target.value);
              setSelectedOptions([]);
            }}
          >
            {Object.keys(projectOptions).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <Label className="text-lg font-semibold">Square Footage</Label>
          <Input
            type="number"
            className="border p-3 rounded-lg w-full"
            value={squareFootage}
            onChange={(e) => setSquareFootage(Number(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <Label className="text-lg font-semibold">Renovation Features</Label>
          {projectOptions[projectType].map((option) => (
            <div key={option} className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedOptions.includes(option)}
                onChange={(e) => {
                  const newOptions = e.target.checked
                    ? [...selectedOptions, option]
                    : selectedOptions.filter((item) => item !== option);
                  setSelectedOptions(newOptions);
                }}
              />
              {option} (${optionCosts[option] || 2000})
            </div>
          ))}
        </div>
        <div className="mb-4">
          <Label className="text-lg font-semibold">Email Address (Required to See Estimate)</Label>
          <Input
            type="email"
            className="border p-3 rounded-lg w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded-lg">Submit</Button>
        {submitted && estimatedCost > 0 && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-100 text-center">
            <p className="text-lg font-bold text-gray-800">Estimated Cost: <span className="text-blue-600">${estimatedCost.toLocaleString()}</span></p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
