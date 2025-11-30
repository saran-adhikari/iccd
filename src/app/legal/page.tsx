import { Header } from "@/app-components/header"
import { Footer } from "@/app-components/footer"
import { PrismaClient } from "@prisma/client"
import Link from "next/link"
import { FileText } from "lucide-react"

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
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-white">Legal Documents</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transparency and trust are at the core of our operations. Below you can find legal acts and policies provided by Nepal Rastra Bank.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((doc, index) => (
            <Link key={doc.id} href={`/legal/${doc.slug}`} className="block">
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 hover:border-primary/50 transition-all duration-500 group overflow-hidden cursor-pointer h-full">
                {/* Animated background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-[3rem] transition-all duration-500 group-hover:w-24 group-hover:h-24" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-5xl font-bold text-white/5 group-hover:text-white/10 transition-colors duration-500">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold mb-2 text-white group-hover:text-primary transition-colors duration-300 leading-snug">
                    {doc.title}
                  </h2>
                  <p className="text-sm text-gray-400 leading-relaxed font-mono truncate">
                    {doc.fileUrl.split('/').pop()?.replace(/\.[^/.]+$/, "") ?? "Document"}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-500" />
              </div>
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