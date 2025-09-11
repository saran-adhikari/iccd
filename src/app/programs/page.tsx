"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/app-components/ui/card"
import { Badge } from "@/app-components/ui/badge"
import { programData, type Program } from "../../lib/programs"
import { ProgramsHero } from "@/app-components/programs-hero"
import { Header } from "@/app-components/header"
import { CTAStrip } from "@/app-components/cta-strip"
import { Footer } from "@/app-components/footer"

export default function ProgramsPage() {
  return (
    <>
    <Header/>
    <ProgramsHero/>
    <section className="max-w-7xl mx-auto px-6 py-12">
      
      <h1 className="text-3xl font-bold mb-8">Our Programs</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {programData.map((program: Program) => (
          <Link key={program.id} href={`/programs/${program.slug}`}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <img
                  src={program.images.cover}
                  alt={program.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <CardTitle className="mt-4 text-xl">{program.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                  {program.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge>{program.level}</Badge>
                  <Badge variant="secondary">{program.category}</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
    <CTAStrip/>
    <Footer/>
    </>
  )
}
