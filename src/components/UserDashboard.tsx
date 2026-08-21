import React, { useState } from 'react';
import { CertificateService } from '../services/certificateService';
import { AssessmentResult, CertificateData } from '../types';
import { 
  Award, 
  Calendar, 
  Play, 
  ExternalLink, 
  ShieldCheck, 
  Loader2, 
  Trash2, 
  Brain, 
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface UserDashboardProps {
  onStartAssessment: () => void;
  onViewCertificateModal: (cert: CertificateData) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  onStartAssessment,
  onViewCertificateModal
}) => {
  const [history, setHistory] = useState<AssessmentResult[]>(() => CertificateService.getAssessmentHistory());
  const [certificates, setCertificates] = useState<CertificateData[]>(() => CertificateService.getAllCertificates());
  const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);

  const reloadData = () => {
    setHistory(CertificateService.getAssessmentHistory());
    setCertificates(CertificateService.getAllCertificates());
  };

  const handleDeleteRecord = (assessmentId: string, certId: string) => {
    if (!confirm('Are you sure you want to delete this assessment record from your history?')) {
      return;
    }
    setDeleteLoadingId(assessmentId);
    try {
      // Update local storage
      const updatedHistory = history.filter(h => h.id !== assessmentId);
      setHistory(updatedHistory);
      try {
        localStorage.setItem('iqmania_history_v1', JSON.stringify(updatedHistory));
      } catch (e) {
        console.warn(e);
      }
    } catch (e) {
      console.error('Delete error:', e);
    } finally {
      setDeleteLoadingId(null);
    }
  };

  // Calculate high-level metrics
  const totalAssessments = history.length;
  const highestScore = totalAssessments > 0 ? Math.max(...history.map(h => h.estimatedScore)) : 0;
  const avgScore = totalAssessments > 0 ? Math.round(history.reduce((acc, curr) => acc + curr.estimatedScore, 0) / totalAssessments) : 0;
  const latestResult = history[0] || null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-14">
      {/* Top Header & New Assessment CTA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Cognitive Assessment Records
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Personal cognitive development history, accuracy breakdown, and issued certificates stored on your device.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={reloadData}
            className="px-3.5 py-2.5 rounded-2xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs flex items-center gap-1.5 cursor-pointer transition-all"
            title="Refresh local history"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Refresh</span>
          </button>

          <button
            onClick={onStartAssessment}
            className="px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md shadow-indigo-500/25 flex items-center gap-2 cursor-pointer transition-all shrink-0"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>New Assessment</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      {totalAssessments > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Tests</span>
            <div className="text-2xl font-black text-slate-900 font-display mt-1">{totalAssessments}</div>
            <span className="text-[10px] text-slate-500">Evaluations Taken</span>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 shadow-xs">
            <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">Peak IQ Score</span>
            <div className="text-2xl font-black text-indigo-950 font-display mt-1">{highestScore}</div>
            <span className="text-[10px] text-indigo-700 font-semibold">Personal Record</span>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-100 shadow-xs">
            <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider">Mean Score</span>
            <div className="text-2xl font-black text-purple-950 font-display mt-1">{avgScore}</div>
            <span className="text-[10px] text-purple-700 font-semibold">Average Index</span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 shadow-xs">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">Certificates</span>
            <div className="text-2xl font-black text-amber-950 font-display mt-1">{certificates.length}</div>
            <span className="text-[10px] text-amber-800 font-semibold">Verified Credentials</span>
          </div>
        </div>
      )}

      {history.length > 0 ? (
        <div className="space-y-8">
          {/* Latest Featured Assessment Card */}
          {latestResult && (
            <div className="glass-panel rounded-3xl p-6 sm:p-8 bg-white/95 border border-white shadow-xl">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Most Recent Evaluation
                  </span>
                </div>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(latestResult.completedAt).toLocaleDateString()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Left Score showcase */}
                <div className="text-center md:text-left p-6 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-purple-50/80 border border-indigo-100">
                  <div className="text-xs font-bold text-slate-500 uppercase">Estimated Cognitive Score</div>
                  <div className="text-5xl font-black text-indigo-950 font-display mt-1">
                    {latestResult.estimatedScore}
                  </div>
                  <div className="text-xs font-bold text-indigo-700 mt-2">
                    {latestResult.percentile}th Percentile • {latestResult.performanceLevel}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Candidate: {latestResult.userName} ({latestResult.ageGroup} Cohort)
                  </div>
                </div>

                {/* Middle Metrics */}
                <div className="space-y-2.5 text-xs text-slate-600">
                  <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span>Accuracy:</span>
                    <strong className="text-slate-900">
                      {latestResult.correctAnswers} / {latestResult.totalQuestions} ({Math.round((latestResult.correctAnswers / latestResult.totalQuestions) * 100)}%)
                    </strong>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span>Avg Response Time:</span>
                    <strong className="text-slate-900">{latestResult.avgResponseTimeSec}s</strong>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span>Certificate ID:</span>
                    <strong className="text-indigo-700 font-mono">{latestResult.certificateId}</strong>
                  </div>
                </div>

                {/* Right Action */}
                <div className="flex flex-col items-center justify-center p-4 text-center">
                  <Award className="w-10 h-10 text-amber-500 mb-2" />
                  <button
                    onClick={() => {
                      const cert = certificates.find(c => c.certificateId === latestResult.certificateId);
                      if (cert) onViewCertificateModal(cert);
                    }}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 shadow-xs flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Assessment History Table */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-600" />
                <span>All Past Assessment Logs ({history.length})</span>
              </h2>
            </div>

            <div className="glass-panel rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
              {history.map((record) => {
                const cert = certificates.find(c => c.certificateId === record.certificateId);
                const isDeleting = deleteLoadingId === record.id;
                return (
                  <div 
                    key={record.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 font-black font-display text-lg flex items-center justify-center shrink-0 border border-indigo-100">
                        {record.estimatedScore}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-extrabold text-sm text-slate-900">
                            {record.userName}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                            Cohort: {record.ageGroup}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {record.performanceLevel}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(record.completedAt).toLocaleDateString()}
                          </span>
                          <span>•</span>
                          <span>Accuracy: {Math.round((record.correctAnswers / record.totalQuestions) * 100)}%</span>
                          <span>•</span>
                          <span className="font-mono text-slate-500">{record.certificateId}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {cert && (
                        <button
                          onClick={() => onViewCertificateModal(cert)}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Award className="w-3.5 h-3.5 text-amber-500" />
                          <span>Certificate</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteRecord(record.id, record.certificateId)}
                        disabled={isDeleting}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete this record"
                      >
                        {isDeleting ? <Loader2 className="w-4 h-4 animate-spin text-rose-500" /> : <Trash2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Earned Certificates Grid */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <span>Verifiable Certificates ({certificates.length})</span>
            </h2>

            {certificates.length === 0 ? (
              <div className="text-center py-10 rounded-2xl border-2 border-dashed border-slate-200 text-slate-500 text-xs">
                No certificate generated yet. Complete an assessment to unlock your official credential.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificates.map(cert => (
                  <div
                    key={cert.certificateId}
                    className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-400/60 shadow-xs hover:shadow-md transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          {cert.certificateId}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {new Date(cert.issueDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-slate-900">
                        {cert.userName} — IQ {cert.estimatedScore}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {cert.performanceLevel} ({cert.percentile}th percentile)
                      </div>
                    </div>

                    <button
                      onClick={() => onViewCertificateModal(cert)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-amber-50 hover:text-amber-900 hover:border-amber-300 border border-transparent transition-all cursor-pointer"
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-3xl glass-card border border-slate-200 max-w-lg mx-auto">
          <Award className="w-16 h-16 text-indigo-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900">No Assessment History Found</h3>
          <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto">
            Take your first age-adaptive cognitive assessment to discover your estimated IQ score and receive a verifiable certificate.
          </p>
          <button
            onClick={onStartAssessment}
            className="mt-6 px-6 py-3 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all cursor-pointer"
          >
            Start Assessment Now
          </button>
        </div>
      )}
    </div>
  );
};
