"use client";

import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronRight, X, Download, FileText } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// More reliable worker configuration for Next.js
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

export default function LegalDocs() {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Ensure component only renders on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // List your PDF files here
  const pdfFiles = [
    {
      path: "/Docs/कम्पनी-ऐन-२०६३.pdf",
      np: "कम्पनी ऐन २०६३",
      en: "Companies Act 2063"
    },
    {
      path: "/Docs/औद्योगिक-व्यवसाय-ऐन-२०७६.pdf",
      np: "औद्योगिक व्यवसाय ऐन २०७६",
      en: "Industrial Enterprises Act 2076"
    },
    {
      path: "/Docs/विद्यूतीय-इलेक्ट्रोनिक-कारोबार-ऐन-२०६३.pdf",
      np: "विद्यूतीय इलेक्ट्रोनिक कारोवार ऐन २०६३",
      en: "Electronic Transactions Act 2063"
    },
    {
      path: "/Docs/श्रम-ऐन-२०७४.pdf",
      np: "श्रम ऐन २०७४",
      en: "Labor Act 2074"
    },
    {
      path: "/Docs/सामाजिक-सुरक्षा-ऐन-२०७५.pdf",
      np: "सामाजिक सुरक्षा ऐन २०७५",
      en: "Social Security Act 2075"
    },
    {
      path: "/Docs/नेपाल-राष्ट्र-बैङ्क-ऐन-२०५८.pdf",
      np: "नेपाल राष्ट्र बैंक ऐन २०५८",
      en: "Nepal Rastra Bank Act 2058"
    },
    {
      path: "/Docs/बैङ्क-तथा-वित्तीय-संस्था-सम्बन्धी-ऐन-२०७३.pdf",
      np: "बैङ्क तथा वित्तीय संस्था सम्बन्धी ऐन २०७३",
      en: "BFI Act 2073"
    },
    {
      path: "/Docs/बैङ्किङ्ग-कसूर-तथा-सजाय-ऐन-२०६४.pdf",
      np: "बैङ्किङ्ग कसूर तथा सजाय ऐन २०६४",
      en: "Banking Offence & Punishment Act 2064"
    },
    {
      path: "/Docs/भुक्तानी-तथा-फर्स्यौट-ऐन-२०७५.pdf",
      np: "भुक्तानी तथा फर्स्यौट ऐन २०७५",
      en: "Payment & Settlement Act 2075"
    },
    {
      path: "/Docs/विदेशी-विनिमय-नियमित-गर्ने-ऐन-२०१९.pdf",
      np: "विदेशी विनिमय नियमित गर्ने ऐन २०१९",
      en: "Foreign Exchange Regulation Act 2019"
    },
    {
      path: "/Docs/विनिमेय-अधिकारपत्र-ऐन-२०३४.pdf",
      np: "विनिमेय अधिकारपत्र ऐन २०३४",
      en: "Negotiable Instruments Act 2034"
    },
    {
      path: "/Docs/सम्पत्ति-शुद्धीकरण-मनी-लाउन्डरिङ्ग-निवारण-ऐन-२०६४.pdf",
      np: "सम्पत्ति शुद्धीकरण (मनि लाउन्डरिङ्ग) निवारण ऐन २०६४",
      en: "Anti-Money Laundering Act 2064"
    },
    {
      path: "/Docs/सार्वजनिक-खरिद-ऐन-२०६४.pdf",
      np: "सार्वजनिक खरिद ऐन २०६४",
      en: "Public Procurement Act 2064"
    },
    {
      path: "/Docs/सूचनाको-हक-सम्बन्धी-ऐन-२०६४.pdf",
      np: "सूचनाको हक सम्बन्धी ऐन २०६४",
      en: "Right to Information Act 2064"
    }
  ];


  // Extract readable Nepali title from file name
  const extractName = (filePath: string) => {
    const fileName = filePath.split("/").pop()!;
    const withoutExt = fileName.replace(".pdf", "");
    const spaced = withoutExt.replace(/_/g, " ");
    return decodeURI(spaced);
  };

  const openPreview = (file: string) => {
    setSelectedPdf(file);
    setError(null);
    setLoading(true);
  };

  const closePreview = () => {
    setSelectedPdf(null);
    setNumPages(null);
    setError(null);
    setLoading(false);
  };

  const downloadPdf = () => {
    if (!selectedPdf) return;

    const link = document.createElement("a");
    link.href = selectedPdf;
    link.download = extractName(selectedPdf) + ".pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("PDF Load Error:", error);
    setError("Failed to load PDF. The file may be corrupted or inaccessible.");
    setLoading(false);
  };

  // Show loading state during SSR/hydration
  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/legal" className="hover:text-white transition-colors">
            Legal
          </Link>
        </nav>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb Route Section */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-12">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/legal" className="text-primary font-medium">
          Legal
        </Link>
      </nav>

      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-6xl font-extrabold mb-8 text-transparent bg-clip-text text-white">
          Legal Documents
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Access our comprehensive library of acts, regulations, and compliance documents.
        </p>
      </div>

      {/* PDF List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pdfFiles.map((file, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            onClick={() => openPreview(file.path)}
            className="group relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 hover:border-secondary/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-white group-hover:text-secondary transition-colors mb-2 leading-snug">
                  {file.np}
                </h2>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors font-medium">
                  {file.en}
                </p>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
              <ChevronRight className="w-5 h-5 text-secondary" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Preview */}
      {selectedPdf && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header with Download and Close Button */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {pdfFiles.find(f => f.path === selectedPdf)?.np}
                </h3>
                <p className="text-sm text-gray-500">
                  {pdfFiles.find(f => f.path === selectedPdf)?.en}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-primary cursor-pointer"
                  onClick={downloadPdf}
                  aria-label="Download PDF"
                  title="Download PDF"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-red-500 cursor-pointer"
                  onClick={closePreview}
                  aria-label="Close preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-auto bg-gray-50 p-6 flex justify-center">
              {loading && (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-500 font-medium">Loading Document...</p>
                </div>
              )}

              {error && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="text-red-500 font-semibold mb-4">{error}</p>
                  <button
                    onClick={closePreview}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Close Viewer
                  </button>
                </div>
              )}

              <Document
                file={selectedPdf}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={<div />}
                error={<div />}
                className="max-w-full"
              >
                {Array.from(new Array(numPages), (_, i) => (
                  <Page
                    key={i}
                    pageNumber={i + 1}
                    width={Math.min(800, typeof window !== 'undefined' ? window.innerWidth - 100 : 800)}
                    className="mb-6 shadow-lg rounded-lg overflow-hidden"
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                  />
                ))}
              </Document>
            </div>

            {numPages && (
              <div className="bg-white border-t border-gray-200 px-6 py-3 text-center text-sm text-gray-500">
                Page 1 of {numPages}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}