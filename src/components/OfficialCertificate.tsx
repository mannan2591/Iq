import React, { useRef, useState } from 'react';
import { CertificateData, PerformanceLevel } from '../types';
import { Calendar, Download, Printer, ShieldCheck, Check, Sparkles, Award, Loader2, QrCode } from 'lucide-react';
import { downloadCertificatePdf } from '../utils/pdfExport';
import { IQManiaRocketIcon } from './IQManiaLogo';

interface OfficialCertificateProps {
  certificate: CertificateData;
  className?: string;
  showActions?: boolean;
}

export const OfficialCertificate: React.FC<OfficialCertificateProps> = ({
  certificate,
  className = '',
  showActions = true
}) => {
  const certRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);

  // Format date to "19 JULY 2026" style
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr.toUpperCase();
      const day = d.getDate();
      const month = d.toLocaleString('en-US', { month: 'long' }).toUpperCase();
      const year = d.getFullYear();
      return `${day} ${month} ${year}`;
    } catch {
      return dateStr.toUpperCase();
    }
  };

  const formattedDate = formatDate(certificate.issueDate || new Date().toISOString());

  // Map performance levels to official title
  const getLevelLabel = (level: PerformanceLevel, score: number) => {
    if (score >= 135) return 'GENIUS / VERY SUPERIOR';
    if (score >= 125) return 'VERY SUPERIOR';
    if (score >= 115) return 'SUPERIOR';
    if (score >= 105) return 'HIGH AVERAGE';
    if (score >= 90) return 'AVERAGE COGNITION';
    return level ? level.toUpperCase() : 'AVERAGE';
  };

  const performanceBadge = getLevelLabel(certificate.performanceLevel, certificate.estimatedScore);
  const topPercent = Math.max(1, Math.round(100 - certificate.percentile));

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (!certRef.current || isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    setPdfSuccess(false);

    try {
      const cleanFileName = `IQMANIA-Certificate-${certificate.userName.replace(/\s+/g, '_')}-${certificate.certificateId}.pdf`;
      const ok = await downloadCertificatePdf(certRef.current, cleanFileName);
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

  const handleCopyId = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(certificate.certificateId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`w-full max-w-5xl mx-auto ${className}`}>
      {/* Action bar above certificate */}
      {showActions && (
        <div className="no-print flex flex-wrap items-center justify-between gap-3 mb-4 p-3.5 rounded-2xl bg-white/95 border border-slate-200/90 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Official Verified Assessment Credential</span>
            <span className="hidden sm:inline font-mono text-slate-400 text-[11px]">({certificate.certificateId})</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              id="copy-certificate-id-btn"
              onClick={handleCopyId}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Sparkles className="w-3.5 h-3.5 text-amber-600" />}
              <span>{copied ? 'ID Copied' : 'Copy ID'}</span>
            </button>

            <button
              id="print-certificate-action-btn"
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Print</span>
            </button>

            <button
              id="download-certificate-pdf-btn"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 shadow-md shadow-amber-500/20 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-75"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating High-Res PDF...</span>
                </>
              ) : pdfSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>PDF Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Official PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ================= HIGH-FIDELITY OFFICIAL CERTIFICATE ================= */}
      <div
        ref={certRef}
        id="iqmania-official-certificate-canvas"
        className="certificate-container relative w-full bg-[#fdfcf7] shadow-2xl overflow-hidden select-none border-2 border-[#C59B27]/80 text-[#0A192F]"
        style={{
          aspectRatio: '1.414 / 1', // Standard A4 landscape ratio
          minHeight: '620px',
        }}
      >
        {/* ================= NAVY & GOLD GEOMETRIC LUXURY CORNER ACCENTS ================= */}
        {/* Top-Left Corner */}
        <div className="absolute top-0 left-0 w-28 sm:w-36 md:w-44 h-28 sm:h-36 md:h-44 pointer-events-none z-10">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <polygon points="0,0 200,0 0,200" fill="#0A192F" />
            <polygon points="0,0 165,0 0,165" fill="#06101E" />
            <line x1="0" y1="200" x2="200" y2="0" stroke="#C59B27" strokeWidth="4" />
            <line x1="0" y1="186" x2="186" y2="0" stroke="#E5C158" strokeWidth="1.5" />
            <line x1="0" y1="170" x2="170" y2="0" stroke="#C59B27" strokeWidth="2.5" />
          </svg>
        </div>

        {/* Top-Right Corner */}
        <div className="absolute top-0 right-0 w-28 sm:w-36 md:w-44 h-28 sm:h-36 md:h-44 pointer-events-none z-10">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <polygon points="0,0 200,0 200,200" fill="#0A192F" />
            <polygon points="35,0 200,0 200,165" fill="#06101E" />
            <line x1="0" y1="0" x2="200" y2="200" stroke="#C59B27" strokeWidth="4" />
            <line x1="14" y1="0" x2="200" y2="186" stroke="#E5C158" strokeWidth="1.5" />
            <line x1="30" y1="0" x2="200" y2="170" stroke="#C59B27" strokeWidth="2.5" />
          </svg>
        </div>

        {/* Bottom-Left Corner */}
        <div className="absolute bottom-0 left-0 w-28 sm:w-36 md:w-44 h-28 sm:h-36 md:h-44 pointer-events-none z-10">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <polygon points="0,0 0,200 200,200" fill="#0A192F" />
            <polygon points="0,35 0,200 165,200" fill="#06101E" />
            <line x1="0" y1="0" x2="200" y2="200" stroke="#C59B27" strokeWidth="4" />
            <line x1="0" y1="14" x2="186" y2="200" stroke="#E5C158" strokeWidth="1.5" />
            <line x1="0" y1="30" x2="170" y2="200" stroke="#C59B27" strokeWidth="2.5" />
          </svg>
        </div>

        {/* Bottom-Right Corner */}
        <div className="absolute bottom-0 right-0 w-28 sm:w-36 md:w-44 h-28 sm:h-36 md:h-44 pointer-events-none z-10">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <polygon points="200,0 0,200 200,200" fill="#0A192F" />
            <polygon points="200,35 35,200 200,200" fill="#06101E" />
            <line x1="200" y1="0" x2="0" y2="200" stroke="#C59B27" strokeWidth="4" />
            <line x1="200" y1="14" x2="14" y2="200" stroke="#E5C158" strokeWidth="1.5" />
            <line x1="200" y1="30" x2="30" y2="200" stroke="#C59B27" strokeWidth="2.5" />
          </svg>
        </div>

        {/* Inner Gold Triple Filigree Frame */}
        <div className="absolute inset-3 sm:inset-5 border border-[#C59B27]/50 pointer-events-none z-10">
          <div className="absolute inset-1 sm:inset-1.5 border-2 border-[#C59B27] pointer-events-none">
            <div className="absolute inset-1 border border-[#C59B27]/30 pointer-events-none" />
          </div>
        </div>

        {/* ================= BACKGROUND SECURITY WATERMARK ================= */}
        <div className="absolute right-12 sm:right-24 top-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80 opacity-[0.04] pointer-events-none select-none">
          <IQManiaRocketIcon idPrefix="cert-wm" className="w-full h-full" />
        </div>

        {/* Subtle guilloche dot pattern */}
        <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#0A192F_1px,transparent_1px)] [background-size:14px_14px] pointer-events-none" />

        {/* ================= CERTIFICATE MAIN CONTENT ================= */}
        <div className="relative z-20 w-full h-full flex flex-col justify-between px-6 sm:px-12 md:px-16 py-6 sm:py-8 text-center">
          
          {/* ================= 1. HEADER SECTION ================= */}
          <div className="relative w-full pt-1 sm:pt-2">
            
            {/* Top-Right Clear Certificate ID Box (Ensures 100% visibility away from corners) */}
            <div className="absolute right-0 sm:right-2 top-0 text-right z-30">
              <div className="inline-flex flex-col items-end bg-[#fdfcf7]/95 px-2.5 py-1 rounded-md border border-[#C59B27]/40 shadow-xs">
                <div className="text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                  AUTHENTICATED RECORD
                </div>
                <div className="text-[10px] sm:text-xs font-black text-[#0A192F] font-mono tracking-wide">
                  ID: {certificate.certificateId}
                </div>
              </div>
              {/* Golden Laurel Accent under ID */}
              <div className="flex justify-end mt-0.5 opacity-90">
                <svg viewBox="0 0 100 20" className="w-16 sm:w-20 h-3.5 sm:h-4 text-[#C59B27]">
                  <path d="M10 14 C 30 6, 70 6, 90 14" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <ellipse cx="25" cy="9" rx="3.5" ry="1.8" fill="currentColor" transform="rotate(-20 25 9)" />
                  <ellipse cx="40" cy="6.5" rx="3.5" ry="1.8" fill="currentColor" transform="rotate(-10 40 6.5)" />
                  <ellipse cx="55" cy="6.5" rx="3.5" ry="1.8" fill="currentColor" transform="rotate(10 55 6.5)" />
                  <ellipse cx="70" cy="9" rx="3.5" ry="1.8" fill="currentColor" transform="rotate(20 70 9)" />
                  <ellipse cx="85" cy="13" rx="3" ry="1.5" fill="currentColor" transform="rotate(30 85 13)" />
                </svg>
              </div>
            </div>

            {/* Brand Logo & Name */}
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 sm:gap-2.5">
                {/* IQ Mania Rocket Brain Icon */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 relative flex items-center justify-center shrink-0">
                  <IQManiaRocketIcon idPrefix="cert-hdr" className="w-full h-full drop-shadow-sm" />
                </div>

                {/* IQ Mania Brand */}
                <div className="text-2xl sm:text-3xl font-black tracking-tight text-[#0A192F] font-display flex items-baseline">
                  <span>IQ</span>
                  <span className="font-bold text-[#0284C7] ml-0.5">Mania</span>
                </div>
              </div>

              {/* Sub-tagline */}
              <div className="text-[7.5px] sm:text-[9px] font-bold tracking-[0.3em] text-[#0A192F] uppercase mt-0.5">
                CHALLENGE YOUR MIND. DISCOVER YOUR POTENTIAL.
              </div>
            </div>

            {/* CERTIFICATE OF ACHIEVEMENT Header */}
            <div className="mt-2 sm:mt-3">
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-[#C59B27] text-sm sm:text-base">☙</span>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-normal font-cinzel tracking-[0.14em] text-[#C59B27] drop-shadow-xs">
                  CERTIFICATE
                </h1>
                <span className="text-[#C59B27] text-sm sm:text-base">❧</span>
              </div>

              <div className="text-[9.5px] sm:text-xs font-bold tracking-[0.35em] text-[#0A192F] uppercase mt-0.5">
                OF ACHIEVEMENT
              </div>
            </div>

          </div>

          {/* ================= 2. CANDIDATE & SCORE SECTION ================= */}
          <div className="my-auto py-1 sm:py-2 relative">
            
            {/* Left Gold Medallion Outer Disc */}
            <div className="hidden sm:block absolute left-0 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-20">
              <div className="relative flex flex-col items-center">
                {/* 24-point Scalloped Gold Medallion */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26 rounded-full bg-gradient-to-tr from-[#B8860B] via-[#E5C158] to-[#997010] p-1.5 shadow-xl flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#0A192F] border-2 border-[#E5C158] flex flex-col items-center justify-center text-center p-1 relative overflow-hidden">
                    <div className="text-[7px] sm:text-[8px] font-extrabold uppercase tracking-wider text-[#E5C158]">
                      IQ SCORE
                    </div>
                    <div className="text-[#E5C158] text-[6px] sm:text-[7px] leading-none my-0.5">
                      ★★★★★
                    </div>
                    <div className="text-xl sm:text-2xl font-extrabold font-serif-title text-[#E5C158] leading-none">
                      {certificate.estimatedScore}
                    </div>
                    <div className="text-[5.5px] sm:text-[6.5px] font-extrabold uppercase tracking-tight text-[#E5C158] mt-0.5 truncate max-w-[80px]">
                      {certificate.performanceLevel}
                    </div>
                  </div>
                </div>

                {/* Hanging Ribbons */}
                <div className="flex gap-1 -mt-2 z-[-1]">
                  <div className="w-4 sm:w-5 h-7 sm:h-9 bg-[#0A192F] border-r border-l border-[#E5C158] shadow-md transform -rotate-12 origin-top"
                       style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)' }} />
                  <div className="w-4 sm:w-5 h-7 sm:h-9 bg-[#0A192F] border-r border-l border-[#E5C158] shadow-md transform rotate-12 origin-top"
                       style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)' }} />
                </div>
              </div>
            </div>

            {/* Candidate Sub-header */}
            <div className="flex items-center justify-center gap-2 text-[9px] sm:text-[11px] font-semibold tracking-[0.2em] text-slate-600 uppercase">
              <span className="w-8 sm:w-12 h-[1px] bg-[#C59B27]" />
              <span>THIS IS TO CERTIFY THAT</span>
              <span className="w-8 sm:w-12 h-[1px] bg-[#C59B27]" />
            </div>

            {/* Candidate Name in Bold Regal Serif */}
            <div className="text-2xl sm:text-4xl md:text-5xl font-normal font-cinzel text-[#0A192F] tracking-wide my-1 sm:my-2 uppercase px-4">
              {certificate.userName}
            </div>

            {/* Three Golden Diamonds */}
            <div className="flex items-center justify-center gap-2 text-[#C59B27] text-xs">
              <span>◆</span>
              <span>◆</span>
              <span>◆</span>
            </div>

            {/* Subtext */}
            <div className="text-[8.5px] sm:text-[11px] font-semibold tracking-[0.12em] text-[#0A192F] uppercase max-w-lg mx-auto mt-1 leading-relaxed">
              HAS SUCCESSFULLY COMPLETED THE IQ TEST ON IQMANIA
              <br />
              AND ACHIEVED AN
            </div>

            {/* — IQ SCORE OF — */}
            <div className="flex items-center justify-center gap-2 text-[9.5px] sm:text-xs font-bold tracking-[0.2em] text-[#0A192F] uppercase mt-2">
              <span className="w-8 sm:w-12 h-[1px] bg-[#C59B27]" />
              <span>IQ SCORE OF</span>
              <span className="w-8 sm:w-12 h-[1px] bg-[#C59B27]" />
            </div>

            {/* Big Score with Flanking Golden Laurel Branches */}
            <div className="flex items-center justify-center gap-3 sm:gap-6 my-0.5">
              {/* Left Laurel Branch */}
              <div className="w-9 sm:w-14 h-14 sm:h-20 text-[#C59B27]">
                <svg viewBox="0 0 50 100" className="w-full h-full">
                  <path d="M40 90 C15 70, 15 30, 35 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <ellipse cx="30" cy="80" rx="7" ry="3.5" fill="currentColor" transform="rotate(-30 30 80)" />
                  <ellipse cx="20" cy="65" rx="7" ry="3.5" fill="currentColor" transform="rotate(-15 20 65)" />
                  <ellipse cx="18" cy="50" rx="7" ry="3.5" fill="currentColor" transform="rotate(0 18 50)" />
                  <ellipse cx="20" cy="35" rx="7" ry="3.5" fill="currentColor" transform="rotate(20 20 35)" />
                  <ellipse cx="28" cy="22" rx="6" ry="3" fill="currentColor" transform="rotate(35 28 22)" />
                  <ellipse cx="35" cy="12" rx="5" ry="2.5" fill="currentColor" transform="rotate(50 35 12)" />
                </svg>
              </div>

              {/* Central Large Score */}
              <div className="text-5xl sm:text-7xl md:text-8xl font-normal font-cormorant text-[#0A192F] tracking-tight leading-none">
                {certificate.estimatedScore}
              </div>

              {/* Right Laurel Branch */}
              <div className="w-9 sm:w-14 h-14 sm:h-20 text-[#C59B27]">
                <svg viewBox="0 0 50 100" className="w-full h-full">
                  <path d="M10 90 C35 70, 35 30, 15 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <ellipse cx="20" cy="80" rx="7" ry="3.5" fill="currentColor" transform="rotate(30 20 80)" />
                  <ellipse cx="30" cy="65" rx="7" ry="3.5" fill="currentColor" transform="rotate(15 30 65)" />
                  <ellipse cx="32" cy="50" rx="7" ry="3.5" fill="currentColor" transform="rotate(0 32 50)" />
                  <ellipse cx="30" cy="35" rx="7" ry="3.5" fill="currentColor" transform="rotate(-20 30 35)" />
                  <ellipse cx="22" cy="22" rx="6" ry="3" fill="currentColor" transform="rotate(-35 22 22)" />
                  <ellipse cx="15" cy="12" rx="5" ry="2.5" fill="currentColor" transform="rotate(-50 15 12)" />
                </svg>
              </div>
            </div>

            {/* Performance Level Navy Pill Badge */}
            <div className="inline-block">
              <div className="px-6 sm:px-8 py-1 rounded-full bg-[#0A192F] text-white text-[9px] sm:text-xs font-bold tracking-[0.2em] uppercase border border-[#C59B27] shadow-sm">
                {performanceBadge}
              </div>
            </div>

          </div>

          {/* ================= 3. BOTTOM SECTION (HIGHLY VISIBLE DATE, TOP %, AND SIGNATURE - SHIFTED UP ~2CM TOTAL) ================= */}
          <div className="w-full pt-3 pb-8 sm:pb-12 md:pb-16 border-t-2 border-[#C59B27]/50 relative mt-auto mb-6 sm:mb-9 md:mb-11">
            <div className="grid grid-cols-3 items-end gap-2 text-xs">
              
              {/* ================= A. DATE OF ACHIEVEMENT (BOTTOM LEFT) ================= */}
              <div className="text-left flex flex-col items-start pl-2 sm:pl-6 z-20 -translate-y-3 sm:-translate-y-5 md:-translate-y-6">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-amber-50 border border-[#C59B27]/80 flex items-center justify-center text-[#C59B27] shrink-0">
                    <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                  <span className="text-[8px] sm:text-[9.5px] font-extrabold tracking-wider text-slate-600 uppercase">
                    DATE OF ACHIEVEMENT
                  </span>
                </div>
                
                {/* Date string */}
                <div className="text-xs sm:text-sm md:text-base font-black text-[#0A192F] tracking-wide font-display">
                  {formattedDate}
                </div>
                
                <div className="w-20 sm:w-28 h-[1.5px] bg-[#C59B27] mt-1" />
              </div>

              {/* ================= B. POPULATION TOP PERCENTILE (BOTTOM CENTER) ================= */}
              <div className="text-center flex flex-col items-center justify-center z-20 px-1 -translate-y-3 sm:-translate-y-5 md:-translate-y-6">
                {/* High-visibility Percentile Badge */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-[#C59B27]/70 text-[#0A192F] shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                  <span className="text-[9.5px] sm:text-[11.5px] font-bold">
                    TOP <strong className="text-sm sm:text-base font-black text-indigo-950 font-display">{topPercent}%</strong> OF POPULATION
                  </span>
                </div>
                
                <div className="text-[8px] sm:text-[9.5px] text-slate-600 font-semibold mt-1">
                  Percentile Rank: <strong className="text-[#0A192F]">{certificate.percentile}th Percentile</strong>
                </div>
              </div>

              {/* ================= C. SIGNATURE & BOARD (BOTTOM RIGHT) ================= */}
              <div className="text-right flex flex-col items-end pr-2 sm:pr-6 z-20 -translate-y-3 sm:-translate-y-5 md:-translate-y-6">
                {/* Clean Calligraphic Handwritten Signature */}
                <div className="font-signature text-2xl sm:text-3xl md:text-4xl text-[#0A192F] leading-none mb-0.5 font-bold tracking-normal drop-shadow-xs">
                  Mannan
                </div>
                
                <div className="text-[9px] sm:text-[11px] font-black tracking-widest text-[#0A192F] uppercase">
                  MANNAN
                </div>
                
                <div className="text-[7.5px] sm:text-[8.5px] font-bold tracking-wider text-slate-600 uppercase">
                  DIRECTOR OF HYPERSTUDIO
                </div>
                
                <div className="w-24 sm:w-32 h-[1.5px] bg-[#C59B27] mt-1" />
              </div>

            </div>

            {/* Bottom-Center Gold Coin Seal positioned neatly at bottom center */}
            <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 -translate-x-1/2 z-30">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-[#B8860B] via-[#E5C158] to-[#997010] p-0.5 sm:p-1 shadow-lg flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gradient-to-b from-[#E5C158] to-[#B8860B] border border-amber-200 flex flex-col items-center justify-center text-amber-950">
                  <div className="text-[5px] leading-none text-amber-950 font-bold">★★★</div>
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-950 my-0.5" />
                  <div className="text-[4.5px] sm:text-[5.5px] font-extrabold uppercase tracking-tighter leading-none">
                    OFFICIAL
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Verification footer underneath the canvas */}
      <div className="no-print mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 px-3 gap-2 bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/80">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>
            Certificate Verification ID: <code className="font-mono font-bold text-indigo-700">{certificate.certificateId}</code>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>Public Verification Portal:</span>
          <a
            href={`#verify/${certificate.certificateId}`}
            className="font-mono font-bold text-indigo-600 hover:text-indigo-800 underline"
          >
            {window.location.origin}/#verify/{certificate.certificateId}
          </a>
        </div>
      </div>

    </div>
  );
};
