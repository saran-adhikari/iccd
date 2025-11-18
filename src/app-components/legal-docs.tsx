"use client";

import { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { ChevronRight, X, Download } from "lucide-react";
import Link from "next/link";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// More reliable worker configuration for Next.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function LegalDocs() {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // List your PDF files here
  const pdfFiles = [
    "/Docs/१४.कम्पनी-ऐन-२०६३.pdf",
    "/Docs/१८.औद्योगिक-व्यवसाय-ऐन-२०७६.pdf",
    "/Docs/१९.विद्यूतीय-इलेक्ट्रोनिक-कारोबार-ऐन-२०६३.pdf",
    "/Docs/२५.श्रम-ऐन-२०७४.pdf",
    "/Docs/२७.सामाजिक-सुरक्षा-ऐन-२०७५.pdf",
    "/Docs/नेपाल-राष्ट्र-बैङ्क-ऐन-२०५८.pdf",
    "/Docs/बैङ्क-तथा-वित्तीय-संस्था-सम्बन्धी-ऐन-२०७३.pdf",
    "/Docs/बैङ्किङ्ग-कसूर-तथा-सजाय-ऐन-२०६४.pdf",
    "/Docs/भुक्तानी-तथा-फर्स्यौट-ऐन-२०७५.pdf",
    "/Docs/विदेशी-विनिमय-नियमित-गर्ने-ऐन-२०१९.pdf",
    "/Docs/विनिमेय-अधिकारपत्र-ऐन-२०३४.pdf",
    "/Docs/सम्पत्ति-शुद्धीकरण-मनी-लाउन्डरिङ्ग-निवारण-ऐन-२०६४.pdf",
    "/Docs/सार्वजनिक-खरिद-ऐन-२०६४.pdf",
    "/Docs/सूचनाको-हक-सम्बन्धी-ऐन-२०६४.pdf",
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb Route Section */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/legal" className="hover:text-white transition-colors">
          Legal
        </Link>
      </nav>

      <h1 className="text-4xl lg:text-5xl font-extrabold mb-10 leading-tight text-white text-center">
        Legal Documents
      </h1>

      {/* PDF List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pdfFiles.map((file, index) => (
          <div
            key={index}
            className="p-6 bg-none border border-gray-700 shadow rounded-xl cursor-pointer hover:shadow-lg transition hover:border-secondary"
            onClick={() => openPreview(file)}
          >
            <h2 className="text-xl font-semibold text-white">
              {extractName(file)}
            </h2>
            {/* <p className="text-sm text-gray-400 mt-2">Click to Preview</p> */}
          </div>
        ))}
      </div>

      {/* Modal Preview */}
      {selectedPdf && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl h-[90vh] overflow-auto relative">
            {/* Header with Download and Close Button */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
              <h3 className="text-lg font-semibold text-gray-800">
                {extractName(selectedPdf)}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                  onClick={downloadPdf}
                  aria-label="Download PDF"
                  title="Download PDF"
                >
                  <Download className="w-6 h-6 text-gray-700 cursor-pointer" />
                </button>
                <button
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                  onClick={closePreview}
                  aria-label="Close preview"
                >
                  <X className="w-6 h-6 text-gray-700 cursor-pointer" />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex flex-col items-center p-6">
              {loading && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  <p className="mt-4 text-black">Loading PDF...</p>
                </div>
              )}

              {error && (
                <div className="text-center py-8">
                  <p className="text-red-600 font-semibold">{error}</p>
                  <button
                    onClick={closePreview}
                    className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-blue-700 transition"
                  >
                    Close
                  </button>
                </div>
              )}

              <Document
                file={selectedPdf}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={<div />}
                error={<div />}
              >
                {Array.from(new Array(numPages), (_, i) => (
                  <Page
                    key={i}
                    pageNumber={i + 1}
                    width={Math.min(800, window.innerWidth - 100)}
                    className="mb-6 shadow-lg"
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                  />
                ))}
              </Document>

              {numPages && (
                <p className="mt-4 text-gray-600">
                  Total Pages: {numPages}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}