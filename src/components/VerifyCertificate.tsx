import React, { useState, useEffect } from 'react';
import { CertificateService } from '../services/certificateService';
import { CertificateData } from '../types';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Award, 
  ArrowRight,
  Loader2
} from 'lucide-react';

interface VerifyCertificateProps {
  initialId?: string;
  onViewCertificateModal?: (cert: CertificateData) => void;
}

export const VerifyCertificate: React.FC<VerifyCertificateProps> = ({
  initialId = '',
  onViewCertificateModal
}) => {
  const [searchId, setSearchId] = useState(initialId);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CertificateData | null>(null);

  useEffect(() => {
    if (initialId) {
      handleLookup(initialId);
    }
  }, [initialId]);

  const handleLookup = (idToLookup: string) => {
    const id = idToLookup.trim().toUpperCase();
    if (!id) return;
    setSearchId(id);
    setLoading(true);
    setSearched(false);

    try {
      // Check local verified registry
      const found = CertificateService.verifyCertificate(id);
      setResult(found);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLookup(searchId);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 sm:py-16">
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Official Verification Registry</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Verify IQMANIA Certificate
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Authenticate issued cognitive assessment credentials, verify test date, and check candidate score records.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 bg-white/95 border border-white shadow-xl mb-8">
        <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={searchId}
              onChange={(e) => setSearchId(e.target.value.toUpperCase())}
              placeholder="e.g. IQM-2026-A82F91"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-mono font-bold text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-hidden uppercase tracking-wider"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-7 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all shrink-0 disabled:opacity-75"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <span>Verify Now</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Sample IDs */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-600">
          <span className="text-slate-600">Quick Test Samples:</span>
          {['IQM-2026-A82F91', 'IQM-2026-N74K20', 'IQM-2026-X99M12'].map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => handleLookup(sample)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 text-indigo-700 font-mono font-semibold border border-slate-200 text-[11px] transition-colors cursor-pointer"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      {/* Result Display */}
      {searched && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          {result ? (
            /* Verified State */
            <div className="glass-panel rounded-3xl p-6 sm:p-8 bg-white/95 border-2 border-emerald-500/50 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      Valid & Verified Certificate
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono mt-0.5">
                      {result.certificateId}
                    </h2>
                  </div>
                </div>

                <div className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified by IQMANIA</span>
                </div>
              </div>

              {/* Certificate Metadata Record */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 text-sm">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase">Candidate Name</span>
                  <div className="font-extrabold text-slate-900 text-base">{result.userName}</div>
                  {result.nickname && (
                    <div className="text-xs text-slate-500">Handle: @{result.nickname}</div>
                  )}
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase">Assessment Date</span>
                  <div className="font-extrabold text-slate-900 text-base flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    <span>{result.issueDate}</span>
                  </div>
                  <div className="text-xs text-slate-500">Age Cohort: {result.ageGroup} Years</div>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-1">
                  <span className="text-xs font-bold text-indigo-700 uppercase">Estimated Cognitive Score</span>
                  <div className="text-2xl font-black text-indigo-950 font-display">
                    {result.estimatedScore}
                  </div>
                  <div className="text-xs text-indigo-800">Standardized Normal (Mean 100, SD 15)</div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-1">
                  <span className="text-xs font-bold text-purple-700 uppercase">Percentile Standing</span>
                  <div className="text-2xl font-black text-purple-950 font-display">
                    {result.percentile}th Percentile
                  </div>
                  <div className="text-xs text-purple-800">Performance: {result.performanceLevel}</div>
                </div>
              </div>

              {/* View Full Certificate Action */}
              {onViewCertificateModal && (
                <div className="pt-4 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={() => onViewCertificateModal(result)}
                    className="px-6 py-3 rounded-xl font-bold text-xs text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <Award className="w-4 h-4" />
                    <span>View Digital Certificate</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Not Found State */
            <div className="glass-panel rounded-3xl p-8 bg-white/95 border-2 border-rose-300 text-center shadow-xl">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
                <XCircle className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">
                ❌ Certificate Not Found
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto">
                No verified assessment was found matching ID: <code className="font-mono font-bold text-rose-600">{searchId}</code>. Please double-check the identifier format (e.g. IQM-2026-XXXXXX).
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
