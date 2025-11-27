"use client";

import React, { useState } from "react";
import { Button } from "@/app-components/ui/button";
import { Input } from "@/app-components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app-components/ui/select";
import { Slider } from "@/app-components/ui/Slider";
import { Textarea } from "@/app-components/ui/textarea";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FormData = {
    // Step 1: Organization Details
    institutionName: string;
    size: string;
    department: string;
    location: string;
    country: string;

    // Step 2: Training Needs
    programs: string[];
    programDetails: Record<string, { count: string; roles: string }>;

    // Step 3: Timing & Format
    timing: string; // Date or approx timeline
    format: "In-person" | "Virtual" | "Hybrid";
    duration: "One-day" | "Multi-day" | "Modular" | "Ongoing";

    // Step 4: Goals & Budget
    goals: string;
    budget: number;

    // Contact Info
    name: string;
    email: string;
    phone: string;
    position: string;
    proposalType: "call" | "draft";
    consent: boolean;
};

const INITIAL_DATA: FormData = {
    institutionName: "",
    size: "",
    department: "",
    location: "",
    country: "",
    programs: [],
    programDetails: {},
    timing: "",
    format: "In-person",
    duration: "Multi-day",
    goals: "",
    budget: 5000,
    name: "",
    email: "",
    phone: "",
    position: "",
    proposalType: "draft",
    consent: false,
};

const STEPS = [
    { id: "intro", title: "Welcome" },
    { id: "org-details", title: "Organization Details" },
    { id: "training-needs", title: "Training Needs" },
    { id: "timing", title: "Timing & Format" },
    { id: "goals", title: "Goals & Budget" },
    { id: "contact", title: "Contact Info" },
    { id: "success", title: "Success" },
];

const PROGRAM_OPTIONS = [
    { id: "esg", label: "ESG (Environmental, Social, and Governance)" },
    { id: "aml", label: "AML (Anti-Money Laundering)" },
    { id: "ecl", label: "ECL (Expected Credit Loss)" },
    { id: "customer-service", label: "Customer Service" },
    { id: "risk-management", label: "Risk Management" },
    { id: "compliance", label: "Compliance" },
    { id: "leadership", label: "Leadership" },
];

