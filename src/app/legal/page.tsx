"use client";

import { Footer } from "@/app-components/footer";
import { Header } from "@/app-components/header";
import dynamic from "next/dynamic";

// Dynamically import LegalDocs with SSR disabled
const LegalDocs = dynamic(() => import("@/app-components/legal-docs"), {
  ssr: false,
  loading: () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-white">Loading Legal Documents...</p>
      </div>
    </div>
  ),
});

export default function LegalDocsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <LegalDocs />
      <Footer />
    </main>
  );
}