"use client"

import { Footer } from "@/app-components/footer";
import { Header } from "@/app-components/header";
import LegalDocs from "@/app-components/legal-docs";

export default function LegalDocsPage() {
    return(
        <main className="min-h-screen">
            <Header />
            <LegalDocs />
            <Footer />
        </main>
    )
}