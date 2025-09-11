export type Program = {
  id: string
  slug: string
  title: string
  category: string
  summary: string
  keyPoints: string[]
  durationDays: number
  level: "Foundation" | "Intermediate" | "Advanced"
  maxParticipants: number
  certification: string
  audience: string[]
  instructor: {
    name: string
    expertise: string[]
  }
  learningOutcomes: string[]
  location: string
  lastUpdated: string // ISO date (e.g., "2025-09-11")
  tags: string[]
  images: {
    cover: string
    icon?: string | null
  }
  language: string
}

// keep slug generation consistent everywhere (same as Seasons)
export function toSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export const programData: Program[] = [
    {
      id: "1",
      slug: "green-finance-taxonomy-nepal",
      title: "Green Finance Taxonomy in Nepal",
      category: "ESG & Sustainability",
      summary:
        "Strategic, regulatory, and operational framework to classify and implement green investments across Nepal’s banking sector.",
      keyPoints: [
        "Defines green finance taxonomy and strategic relevance",
        "Introduces DNSH principles and environmental safeguards",
        "Traffic-light sector classification for eligibility",
        "Roles of Class A/B/C banks in green lending",
        "Implementation, monitoring, and disclosure protocols",
      ],
      durationDays: 2,
      level: "Intermediate",
      maxParticipants: 30,
      certification: "Certificate of Completion",
      audience: ["Class A/B/C BFIs", "Risk & Compliance Teams", "ESG Officers"],
      instructor: {
        name: "ICCD Faculty",
        expertise: ["ESG", "Green Finance", "NRB Policy"],
      },
      learningOutcomes: [
        "Apply Nepal’s green taxonomy to lending decisions",
        "Design DNSH-aligned screening checklists",
        "Prepare taxonomy-aligned disclosures",
      ],
      location: "Kathmandu or Virtual",
      lastUpdated: "2025-09-11",
      tags: ["ESG", "Green Taxonomy", "Nepal", "Sustainability"],
      images: {
        cover: "https://i.pinimg.com/736x/dd/45/cb/dd45cb565575ea3808cdb3d68a02aade.jpg",
        icon: "leaf",
      },
      language: "English",
    },
    {
      id: "2",
      slug: "aml-cft-nepal",
      title: "AML/CFT Compliance in Nepal",
      category: "Compliance",
      summary:
        "Tools to strengthen AML/CFT programs aligned with NRB directives and global standards; addresses FATF grey list implications.",
      keyPoints: [
        "AML/CFT fundamentals and NRB Directive No. 19",
        "CDD/EDD and risk-based compliance",
        "Impacts of FATF grey list on Nepal’s banking",
        "Institutional responsibilities and penalties",
        "Strategies for improving national AML compliance",
      ],
      durationDays: 2,
      level: "Intermediate",
      maxParticipants: 40,
      certification: "Certificate of Completion",
      audience: ["Compliance Officers", "Branch Managers", "Internal Audit"],
      instructor: { name: "ICCD Faculty", expertise: ["AML/CFT", "NRB Regulation"] },
      learningOutcomes: [
        "Strengthen risk-based AML controls",
        "Execute robust CDD/EDD and reporting",
        "Align policies with NRB/FATF requirements",
      ],
      location: "Kathmandu or Virtual",
      lastUpdated: "2025-09-11",
      tags: ["AML", "CFT", "NRB", "FATF"],
      images: { cover: "https://i.pinimg.com/736x/dd/45/cb/dd45cb565575ea3808cdb3d68a02aade.jpg", icon: "shield" },
      language: "English",
    },
    {
      id: "3",
      slug: "cash-security-mukul-pradhan",
      title: "Mastering Cash Security",
      category: "Fraud & Forensics",
      summary:
        "Hands-on training to authenticate IDs, signatures, and currency; reduce fraud and enhance teller efficiency.",
      keyPoints: [
        "ID and document authentication techniques",
        "Forgery detection in negotiable instruments",
        "Advanced signature verification methods",
        "Identifying and handling counterfeit currency",
        "Fraud psychology and teller efficiency",
      ],
      durationDays: 1,
      level: "Foundation",
      maxParticipants: 25,
      certification: "Certificate of Completion",
      audience: ["Tellers", "Operations", "Branch Supervisors"],
      instructor: {
        name: "Mukul Pradhan",
        expertise: ["Forensics", "Document Authentication"],
      },
      learningOutcomes: [
        "Authenticate IDs and instruments confidently",
        "Detect counterfeits and forgeries",
        "Improve frontline fraud controls",
      ],
      location: "Onsite at Bank / Kathmandu",
      lastUpdated: "2025-09-11",
      tags: ["Fraud", "Forensics", "Operations"],
      images: { cover: "https://i.pinimg.com/736x/dd/45/cb/dd45cb565575ea3808cdb3d68a02aade.jpg", icon: "scan-line" },
      language: "English",
    },
    {
      id: "4",
      slug: "delight-customers-excellent-service",
      title: "Delight Your Customers with Excellent Customer Service",
      category: "Service Excellence",
      summary:
        "Hospitality-driven customer service skills tailored for banking to elevate interactions and build long-term trust.",
      keyPoints: [
        "Hospitality mindset beyond basic service",
        "Handling diverse customer personalities",
        "Delivering a 5-star experience end-to-end",
        "Global best practices from luxury brands",
        "Role-play and reflection for practical skills",
      ],
      durationDays: 1,
      level: "Foundation",
      maxParticipants: 35,
      certification: "Certificate of Completion",
      audience: ["Front Office", "Relationship Managers", "Call Center"],
      instructor: { name: "ICCD Faculty", expertise: ["CX", "Hospitality"] },
      learningOutcomes: [
        "Adopt a hospitality-first service model",
        "De-escalate and handle difficult situations",
        "Map and enhance the customer journey",
      ],
      location: "Kathmandu or Virtual",
      lastUpdated: "2025-09-11",
      tags: ["Customer Service", "CX", "Hospitality"],
      images: { cover: "https://i.pinimg.com/736x/dd/45/cb/dd45cb565575ea3808cdb3d68a02aade.jpg", icon: "smile" },
      language: "English",
    },
    {
      id: "5",
      slug: "esg-climate-finance",
      title: "ESG & Climate Finance (CF) Training",
      category: "ESG & Sustainability",
      summary:
        "Integrate ESG risks, reporting, and Nepal’s Green Taxonomy into financial decision-making with practical KPIs and case studies.",
      keyPoints: [
        "ESG risks, disclosure frameworks, and global standards",
        "Nepal’s ESRM guidelines and ESDD processes",
        "ESG integration through KPIs and case studies",
        "Introduction to Nepal’s Green Taxonomy and implications",
      ],
      durationDays: 2,
      level: "Intermediate",
      maxParticipants: 30,
      certification: "Certificate of Completion",
      audience: ["Risk", "Credit", "Strategy", "ESG Officers"],
      instructor: { name: "ICCD Faculty", expertise: ["ESG", "Climate Finance"] },
      learningOutcomes: [
        "Integrate ESG risk into credit strategy",
        "Build KPI dashboards for ESG reporting",
        "Screen projects against ESRM & taxonomy",
      ],
      location: "Kathmandu or Virtual",
      lastUpdated: "2025-09-11",
      tags: ["ESG", "Climate Finance", "Disclosure"],
      images: { cover: "https://i.pinimg.com/736x/dd/45/cb/dd45cb565575ea3808cdb3d68a02aade.jpg", icon: "globe" },
      language: "English",
    },
    {
      id: "6",
      slug: "risk-management-ecl-ifrs9",
      title: "Risk Management and Expected Credit Loss (ECL)",
      category: "Risk & Finance",
      summary:
        "Deep-dive into banking risks and IFRS 9 ECL modeling (EAD, PD, LGD) with NRB alignment and portfolio impact analysis.",
      keyPoints: [
        "Risks in the banking industry and mitigations",
        "Shift from incurred loss to expected credit loss",
        "NRB directives and asset staging",
        "ECL components: EAD, PD, LGD",
        "Impact on profitability and capital adequacy",
      ],
      durationDays: 2,
      level: "Advanced",
      maxParticipants: 30,
      certification: "Certificate of Completion",
      audience: ["Risk", "Finance", "ALCO", "Model Validation"],
      instructor: { name: "ICCD Faculty", expertise: ["Risk", "IFRS 9"] },
      learningOutcomes: [
        "Design an IFRS 9-aligned ECL framework",
        "Calibrate PD/LGD and validate models",
        "Quantify ECL impact on RWA and ICAAP",
      ],
      location: "Kathmandu or Virtual",
      lastUpdated: "2025-09-11",
      tags: ["Risk", "IFRS 9", "ECL", "NRB"],
      images: { cover: "https://i.pinimg.com/736x/dd/45/cb/dd45cb565575ea3808cdb3d68a02aade.jpg", icon: "trending-up" },
      language: "English",
    },
  ]

export function getProgramBySlug(slug: string): Program | undefined {
  
  return programData.find((p) => p.slug === slug)
}

export function getAllProgramSlugs(): string[] {
  return programData.map((p) => p.slug)
}


