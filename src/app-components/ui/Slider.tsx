"use client";

import React, { useState, useRef, useEffect } from "react";

type SliderProps = {
  value: number[];
  onValueChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
};

export const Slider: React.FC<SliderProps> = ({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className = "",
}) => {
  const [internalValue, setInternalValue] = useState(value[0] || 0);
  const rangeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInternalValue(value[0]);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = Number(e.target.value);
    setInternalValue(newVal);
    onValueChange([newVal]);
  };

  const percentage = ((internalValue - min) / (max - min)) * 100;

  return (
    <div className={`relative w-full h-6 ${className}`}>
      {/* Track */}
      <div className="absolute top-1/2 left-0 w-full h-2 rounded-full bg-gray-200 transform -translate-y-1/2" />

      {/* Filled range */}
      <div
        ref={rangeRef}
        className="absolute top-1/2 left-0 h-2 rounded-full bg-primary transform -translate-y-1/2"
        style={{ width: `${percentage}%` }}
      />

      {/* Input slider */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={internalValue}
        onChange={handleChange}
        className="absolute top-0 left-0 w-full h-6 bg-transparent appearance-none cursor-pointer"
      />

      {/* Custom thumb styling */}
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: white;
          border: 2px solid #49b6b9;
          cursor: pointer;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        input[type="range"]::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: white;
          border: 2px solid #49b6b9;
          cursor: pointer;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s;
        }
        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};
