import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export type Program = {
  id: string
  slug: string
  title: string
  category: string
  summary: string
  keyPoints: string[]
  durationDays: number
  level: string
  maxParticipants: number
  format: string
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

export async function getPrograms(): Promise<Program[]> {
  const programs = await prisma.program.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return programs.map(p => ({
    ...p,
    level: p.level as "Foundation" | "Intermediate" | "Advanced", // Cast to match type
    instructor: {
      name: p.instructorName,
      expertise: p.instructorExpertise
    },
    images: {
      cover: p.imageCover,
      icon: p.imageIcon
    }
  }))
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  const p = await prisma.program.findUnique({
    where: { slug }
  })

  if (!p) return null

  return {
    ...p,
    level: p.level as "Foundation" | "Intermediate" | "Advanced",
    instructor: {
      name: p.instructorName,
      expertise: p.instructorExpertise
    },
    images: {
      cover: p.imageCover,
      icon: p.imageIcon
    }
  }
}

export async function getAllProgramSlugs(): Promise<string[]> {
  const programs = await prisma.program.findMany({
    select: { slug: true }
  })
  return programs.map(p => p.slug)
}
