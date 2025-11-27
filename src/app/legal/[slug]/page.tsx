import { Header } from "@/app-components/header"
import { Footer } from "@/app-components/footer"
import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, Calendar, Download } from "lucide-react"
import { CTAStrip } from "@/app-components/cta-strip"

const prisma = new PrismaClient()

export default async function LegalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const doc = await prisma.legalDocument.findUnique({
        where: { slug }
    })

    if (!doc) return notFound()

    return (
        <main className="min-h-screen bg-background">
            <Header />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/legal" className="inline-flex items-center text-sm text-muted-foreground hover:text-secondary mb-6 transition-colors">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to Legal Documents
                    </Link>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{doc.title}</h1>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Last updated: {new Date(doc.updatedAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                        <a
                            href={doc.fileUrl}
                            download
                            className="p-3 hover:bg-white/10 rounded-full transition-colors text-muted-foreground hover:text-primary cursor-pointer"
                            aria-label="Download PDF"
                            title="Download PDF"
                        >
                            <Download className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="aspect-[3/4] md:aspect-[4/3] w-full">
                        <iframe
                            src={doc.fileUrl}
                            className="w-full h-full"
                            title={doc.title}
                        />
                    </div>
                </div>
            </div>
            <CTAStrip/>
            <Footer />
        </main>
    )
}
