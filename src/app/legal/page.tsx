import { Header } from "@/app-components/header"
import { Footer } from "@/app-components/footer"
import { PrismaClient } from "@prisma/client"
import Link from "next/link"
import { Card, CardContent } from "@/app-components/ui/card"
import { FileText, ArrowRight } from "lucide-react"
import { ChevronRight } from "lucide-react"

const prisma = new PrismaClient()

export default async function LegalListPage() {
  const docs = await prisma.legalDocument.findMany({
    orderBy: { title: 'asc' }
  })

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* <nav className="flex items-center gap-2 text-sm text-gray-400 mb-12">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/legal" className="text-primary font-medium">
              Legal
            </Link>
          </nav> */}

          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-white">Legal Documents</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transparency and trust are at the core of our operations. Below you can find our legal policies and terms.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((doc) => (
            <Link key={doc.id} href={`/legal/${doc.slug}`} className="block group">
              <Card className="h-full hover:shadow-lg transition-shadow border-secondary/10 group-hover:translate-y-[-5px] group-hover:border-secondary/40">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-primary/20 p-3 rounded-lg group-hover:bg-secondary/40 group-hover:text-white  transition-colors">
                      <FileText className="w-6 h-6" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
                  </div>
                 
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-secondary transition-colors">{doc.title}</h2>
                   <p className="text-xs text-muted-foreground mb-1 truncate font-mono ">
                    {doc.fileUrl.split('/').pop()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}

          {docs.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No legal documents available at the moment.
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}