export default function RequestProposalForm() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<FormData>(INITIAL_DATA);

    const updateFields = (fields: Partial<FormData>) => {
        setFormData((prev) => ({ ...prev, ...fields }));
    };

    const nextStep = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const toggleProgram = (programId: string) => {
        const currentPrograms = formData.programs;
        if (currentPrograms.includes(programId)) {
            updateFields({ programs: currentPrograms.filter((p) => p !== programId) });
        } else {
            updateFields({ programs: [...currentPrograms, programId] });
        }
    };

    const updateProgramDetails = (programId: string, field: "count" | "roles", value: string) => {
        const currentDetails = { ...formData.programDetails };
        if (!currentDetails[programId]) {
            currentDetails[programId] = { count: "", roles: "" };
        }
        currentDetails[programId][field] = value;
        updateFields({ programDetails: currentDetails });
    };

    // Progress Bar Calculation (excluding intro and success)
    const totalProgressSteps = 4;
    const currentProgressStep = Math.max(0, Math.min(currentStep - 1, totalProgressSteps));
    const progressPercentage = (currentProgressStep / totalProgressSteps) * 100;

    const handleSubmit = async () => {
        try {
            const response = await fetch("/api/proposals", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                throw new Error("Failed to submit proposal")
            }

            // Move to success step
            setCurrentStep(6)
        } catch (error) {
            console.error("Error submitting proposal:", error)
            alert("Failed to submit proposal. Please try again.")
        }
    }

    return (
        <div className="w-[80%] mx-auto p-8 bg-background backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 my-10 relative overflow-hidden">
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-secondary" />

            {/* Header / Progress Bar */}
            {currentStep > 0 && currentStep < STEPS.length - 1 && (
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-muted-foreground">
                            Step {currentProgressStep + 1} of {totalProgressSteps + 1}
                        </span>
                        <span className="text-sm font-bold text-primary tracking-wide uppercase">
                            {STEPS[currentStep].title}
                        </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                            className="bg-secondary h-2 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(224,85,54,0.5)]"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                </div>
            )}

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    {/* Intro Step */}
                    {currentStep === 0 && (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check className="w-10 h-10 text-secondary" />
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
                                Let&apos;s Build Your <br /> <span className="text-primary">Training Program</span>
                            </h2>
                            <p className="text-xl text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
                                Tell us a little about your team so we can build the best training program for you.
                            </p>
                            <Button
                                onClick={nextStep}
                                size="lg"
                                className="text-lg px-10 py-6 bg-secondary hover:bg-secondary/90 text-white shadow-lg shadow-secondary/30 rounded-full transition-all hover:scale-105 cursor-pointer"
                            >
                                Start Request <ChevronRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    )}

                    {/* Step 1: Organization Details */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-white">Organization Details</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="institutionName" className="text-sm font-medium text-muted-foreground">
                                        Institution Name <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="institutionName"
                                        value={formData.institutionName}
                                        onChange={(e) => updateFields({ institutionName: e.target.value })}
                                        placeholder="e.g. Acme Corp"
                                        className="focus:ring-primary"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="size" className="text-sm font-medium text-muted-foreground">
                                        Number of Employees
                                    </label>
                                    <Select
                                        value={formData.size}
                                        onValueChange={(value) => updateFields({ size: value })}
                                    >
                                        <SelectTrigger className="focus:ring-primary">
                                            <SelectValue placeholder="Select size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1-10">1-10</SelectItem>
                                            <SelectItem value="11-50">11-50</SelectItem>
                                            <SelectItem value="51-200">51-200</SelectItem>
                                            <SelectItem value="201-500">201-500</SelectItem>
                                            <SelectItem value="500+">500+</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="department" className="text-sm font-medium text-muted-foreground">
                                        Department
                                    </label>
                                    <Input
                                        id="department"
                                        value={formData.department}
                                        onChange={(e) => updateFields({ department: e.target.value })}
                                        placeholder="e.g. HR, Compliance"
                                        className="focus:ring-primary"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="location" className="text-sm font-medium text-muted-foreground">
                                        Location
                                    </label>
                                    <Input
                                        id="location"
                                        value={formData.location}
                                        onChange={(e) => updateFields({ location: e.target.value })}
                                        placeholder="City, Country"
                                        className="focus:ring-primary"
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label htmlFor="country" className="text-sm font-medium text-muted-foreground">
                                        Country / Regulatory Environment
                                    </label>
                                    <Select
                                        value={formData.country}
                                        onValueChange={(value) => updateFields({ country: value })}
                                    >
                                        <SelectTrigger className="focus:ring-primary">
                                            <SelectValue placeholder="Select country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="nepal">Nepal</SelectItem>
                                            <SelectItem value="india">India</SelectItem>
                                            <SelectItem value="bangladesh">Bangladesh</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
                                <Button variant="ghost" onClick={prevStep} className="text-muted-foreground hover:text-white cursor-pointer">
                                    <ChevronLeft className="mr-2 w-4 h-4" /> Back
                                </Button>
                                <Button
                                    onClick={nextStep}
                                    disabled={!formData.institutionName}
                                    className="bg-secondary/40 hover:bg-secondary border border-secondary/20 text-white px-8 cursor-pointer"
                                >
                                    Next <ChevronRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Training Needs */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-white">Training Needs</h3>
                            <p className="text-sm text-muted-foreground">Select the programs you are interested in.</p>

                            <div className="space-y-4">
                                {PROGRAM_OPTIONS.map((program) => {
                                    const isSelected = formData.programs.includes(program.id);
                                    return (
                                        <div
                                            key={program.id}
                                            className={`border rounded-xl p-5 transition-all duration-200 cursor-pointer ${isSelected
                                                ? "border-secondary/40 bg-secondary/5 shadow-md shadow-secondary/10"
                                                : "border-secondary/20 hover:border-secondary/20 hover:bg-secondary/10"
                                                }`}
                                        >
                                            <div className="flex items-start space-x-3">
                                                <div className="flex items-center h-6">
                                                    <input
                                                        id={`program-${program.id}`}
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => toggleProgram(program.id)}
                                                        className="w-5 h-5 text-secondary border-gray-300 rounded focus:ring-primary cursor-pointer accent-secondary"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <label
                                                        htmlFor={`program-${program.id}`}
                                                        className={`font-semibold text-lg cursor-pointer select-none transition-colors ${isSelected ? "text-secondary" : "text-muted-foreground"}`}
                                                    >
                                                        {program.label}
                                                    </label>

                                                    {isSelected && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: "auto" }}
                                                            className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
                                                        >
                                                            <div className="space-y-1">
                                                                <label className="text-xs font-medium text-muted-foreground">
                                                                    How many people?
                                                                </label>
                                                                <Input
                                                                    className="h-8 text-sm focus:ring-primary border border-secondary/10"
                                                                    placeholder="e.g. 10"
                                                                    value={formData.programDetails[program.id]?.count || ""}
                                                                    onChange={(e) => updateProgramDetails(program.id, "count", e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <label className="text-xs font-medium text-gray-500">
                                                                    Which roles?
                                                                </label>
                                                                <Input
                                                                    className="h-8 text-sm focus:ring-primary border border-secondary/10"
                                                                    placeholder="e.g. Managers"
                                                                    value={formData.programDetails[program.id]?.roles || ""}
                                                                    onChange={(e) => updateProgramDetails(program.id, "roles", e.target.value)}
                                                                />
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
                                <Button variant="ghost" onClick={prevStep} className="text-muted-foreground hover:text-white cursor-pointer">
                                    <ChevronLeft className="mr-2 w-4 h-4" /> Back
                                </Button>
                                <Button onClick={nextStep} disabled={formData.programs.length === 0} className="bg-secondary/20 hover:bg-secondary text-white px-8 cursor-pointer">
                                    Next <ChevronRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Timing & Format */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-white">Timing & Format</h3>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="timing" className="text-sm font-medium text-muted-foreground">
                                        When do you want the training?
                                    </label>
                                    <Input
                                        id="timing"
                                        type="date"
                                        value={formData.timing}
                                        onChange={(e) => updateFields({ timing: e.target.value })}
                                        className="focus:ring-primary"
                                    />
                                    <p className="text-xs text-muted-foreground">Approximate date is fine.</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground ">
                                        Format Preference
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                        {["In-person", "Virtual", "Hybrid"].map((fmt) => (
                                            <div
                                                key={fmt}
                                                onClick={() => updateFields({ format: fmt as FormData["format"] })}
                                                className={`cursor-pointer border rounded-xl p-4 text-center transition-all duration-200 ${formData.format === fmt
                                                    ? "border-secondary/20 bg-secondary/20 text-white font-bold shadow-md shadow-primary/10"
                                                    : "border-primary/20 hover:border-primary/50 hover:bg-primary hover:text-white text-muted-foreground"
                                                    }`}
                                            >
                                                {fmt}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="duration" className="text-sm font-medium text-muted-foreground">
                                        Duration Preference
                                    </label>
                                    <Select
                                        value={formData.duration}
                                        onValueChange={(value) => updateFields({ duration: value as FormData["duration"] })}
                                    >
                                        <SelectTrigger className="focus:ring-primary">
                                            <SelectValue placeholder="Select duration" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="One-day">One-day</SelectItem>
                                            <SelectItem value="Multi-day">Multi-day</SelectItem>
                                            <SelectItem value="Modular">Modular (Spread over weeks)</SelectItem>
                                            <SelectItem value="Ongoing">Ongoing Partnership</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
                                <Button variant="ghost" onClick={prevStep} className="text-muted-foreground hover:text-white hover:bg-primary cursor-pointer">
                                    <ChevronLeft className="mr-2 w-4 h-4" /> Back
                                </Button>
                                <Button onClick={nextStep} className="bg-secondary/20 hover:bg-secondary text-white px-8 cursor-pointer">
                                    Next <ChevronRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Goals & Budget */}
                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-white">Goals & Budget</h3>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="goals" className="text-sm font-medium text-muted-foreground">
                                        What are your key goals? <span className="text-red-500">*</span>
                                    </label>
                                    <Textarea
                                        id="goals"
                                        placeholder="e.g. Build AML capacity, Improve customer service..."
                                        value={formData.goals}
                                        onChange={(e) => updateFields({ goals: e.target.value })}
                                        className="min-h-[120px] focus:ring-primary border border-secondary/20 mb-10"
                                    />
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {["Build AML capacity", "Improve customer service", "Comply with ESRM"].map((goal) => (
                                            <button
                                                key={goal}
                                                onClick={() => updateFields({ goals: formData.goals ? `${formData.goals}, ${goal}` : goal })}
                                                className="text-xs bg-secondary/20 hover:bg-primary/10 hover:text-primary text-white px-3 py-1 rounded-full transition-colors cursor-pointer"
                                            >
                                                + {goal}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-medium text-muted-foreground">
                                            Budget Range (USD)
                                        </label>
                                        <span className="text-sm font-bold text-secondary">
                                            {formData.budget >= 20000 ? "> $20,000" : formData.budget <= 5000 ? "< $5,000" : `$${formData.budget.toLocaleString()}`}
                                        </span>
                                    </div>
                                    <Slider
                                        value={[formData.budget]}
                                        min={1000}
                                        max={25000}
                                        step={1000}
                                        onValueChange={(val) => updateFields({ budget: val[0] })}
                                        className="py-4"
                                    />
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>$1k</span>
                                        <span>$5k</span>
                                        <span>$10k</span>
                                        <span>$20k+</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
                                <Button variant="ghost" onClick={prevStep} className="text-muted-foreground hover:text-white hover:bg-primary cursor-pointer">
                                    <ChevronLeft className="mr-2 w-4 h-4" /> Back
                                </Button>
                                <Button onClick={nextStep} disabled={!formData.goals} className="bg-secondary/20 hover:bg-secondary text-white px-8 cursor-pointer">
                                    Next <ChevronRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 5: Contact Info */}
                    {currentStep === 5 && (
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-white">Contact Information</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-muted-foreground">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => updateFields({ name: e.target.value })}
                                        placeholder="John Doe"
                                        className="focus:ring-primary"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="position" className="text-sm font-medium text-muted-foreground">
                                        Position / Title
                                    </label>
                                    <Input
                                        id="position"
                                        value={formData.position}
                                        onChange={(e) => updateFields({ position: e.target.value })}
                                        placeholder="e.g. Training Manager"
                                        className="focus:ring-primary"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                                        Work Email <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => updateFields({ email: e.target.value })}
                                        placeholder="john@company.com"
                                        className="focus:ring-primary "
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-medium text-muted-foreground">
                                        Phone Number
                                    </label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => updateFields({ phone: e.target.value })}
                                        placeholder="+977 9800000000"
                                        className="focus:ring-primary"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground block">
                                        How would you like to proceed?
                                    </label>
                                    <div className="flex flex-col space-y-2">
                                        <label className="flex items-center space-x-2 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="proposalType"
                                                checked={formData.proposalType === "call"}
                                                onChange={() => updateFields({ proposalType: "call" })}
                                                className="text-secondary focus:ring-secondary accent-secondary"
                                            />
                                            <span className="text-sm text-muted-foreground group-hover:text-secondary transition-colors">I&apos;d like a call to discuss the proposal</span>
                                        </label>
                                        <label className="flex items-center space-x-2 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="proposalType"
                                                checked={formData.proposalType === "draft"}
                                                onChange={() => updateFields({ proposalType: "draft" })}
                                                className="text-secondary focus:ring-secondary accent-secondary"
                                            />
                                            <span className="text-sm text-muted-foreground group-hover:text-secondary transition-colors">Send me a draft proposal only</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-2">
                                    <input
                                        id="consent"
                                        type="checkbox"
                                        checked={formData.consent}
                                        onChange={(e) => updateFields({ consent: e.target.checked })}
                                        className="mt-1 text-secondary focus:ring-secondary rounded border-gray-300 accent-secondary cursor-pointer"
                                    />
                                    <label htmlFor="consent" className="text-sm text-white-40 cursor-pointer">
                                        I agree to the processing of my personal data for the purpose of this request and in accordance with the Privacy Policy.
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
                                <Button variant="ghost" onClick={prevStep} className="text-muted-foreground hover:text-white cursor-pointer hover:bg-primary">
                                    <ChevronLeft className="mr-2 w-4 h-4" /> Back
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!formData.name || !formData.email || !formData.consent}
                                    className="bg-secondary/20 hover:bg-secondary/90 text-white px-8 shadow-lg shadow-secondary/20 cursor-pointer"
                                >
                                    Submit Request <Check className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 6: Success */}
                    {currentStep === 6 && (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                                <Check className="w-10 h-10 text-secondary" />
                            </div>
                            <h2 className="text-4xl font-extrabold text-white mb-4">
                                Thank You!
                            </h2>
                            <p className="text-xl text-muted-foreground mb-10 max-w-lg mx-auto">
                                We have received your details. Our team will review your requirements and get back to you within <strong className="text-primary">24-48 hours</strong>.
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Button variant="outline" onClick={() => window.print()} className="border-secondary/20 text-white hover:bg-secondary cursor-pointer hover:text-white">
                                    Download Summary (PDF)
                                </Button>
                                <Button onClick={() => window.location.href = "/"} className="bg-primary text-white cursor-pointer">
                                    Back to Home
                                </Button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
