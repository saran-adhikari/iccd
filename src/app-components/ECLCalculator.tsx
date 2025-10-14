// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { Slider } from "@/app-components/ui/Slider";

// export default function ECLCalculator() {
//   const [pd, setPd] = useState(5);
//   const [lgd, setLgd] = useState(45);
//   const [ead, setEad] = useState(100000);
//   const [eir, setEir] = useState(8);

//   // Core ECL formula
//   const ecl = ((pd / 100) * (lgd / 100) * ead) / (1 + eir / 100);

//   // Simplified risk metric
//   const riskPercent = Math.min((pd * lgd) / 100, 100);

//   // Dynamic color for risk
//   const getColor = () => {
//     if (riskPercent < 20) return "#16a34a"; // green
//     if (riskPercent < 50) return "#eab308"; // yellow
//     return "#dc2626"; // red
//   };

//   const strokeColor = getColor();

//   // Circle visual values
//   const radius = 110;
//   const circumference = 2 * Math.PI * radius;
//   const offset = circumference - (riskPercent / 100) * circumference;

//   // Data for chart
//   const chartData = [
//     { name: "PD (%)", value: pd },
//     { name: "LGD (%)", value: lgd },
//     { name: "EIR (%)", value: eir },
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       className="w-[80%] mx-auto my-12 p-8 bg-white border border-gray-100 rounded-2xl"
//     >
//       <h2 className="text-center text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-black">
//         Expected Credit Loss <span className="text-primary">(ECL) Calculator</span>
//       </h2>

//       {/* Input Section */}
//       <div className="grid md:grid-cols-2 gap-6 mb-10 mt-10">
//         {/* PD */}
//         <div>
//           <label className="block font-medium text-gray-700 mb-2">
//             Probability of Default (PD): {pd}%
//           </label>
//           <Slider
//             value={[pd]}
//             onValueChange={(v) => setPd(v[0])}
//             max={100}
//             step={0.5}
//             className="h-6"
//           />
//         </div>

//         {/* LGD */}
//         <div>
//           <label className="block font-medium text-gray-700 mb-2">
//             Loss Given Default (LGD): {lgd}%
//           </label>
//           <Slider
//             value={[lgd]}
//             onValueChange={(v) => setLgd(v[0])}
//             max={100}
//             step={0.5}
//             className="h-6"
//           />
//         </div>

//         {/* EAD */}
//         <div>
//           <label className="block font-medium text-gray-700 mb-2">
//             Exposure at Default (EAD, NPR)
//           </label>
//           <input
//             type="number"
//             value={ead}
//             onChange={(e) => setEad(Number(e.target.value))}
//             className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#49b6b9] outline-none"
//           />
//         </div>

//         {/* EIR */}
//         <div>
//           <label className="block font-medium text-gray-700 mb-2">
//             Effective Interest Rate (EIR): {eir}%
//           </label>
//           <Slider
//             value={[eir]}
//             onValueChange={(v) => setEir(v[0])}
//             max={20}
//             step={0.1}
//             className="h-6"
//           />
//         </div>
//       </div>

//       {/* Output Section */}
//       <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
//         {/* Bar Chart (left, full size as before) */}
//         <div className="flex-1 w-full h-70">
//         <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={chartData}>
//             <XAxis dataKey="name" stroke="#374151" />
//             <YAxis stroke="#374151" />
//             <Tooltip
//                 cursor={{ fill: "transparent" }} // removes gray hover area
//                 contentStyle={{
//                 backgroundColor: "#fff",
//                 borderRadius: "8px",
//                 border: "1px solid #e5e7eb",
//                 }}
//             />
//             <Bar
//                 dataKey="value"
//                 fill="#49b6b9"
//                 radius={[8, 8, 0, 0]}
//                 activeBar={{ fill: "#49b6b9" }} // keeps same color on hover
//             />
//             </BarChart>
//         </ResponsiveContainer>
//         </div>

//         {/* Circular ECL Visual (right, large) */}
//         <div className="relative w-80 h-80 flex items-center justify-center">
//           <svg className="w-80 h-80 rotate-[-90deg]">
//             <circle
//               cx="160"
//               cy="160"
//               r={radius}
//               stroke="#e5e7eb"
//               strokeWidth="15"
//               fill="none"
//             />
//             <motion.circle
//               cx="160"
//               cy="160"
//               r={radius}
//               stroke={strokeColor}
//               strokeWidth="15"
//               fill="none"
//               strokeDasharray={circumference}
//               strokeDashoffset={offset}
//               strokeLinecap="round"
//               initial={{ strokeDashoffset: circumference }}
//               animate={{ strokeDashoffset: offset }}
//               transition={{ duration: 1, ease: "easeInOut" }}
//             />
//           </svg>

