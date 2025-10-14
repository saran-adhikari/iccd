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
  longDescription: string
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
      slug: "esg-climate-finance",
      title: "ESG & Climate Finance (CF) Training",
      category: "ESG & Sustainability",
      summary:
        "The ESG and Environmental & Social Risk Management (ESRM) Training Program aims to build the capacity of bank staff to identify, assess, and manage environmental and social risks while promoting responsible and sustainable financing practices.",
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
      images: { cover: "https://i.pinimg.com/736x/be/27/13/be271365d3b69e2ffb0fc0c12280c2a7.jpg", icon: "globe" },
      language: "English",
      longDescription: `The program provides practical knowledge of ESG standards, Nepal Rastra Bank’s sustainable banking guidelines, and international frameworks such as the IFC Performance Standards. It focuses on how banks can incorporate ESG and ESRM principles into credit appraisal, project evaluation, and decision-making to ensure long-term sustainability and regulatory compliance.

        The training enhances participants’ understanding of ESG and ESRM concepts, equipping them to identify and manage environmental and social risks in lending and investment activities. It builds analytical and decision-making skills necessary for promoting responsible banking and aligning operations with national and global sustainability standards.
        For banks, the program strengthens compliance with regulatory and international sustainability requirements, reduces credit and reputational risks, and promotes responsible lending practices. It helps institutions contribute to national goals on sustainable development and climate resilience while enhancing their reputation as forward-thinking and socially responsible financial institutions.
        `,
    },
    {
      id: "2",
      slug: "aml-cft-nepal",
      title: "AML/CFT Compliance in Nepal",
      category: "Compliance", 
      summary:
        "AML/CFT and Risk Management Training Program is designed to equip banking professionals with the knowledge and tools to identify, assess, and mitigate financial crime risks while ensuring full compliance with national and international regulations.",
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
      images: { cover: "https://i.pinimg.com/1200x/6c/6c/d1/6c6cd162982d2450b1537374a6d0674b.jpg", icon: "shield" },
      language: "English",
      longDescription: `The program focuses on key provisions of Nepal Rastra Bank’s AML/CFT directives, the Money Laundering Prevention Act, and global FATF standards. It covers customer due diligence (CDD), suspicious transaction reporting (STR), risk-based approaches, and effective internal control measures. Participants also gain practical insights into implementing sound risk management frameworks within their institutions.

      The training helps participants understand AML/CFT requirements, risk indicators, and reporting obligations. It builds their ability to detect and prevent suspicious activities, apply risk-based controls, and ensure compliance in daily banking operations. This enhances their professional competence and accountability in safeguarding the integrity of the financial system.

      For banks, the program strengthens institutional compliance, minimizes reputational and regulatory risks, and promotes a culture of vigilance and transparency. It supports the development of robust internal control systems, ensures adherence to NRB and FATF standards, and helps protect the institution from potential penalties, fraud, and financial crime threats.
      `,
    },

    {
      id: "3",
      slug: "risk-management-ecl-ifrs9",
      title: "Risk Management and Expected Credit Loss (ECL)",
      category: "Risk & Finance",
      summary:
        "The Expected Credit Loss (ECL) and NFRS 9 Training Program is designed to help banking professionals understand and apply these standards effectively to ensure accurate financial reporting, sound risk management, and regulatory compliance.",
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
      images: { cover: "https://i.pinimg.com/1200x/4f/ee/b9/4feeb93f025c0ed9b200e5cc02f16b8d.jpg", icon: "trending-up" },
      language: "English",
      longDescription: `This program provides comprehensive knowledge of NFRS 9 principles, including classification and measurement of financial assets, expected credit loss modeling, staging criteria, and disclosures. It focuses on both theoretical understanding and practical application of ECL frameworks in line with Nepal Rastra Bank (NRB) directives and international best practices.

        The training enhances participants’ ability to interpret and apply NFRS 9 requirements in day-to-day banking operations. It strengthens analytical skills for credit risk assessment, data interpretation, and ECL model understanding, enabling them to contribute effectively to accurate provisioning and financial reporting processes.

        For banks, this program ensures compliance with NFRS 9 and NRB guidelines, leading to more transparent and reliable financial statements. It improves risk management practices, enhances accuracy in loan loss provisioning, and supports informed decision-making. Ultimately, it helps institutions maintain financial stability and investor confidence in an increasingly regulated environment.
        `,
    },

    {
      id: "4",
      slug: "cash-security-mukul-pradhan",
      title: "Mastering Cash Security",
      category: "Fraud & Forensics",
      summary:
        "The Mastering Cash Security Training Program equips banking staff with the skills and knowledge to handle cash accurately, securely, and efficiently, minimizing operational risks while ensuring customer trust.",
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
      images: { cover: "https://i.pinimg.com/736x/a4/92/36/a49236c47100f56228606d878cf47f50.jpg", icon: "scan-line" },
      language: "English",
      longDescription: `The program covers all aspects of secure cash handling, including counting, reconciliation, storage, and transportation of cash. It emphasizes detection and verification of counterfeit notes, identification of forged or damaged currency, and implementation of best practices to prevent cash fraud. Participants also learn about internal control mechanisms, compliance with Nepal Rastra Bank guidelines, and strategies to mitigate operational risks in daily banking transactions.

        The training strengthens participants’ technical skills in secure cash handling, counterfeit detection, and fraud prevention. It enhances their ability to manage cash operations confidently, reduce errors, and apply regulatory and internal controls effectively, ensuring safe and reliable cash management.

        For banks, this program reduces the risk of cash losses, fraud, and counterfeit circulation. It reinforces internal control systems, ensures compliance with NRB regulations, and promotes operational efficiency. By training staff in best practices and counterfeit detection, the bank safeguards its assets and strengthens customer confidence in its reliability and security.
`,
    },
    
    
    
    {
      id: "5",
      slug: "delight-customers-excellent-service",
      title: "Excellent Customer Service",
      category: "Service Excellence",
      summary:
        "The Delight Your Customers with Excellent Customer Service program is designed to help banking staff develop the right attitude, communication skills, and service approach to create lasting positive impressions on customers.",
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
      images: { cover: "https://i.pinimg.com/736x/c0/d0/fa/c0d0fa2b1a2b46e67ad0153ad2cca4fa.jpg", icon: "smile" },
      language: "English",
      longDescription: `The program focuses on understanding customer expectations, effective communication, complaint handling, and service delivery standards relevant to Nepalese context. Through interactive sessions and real-life banking examples, participants learn how to respond professionally, manage challenges, and enhance overall customer satisfaction.

      The training helps participants improve communication, empathy, and problem-solving skills to deliver professional and courteous service. It builds confidence in dealing with diverse customers, managing complaints, and maintaining long-term relationships that reflect the bank’s values and credibility.

      For banks, this program enhances customer satisfaction, loyalty, and institutional reputation. It reduces service-related grievances, promotes a customer-centric culture, and supports sustainable business growth in a highly competitive and trust-driven financial environment.
      `,
    },

     {
      id: "6",
      slug: "seecure-banking-training",
      title: "Secure Banking Training",
      category: "ESG & Sustainability",
      summary:
        "Our Smart Teller Secure Bank Training Program is designed to enhance security, efficiency, and professionalism in teller operations across Nepal’s banking institutions. As digital banking expands, ensuring skilled and security-aware teller staff has become essential for maintaining trust and compliance.",
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
        cover: "https://i.pinimg.com/736x/96/2d/6e/962d6ef4668975e166236d12e6891e17.jpg",
        icon: "leaf",
      },
      language: "English",
      longDescription: `The program focuses on practical teller operations, secure transaction handling, fraud prevention, compliance with Nepal Rastra Bank (NRB) guidelines, and customer service excellence. It combines technical skills with ethical and procedural awareness to build a secure and efficient banking environment.
      The program enhances participants’ technical and operational skills in teller functions, digital transaction security, and customer service. It builds confidence, promotes compliance with NRB regulations, and equips staff with the practical knowledge needed to perform efficiently and professionally in daily banking operations.

      For banks, the training reduces operational risks, transaction errors, and fraud incidents while improving service quality and customer trust. It ensures compliance with regulatory standards, strengthens internal controls, and fosters a skilled, security-conscious, and efficient workforce that upholds the bank’s reputation and reliability.
    `,
    },
  ]

export function getProgramBySlug(slug: string): Program | undefined {
  
  return programData.find((p) => p.slug === slug)
}

export function getAllProgramSlugs(): string[] {
  return programData.map((p) => p.slug)
}


