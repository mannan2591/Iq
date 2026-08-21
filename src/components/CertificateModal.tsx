import React, { useState, useRef } from 'react';
import { CertificateData } from '../types';
import { OfficialCertificate } from './OfficialCertificate';
import { downloadCertificatePdf } from '../utils/pdfExport';
import { 
  Printer, 
  X, 
  Check, 
  Copy, 
  Award,
  Download,
  Loader2
} from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: CertificateData;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  certificate
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const verifyUrl = `${window.location.origin}/#verify/${certificate.certificateId}`;

  const handleCopyLink = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(verifyUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    const certEl = containerRef.current?.querySelector('#iqmania-official-certificate-canvas') as HTMLElement;
    if (!certEl || isGeneratingPdf) return;

    setIsGeneratingPdf(true);
    setPdfSuccess(false);

    try {
      const cleanFileName = `IQMANIA-Certificate-${certificate.userName.replace(/\s+/g, '_')}-${certificate.certificateId}.pdf`;
      const ok = await downloadCertificatePdf(certEl, cleanFileName);
      if (ok) {
        setPdfSuccess(true);
        setTimeout(() => setPdfSuccess(false), 3000);
      }
    } catch (err) {
      console.error('PDF export error:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="w-full max-w-5xl my-auto bg-slate-900/95 rounded-3xl p-4 sm:p-8 shadow-2xl border border-slate-700/80 relative">
        
        {/* Modal Top Bar (Hidden in Print) */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-700/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white text-sm sm:text-base">
                Official Certificate of Achievement
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs text-slate-400 font-mono">
                ({certificate.certificateId})
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              id="modal-download-pdf-btn"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm disabled:opacity-75"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : pdfSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            <button
              id="print-certificate-btn"
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              id="copy-cert-link-btn"
              onClick={handleCopyLink}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-indigo-200 bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700/50 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied' : 'Verification Link'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close certificate modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================= OFFICIAL LUXURY CERTIFICATE ================= */}
        <div ref={containerRef} className="overflow-x-auto pb-2">
          <div className="min-w-[680px]">
            <OfficialCertificate certificate={certificate} showActions={false} />
          </div>
        </div>

      </div>
    </div>
  );
};
