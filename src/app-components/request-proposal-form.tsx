"use client";

import React, { useState } from "react";
import { Button } from "@/app-components/ui/button";
import { Input } from "@/app-components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app-components/ui/select";
import { Textarea } from "@/app-components/ui/textarea";
import { ChevronRight, ChevronLeft, Check, Calendar, Users, Target, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FormData = {
    // Step 1: Organization Details
    institutionName: string;
    size: string;
    department: string;
    location: string;
    country: string;

    // Step 2: Training Needs & Timing (Merged)
    programs: string[];
    programDetails: Record<string, { roles: string }>; // Removed count
    timing: string;
    format: "In-person"; // Fixed to In-person
    duration: "One-day" | "Multi-day" | "Modular" | "Ongoing";

    // Step 3: Goals (Budget removed)
    goals: string;
    budget?: number; // Optional/Hidden

    // Step 4: Contact Info
    name: string;
    email: string;
    phone: string;
    position: string;
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
    budget: 0,
    name: "",
    email: "",
    phone: "",
    position: "",
    consent: false,
};

// Updated Steps Configuration
const STEPS = [
    { id: "org-details", title: "Organization", icon: Users },
    { id: "needs-timing", title: "Needs & Timing", icon: Calendar },
    { id: "goals", title: "Goals", icon: Target },
    { id: "contact", title: "Contact", icon: Send },
];

const PROGRAM_OPTIONS = [
    { id: "esg", label: "ESG (Environmental, Social, and Governance)" },
    { id: "aml", label: "AML (Anti-Money Laundering)" },
    { id: "ecl", label: "ECL (Expected Credit Loss)" },
    { id: "customer-service", label: "Customer Service" },
    { id: "risk-management", label: "Risk Management" },
    { id: "compliance", label: "Compliance" },
    { id: "other-programs", label: "Other Programs" }, // Changed from Leadership
];

export default function RequestProposalForm() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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

    const updateProgramDetails = (programId: string, value: string) => {
        const currentDetails = { ...formData.programDetails };
        if (!currentDetails[programId]) {
            currentDetails[programId] = { roles: "" };
        }
        currentDetails[programId].roles = value;
        updateFields({ programDetails: currentDetails });
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/proposals", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit proposal");
            }

            setIsSuccess(true);
        } catch (error) {
            console.error("Error submitting proposal:", error);
            alert("Failed to submit proposal. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="w-full max-w-4xl mx-auto p-8 bg-background/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 my-10 relative overflow-hidden text-center py-20">
                <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                    <Check className="w-12 h-12 text-secondary" />
                </div>
                <h2 className="text-4xl font-extrabold text-white mb-6">
                    Request Received!
                </h2>
                <p className="text-xl text-muted-foreground mb-10 max-w-lg mx-auto">
                    We have received your details. Our team will review your requirements and get back to you within <strong className="text-primary">2 business days</strong>.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button onClick={() => window.location.href = "/"} className="bg-primary text-white cursor-pointer px-8 py-6 text-lg">
                        Back to Home
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-[95%] max-w-7xl mx-auto my-10 bg-background/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/10 overflow-hidden flex flex-col lg:flex-row min-h-[700px]">

            {/* Left Side - Landing Content / Context */}
            <div className="lg:w-2/5 bg-gradient-to-br from-gray-900 to-black p-10 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/90" />

                <div className="relative z-10">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                        <Check className="w-6 h-6 text-primary" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">
                        Let&apos;s Build Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            Training Program
                        </span>
                    </h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Tell us about your team and goals. We&apos;ll craft a tailored proposal that addresses your specific needs and challenges.
                    </p>
                </div>

                <div className="relative z-10 mt-10 space-y-6">
                    {STEPS.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = index === currentStep;
                        const isCompleted = index < currentStep;

                        return (
                            <div
                                key={step.id}
                                className={`flex items-center space-x-4 transition-all duration-300 ${isActive ? 'opacity-100 translate-x-2' : 'opacity-50'}`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${isActive ? 'border-primary bg-primary/20 text-primary' :
                                    isCompleted ? 'border-secondary bg-secondary/20 text-secondary' : 'border-gray-700 text-gray-500'
                                    }`}>
                                    {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                                </div>
                                <div>
                                    <p className={`text-sm font-bold uppercase tracking-wider ${isActive ? 'text-white' : 'text-gray-500'}`}>
                                        Step {index + 1}
                                    </p>
                                    <p className={`font-medium ${isActive ? 'text-gray-200' : 'text-gray-600'}`}>
                                        {step.title}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:w-3/5 p-8 lg:p-12 bg-background/50 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-800">
                    <div
                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                        style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                    />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="h-full flex flex-col"
                    >
                        {/* Step 1: Organization Details */}
                        {currentStep === 0 && (
                            <div className="space-y-6 flex-1">
                                <h3 className="text-2xl font-bold text-white mb-6">Organization Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Institution Name <span className="text-red-500">*</span></label>
                                        <Input
                                            value={formData.institutionName}
                                            onChange={(e) => updateFields({ institutionName: e.target.value })}
                                            placeholder="e.g. Acme Corp"
                                            className="focus:ring-primary"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Number of Employees</label>
                                        <Select value={formData.size} onValueChange={(value) => updateFields({ size: value })}>
                                            <SelectTrigger className="focus:ring-primary"><SelectValue placeholder="Select size" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="18-25">18-25</SelectItem>
                                                <SelectItem value="25-30">25-30</SelectItem>
                                                <SelectItem value="30-40">30-40</SelectItem>
                                                <SelectItem value="40+">40+</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Department</label>
                                        <Input
                                            value={formData.department}
                                            onChange={(e) => updateFields({ department: e.target.value })}
                                            placeholder="e.g. HR, Compliance"
                                            className="focus:ring-primary"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">City</label>
                                        <Input
                                            value={formData.location}
                                            onChange={(e) => updateFields({ location: e.target.value })}
                                            placeholder="City"
                                            className="focus:ring-primary"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-medium text-muted-foreground">Country</label>
                                        <Select value={formData.country} onValueChange={(value) => updateFields({ country: value })}>
                                            <SelectTrigger className="focus:ring-primary"><SelectValue placeholder="Select country" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="nepal">Nepal</SelectItem>
                                                <SelectItem value="india">India</SelectItem>
                                                <SelectItem value="bangladesh">Bangladesh</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Needs & Timing (Merged) */}
                        {currentStep === 1 && (
                            <div className="space-y-8 flex-1">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Training Needs</h3>
                                    <p className="text-sm text-muted-foreground mb-4">Select programs of interest.</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {PROGRAM_OPTIONS.map((program) => {
                                            const isSelected = formData.programs.includes(program.id);
                                            return (
                                                <div key={program.id} className={`border rounded-lg p-3 cursor-pointer transition-all ${isSelected ? "border-secondary bg-secondary/10" : "border-white/10 hover:bg-white/5"}`}>
                                                    <div className="flex items-start space-x-3">
                                                        <input
                                                            type="checkbox"
                                                            checked={isSelected}
                                                            onChange={() => toggleProgram(program.id)}
                                                            className="mt-1 w-4 h-4 accent-secondary cursor-pointer"
                                                        />
                                                        <div className="flex-1">
                                                            <span className={`text-sm font-medium ${isSelected ? "text-secondary" : "text-gray-300"}`}>{program.label}</span>
                                                            {isSelected && (
                                                                <Input
                                                                    className="mt-2 h-7 text-xs bg-black/20 border-white/10"
                                                                    placeholder="Which roles? (e.g. Managers)"
                                                                    value={formData.programDetails[program.id]?.roles || ""}
                                                                    onChange={(e) => updateProgramDetails(program.id, e.target.value)}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="border-t border-white/10 pt-8 mt-8">
                                    <h3 className="text-xl font-bold text-white mb-6">Timing & Format</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-sm font-medium text-muted-foreground block">Preferred Date</label>
                                            <div className="relative">
                                                <Input
                                                    type="date"
                                                    value={formData.timing}
                                                    onChange={(e) => updateFields({ timing: e.target.value })}
                                                    className="focus:ring-primary pl-10 cursor-pointer h-11"
                                                />
                                                <Calendar className="absolute left-3 top-3 w-5 h-5 text-secondary pointer-events-none" />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-sm font-medium text-muted-foreground block">Duration</label>
                                            <Select value={formData.duration} onValueChange={(value) => updateFields({ duration: value as FormData["duration"] })}>
                                                <SelectTrigger className="focus:ring-primary h-11">
                                                    <SelectValue placeholder="Select duration" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="One-day">One-day</SelectItem>
                                                    <SelectItem value="Multi-day">Multi-day</SelectItem>
                                                    <SelectItem value="Modular">Modular</SelectItem>
                                                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-sm font-medium text-muted-foreground block">Format</label>
                                            <div className="flex items-center h-11">
                                                <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/20">
                                                    In-person Only
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Goals (Budget Removed) */}
                        {currentStep === 2 && (
                            <div className="space-y-6 flex-1">
                                <h3 className="text-2xl font-bold text-white mb-6">Key Goals</h3>
                                <div className="space-y-4">
                                    <label className="text-sm font-medium text-muted-foreground">
                                        What are your main objectives for this training? <span className="text-red-500">*</span>
                                    </label>
                                    <Textarea
                                        placeholder="e.g. Enhance team compliance knowledge, Improve leadership skills..."
                                        value={formData.goals}
                                        onChange={(e) => updateFields({ goals: e.target.value })}
                                        className="min-h-[200px] focus:ring-primary border-white/10 text-lg p-4"
                                    />
                                    <div className="flex flex-wrap gap-2">
                                        {["Build AML capacity", "Improve customer service", "Comply with ESRM"].map((goal) => (
                                            <button
                                                key={goal}
                                                onClick={() => updateFields({ goals: formData.goals ? `${formData.goals}, ${goal}` : goal })}
                                                className="text-xs bg-white/5 hover:bg-primary/20 hover:text-primary text-gray-400 px-3 py-1.5 rounded-full transition-colors cursor-pointer border border-white/5"
                                            >
                                                + {goal}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Contact Info */}
                        {currentStep === 3 && (
                            <div className="space-y-6 flex-1">
                                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Full Name <span className="text-red-500">*</span></label>
                                        <Input
                                            value={formData.name}
                                            onChange={(e) => updateFields({ name: e.target.value })}
                                            placeholder="John Doe"
                                            className="focus:ring-primary"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Position</label>
                                        <Input
                                            value={formData.position}
                                            onChange={(e) => updateFields({ position: e.target.value })}
                                            placeholder="e.g. Training Manager"
                                            className="focus:ring-primary"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Work Email <span className="text-red-500">*</span></label>
                                        <Input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => updateFields({ email: e.target.value })}
                                            placeholder="john@company.com"
                                            className="focus:ring-primary"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Phone</label>
                                        <Input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => updateFields({ phone: e.target.value })}
                                            placeholder="+977..."
                                            className="focus:ring-primary"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/10">
                                    <div className="flex items-start space-x-3">
                                        <input
                                            id="consent"
                                            type="checkbox"
                                            checked={formData.consent}
                                            onChange={(e) => updateFields({ consent: e.target.checked })}
                                            className="mt-1 w-4 h-4 accent-secondary cursor-pointer"
                                        />
                                        <label htmlFor="consent" className="text-sm text-gray-400 cursor-pointer">
                                            I agree to the processing of my personal data for the purpose of this request.
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-auto pt-8 border-t border-white/10">
                            <Button
                                variant="ghost"
                                onClick={prevStep}
                                disabled={currentStep === 0}
                                className={`text-muted-foreground hover:text-white hover:bg-white/5 hover:rounded-full ${currentStep === 0 ? 'invisible' : ''}`}
                            >
                                <ChevronLeft className="mr-2 w-4 h-4" /> Back
                            </Button>

                            {currentStep === STEPS.length - 1 ? (
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!formData.name || !formData.email || !formData.consent || isSubmitting}
                                    className="bg-secondary hover:bg-secondary/90 text-white px-8 shadow-lg shadow-secondary/20"
                                >
                                    {isSubmitting ? "Submitting..." : "Submit Request"} <Check className="ml-2 w-4 h-4" />
                                </Button>
                            ) : (
                                <Button
                                    onClick={nextStep}
                                    className="bg-primary hover:bg-primary/90 text-white px-8 rounded-full"
                                >
                                    Next <ChevronRight className="ml-2 w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
