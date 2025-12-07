import { Suspense } from 'react'
import { Header } from "@/app-components/header"
import { Footer } from "@/app-components/footer"
import { getPrograms } from "@/lib/programs"
import { ProgramsExplorer } from "@/app-components/programs-explorer"
import { ProgramsHero } from '@/app-components/programs-hero'
import { CTAStrip } from '@/app-components/cta-strip'
  
// Force dynamic rendering for real-time updates
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ProgramsPage() {
  const programs = await getPrograms()

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      {/* <ProgramsHero /> */}
      <main className="flex-1 flex flex-col"> {/* added pt-16 to account for fixed header if needed, or just to separate */}
        <Suspense fallback={<div className="h-screen flex items-center justify-center text-white">Loading programs...</div>}>
          <ProgramsExplorer programs={programs} />
        </Suspense>
      </main>
      {/* <CTAStrip /> */}
      <Footer />
    </div>
  )
}
