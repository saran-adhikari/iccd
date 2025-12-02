import { Header } from "@/app-components/header"
import { Footer } from "@/app-components/footer"
import { PrismaClient } from "@prisma/client"
import { LegalDocumentList } from "@/app-components/legal-document-list"

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
            Transparency and accountability guide our operations. Below is a compilation of legal acts along with other laws enacted by the Parliament of Nepal and policies issued by Nepal Rastra Bank .
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <LegalDocumentList initialDocs={docs} />
      </div>

      <Footer />
    </main>
  )
}