"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/app-components/ui/button"
import { Input } from "@/app-components/ui/input"
import { Textarea } from "@/app-components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app-components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app-components/ui/card"
import { Send, CheckCircle } from "lucide-react"

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
    interest: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    setIsSubmitted(true)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-accent" />
          </div>
          <h3 className="text-2xl font-bold text-primary mb-4">Thank You!</h3>
          <p className="text-muted-foreground mb-6">
            Your message has been received. Our team will get back to you within 24 hours to discuss your training
            needs.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Request Proposal</CardTitle>
        <CardDescription>
          Fill out the form below and our experts will contact you with a customized training proposal.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-primary mb-2 block">Full Name *</label>
              <Input
                required
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-primary mb-2 block">Email Address *</label>
              <Input
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-primary mb-2 block">Organization *</label>
              <Input
                required
                value={formData.organization}
                onChange={(e) => handleInputChange("organization", e.target.value)}
                placeholder="Your organization name"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-primary mb-2 block">Your Role</label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compliance-officer">Compliance Officer</SelectItem>
                  <SelectItem value="risk-manager">Risk Manager</SelectItem>
                  <SelectItem value="senior-management">Senior Management</SelectItem>
                  <SelectItem value="hr-learning">HR/Learning & Development</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-primary mb-2 block">Training Interest</label>
            <Select value={formData.interest} onValueChange={(value) => handleInputChange("interest", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select training area of interest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aml-compliance">AML & Compliance</SelectItem>
                <SelectItem value="esg-sustainability">ESG & Sustainability</SelectItem>
                <SelectItem value="risk-management">Risk Management</SelectItem>
                <SelectItem value="customer-service">Customer Service</SelectItem>
                <SelectItem value="leadership">Leadership & Soft Skills</SelectItem>
                <SelectItem value="custom">Custom Training Solution</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-semibold text-primary mb-2 block">Message *</label>
            <Textarea
              required
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Tell us about your training needs, number of participants, preferred format, and any specific requirements..."
              rows={5}
            />
          </div>

          <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            <Send className="mr-2 h-5 w-5" />
            Request Proposal
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
