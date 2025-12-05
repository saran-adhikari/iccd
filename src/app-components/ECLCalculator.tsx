"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/app-components/ui/Slider";

export default function ECLCalculator() {
  const [pd, setPd] = useState(5);
  const [lgd, setLgd] = useState(45);
  const [ead, setEad] = useState<string | number>(100000); // Allow string for empty input
  const [eir, setEir] = useState(8);

  const ecl = ((pd / 100) * (lgd / 100) * (Number(ead) || 0)) / (1 + eir / 100);
  const riskPercent = Math.min((pd * lgd) / 100, 100);

  const getColor = () => {
    if (riskPercent < 20) return "#16a34a";
    if (riskPercent < 50) return "#eab308";
    return "#dc2626";
  };

  const strokeColor = getColor();
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (riskPercent / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-[80%] mx-auto my-10 py-4"
    >
      <h2 className="text-2xl lg:text-3xl font-extrabold mb-6 leading-tight text-white text-center">
        Expected Credit Loss <span className="text-white">(ECL) Calculator</span>
      </h2>

      {/* 3-COLUMN COMPACT MODERN DESIGN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch py-8">

        {/* LEFT COLUMN */}
        <div className="space-y-4 flex-1 h-full bg-black/20 p-4 rounded-xl border border-gray-700">
          <div>
            <label className="block font-medium text-white mb-1">
              Probability of Default (PD): {pd}%
            </label>
            <Slider value={[pd]} onValueChange={(v) => setPd(v[0])} max={100} step={0.5} />
          </div>

          <div>
            <label className="block font-medium text-white mb-1">
              Loss Given Default (LGD): {lgd}%
            </label>
            <Slider value={[lgd]} onValueChange={(v) => setLgd(v[0])} max={100} step={0.5} />
          </div>

          <div>
            <label className="block font-medium text-white mb-1">
              Exposure at Default (EAD, NPR)
            </label>
            <input
              type="number"
              value={ead}
              onChange={(e) => setEad(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#49b6b9] outline-none"
            />
          </div>

          <div>
            <label className="block font-medium text-white mb-1">
              Effective Interest Rate (EIR): {eir}%
            </label>
            <Slider value={[eir]} onValueChange={(v) => setEir(v[0])} max={20} step={0.1} />
          </div>
        </div>

        {/* MIDDLE COLUMN — Smaller Circle */}
        <div className="flex flex-col justify-center items-center flex-1 h-full bg-black/20 p-4 rounded-xl">
          <div className="relative w-60 h-60 flex items-center justify-center">
            <svg className="w-60 h-60 rotate-[-90deg]">
              <circle cx="120" cy="120" r="100" stroke="#e5e7eb" strokeWidth="14" fill="none" />
              <motion.circle
                cx="120"
                cy="120"
                r="100"
                stroke={strokeColor}
                strokeWidth="14"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </svg>

            <div className="absolute text-center">
              <p className="text-xs text-gray-400 mb-1">ECL (NPR)</p>
              <p className="text-3xl font-bold text-[#49b6b9]">
                {ecl.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs mt-1 font-semibold" style={{ color: strokeColor }}>
                {riskPercent.toFixed(1)}% Risk
              </p>
            </div>
          </div>

          <p className="mt-4 text-[10px] text-gray-500 italic text-center">
            Disclaimer: For educational purposes only.
          </p>
        </div>

        {/* RIGHT COLUMN — Accordion */}
        <div className="flex-1 h-full bg-black/20 p-4 rounded-xl border border-gray-700 text-white">

          <Accordion title="What is ECL?">
            <p className="text-sm text-gray-300 leading-relaxed">
              Expected Credit Loss (ECL) estimates the future loss on loans under IFRS 9.
            </p>
          </Accordion>

          <Accordion title="Formula">
            <p className="text-sm text-gray-300">
              <strong>ECL = PD × LGD × EAD</strong>, discounted using the EIR.
            </p>
          </Accordion>

          <Accordion title="Components">
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-[2px]">
              <li><strong>PD</strong> – Probability of default</li>
              <li><strong>LGD</strong> – Loss given default</li>
              <li><strong>EAD</strong> – Exposure at default</li>
              <li><strong>EIR</strong> – Discount rate</li>
            </ul>
          </Accordion>

          <Accordion title="Why it matters">
            <p className="text-sm text-gray-300">
              Helps banks manage risk and maintain regulatory compliance.
            </p>
          </Accordion>

        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   SIMPLE ACCORDION COMPONENT
-------------------------------------------------------------------*/
interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

function Accordion({ title, children }: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-700 py-2">
      <button
        className="w-full flex justify-between items-center text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-primary">{title}</span>
        <span className="text-gray-400 text-lg">{open ? "−" : "+"}</span>
      </button>

      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}

