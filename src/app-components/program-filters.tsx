"use client"

import { useState } from "react"
import { Button } from "@/app-components/ui/button"
import { Input } from "@/app-components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app-components/ui/select"
import { Search, Filter } from "lucide-react"

interface ProgramFiltersProps {
  onFilterChange: (filters: {
    search: string
    category: string
    duration: string
    format: string
    industry: string
  }) => void
}

export function ProgramFilters({ onFilterChange }: ProgramFiltersProps) {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    duration: "",
    format: "",
    industry: "",
  })

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      search: "",
      category: "",
      duration: "",
      format: "",
      industry: "",
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  return (
    <section className="py-8 bg-muted/30 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-6">
          <Filter className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-primary">Filter Programs</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Search */}
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search programs..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category */}
          <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aml-compliance">AML & Compliance</SelectItem>
              <SelectItem value="esg-sustainability">ESG & Sustainability</SelectItem>
              <SelectItem value="risk-management">Risk Management</SelectItem>
              <SelectItem value="customer-service">Customer Service</SelectItem>
              <SelectItem value="leadership">Leadership & Soft Skills</SelectItem>
            </SelectContent>
          </Select>

          {/* Duration */}
          <Select value={filters.duration} onValueChange={(value) => handleFilterChange("duration", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-day">1 Day</SelectItem>
              <SelectItem value="2-3-days">2-3 Days</SelectItem>
              <SelectItem value="4-5-days">4-5 Days</SelectItem>
              <SelectItem value="1-week">1 Week+</SelectItem>
            </SelectContent>
          </Select>

          {/* Format */}
          <Select value={filters.format} onValueChange={(value) => handleFilterChange("format", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="in-person">In-Person</SelectItem>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="blended">Blended</SelectItem>
            </SelectContent>
          </Select>

          {/* Clear Filters */}
          <Button
            variant="outline"
            onClick={clearFilters}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            Clear All
          </Button>
        </div>
      </div>
    </section>
  )
}