//           {/* Centered Text */}
//           <div className="absolute text-center">
//             <p className="text-sm text-gray-500 mb-1">ECL (NPR)</p>
//             <p className="text-4xl font-bold text-[#49b6b9]">
//               {ecl.toLocaleString(undefined, { maximumFractionDigits: 0 })}
//             </p>
//             <p
//               className="text-sm mt-2 font-semibold"
//               style={{ color: strokeColor }}
//             >
//               {riskPercent.toFixed(1)}% Risk
//             </p>
//           </div>
//         </div>  
//       </div>
//     </motion.div>
//   );
// }


"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/app-components/ui/Slider";

export default function ECLCalculator() {
  const [pd, setPd] = useState(5);
  const [lgd, setLgd] = useState(45);
  const [ead, setEad] = useState(100000);
  const [eir, setEir] = useState(8);

  // Core ECL formula
  const ecl = ((pd / 100) * (lgd / 100) * ead) / (1 + eir / 100);

  // Simplified risk metric
  const riskPercent = Math.min((pd * lgd) / 100, 100);

  // Dynamic color for risk
  const getColor = () => {
    if (riskPercent < 20) return "#16a34a"; // green
    if (riskPercent < 50) return "#eab308"; // yellow
    return "#dc2626"; // red
  };

  const strokeColor = getColor();

  // Circle visual values (moderate size)
  const radius = 125; // slightly smaller than before
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (riskPercent / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-[80%] mx-auto my-12 p-8 bg-white border border-gray-100 rounded-2xl"
    >
      <h2 className="text-center text-4xl lg:text-5xl font-extrabold mb-10 leading-tight text-black">
        Expected Credit Loss <span className="text-primary">(ECL) Calculator</span>
      </h2>

      {/* Two-column layout: Sliders left, Circle right */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* LEFT SIDE — Sliders Section */}
        <div className="flex-1 w-full space-y-6">
          {/* PD */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Probability of Default (PD): {pd}%
            </label>
            <Slider
              value={[pd]}
              onValueChange={(v) => setPd(v[0])}
              max={100}
              step={0.5}
              className="h-6"
            />
          </div>

          {/* LGD */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Loss Given Default (LGD): {lgd}%
            </label>
            <Slider
              value={[lgd]}
              onValueChange={(v) => setLgd(v[0])}
              max={100}
              step={0.5}
              className="h-6"
            />
          </div>

          {/* EAD */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Exposure at Default (EAD, NPR)
            </label>
            <input
              type="number"
              value={ead}
              onChange={(e) => setEad(Number(e.target.value))}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#49b6b9] outline-none"
            />
          </div>

          {/* EIR */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Effective Interest Rate (EIR): {eir}%
            </label>
            <Slider
              value={[eir]}
              onValueChange={(v) => setEir(v[0])}
              max={20}
              step={0.1}
              className="h-6"
            />
          </div>
        </div>

        {/* RIGHT SIDE — Circular ECL Visual + Disclaimer */}
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="relative w-84 h-84 flex items-center justify-center">
            <svg className="w-84 h-84 rotate-[-90deg]">
              <circle
                cx="168"
                cy="168"
                r={radius}
                stroke="#e5e7eb"
                strokeWidth="16"
                fill="none"
              />
              <motion.circle
                cx="168"
                cy="168"
                r={radius}
                stroke={strokeColor}
                strokeWidth="16"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </svg>

            {/* Centered Text */}
            <div className="absolute text-center">
              <p className="text-sm text-gray-500 mb-1">ECL (NPR)</p>
              <p className="text-4xl font-bold text-[#49b6b9]">
                {ecl.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
              <p
                className="text-sm mt-2 font-semibold"
                style={{ color: strokeColor }}
              >
                {riskPercent.toFixed(1)}% Risk
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mt-6 text-xs text-gray-500 italic text-center max-w-xs">
            Disclaimer: This calculator is for educational purposes only and should not be used for financial decision-making.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
