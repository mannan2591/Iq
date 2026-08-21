import React, { useState, useEffect } from 'react';
import { 
  UserAssessmentProfile, 
  AssessmentResult, 
  CertificateData 
} from './types';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { UserInfoModal } from './components/UserInfoModal';
import { TestInterface } from './components/TestInterface';
import { AnalysisLoader } from './components/AnalysisLoader';
import { ResultsView } from './components/ResultsView';
import { CertificateModal } from './components/CertificateModal';
import { VerifyCertificate } from './components/VerifyCertificate';
import { DailyChallenge } from './components/DailyChallenge';
import { Leaderboard } from './components/Leaderboard';
import { UserDashboard } from './components/UserDashboard';
import { HowItWorksView } from './components/HowItWorksView';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { CertificateService } from './services/certificateService';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState<boolean>(false);
  const [currentProfile, setCurrentProfile] = useState<UserAssessmentProfile | null>(null);
  const [currentResult, setCurrentResult] = useState<AssessmentResult | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateData | null>(null);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState<boolean>(false);
  const [verifyInitialId, setVerifyInitialId] = useState<string>('');
  const [dailyStreak, setDailyStreak] = useState<number>(() => CertificateService.getDailyStreak().currentStreak);

  // Hash-based routing listener (e.g. for #verify/IQM-2026-A82F91 or #daily)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('verify/')) {
        const certId = hash.replace('verify/', '');
        setVerifyInitialId(certId);
        setActiveTab('verify');
      } else if (hash === 'verify') {
        setActiveTab('verify');
      } else if (hash === 'daily') {
        setActiveTab('daily');
      } else if (hash === 'leaderboard') {
        setActiveTab('leaderboard');
      } else if (hash === 'how-it-works') {
        setActiveTab('how-it-works');
      } else if (hash === 'dashboard') {
        setActiveTab('dashboard');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleStartAssessmentClick = () => {
    setIsUserInfoModalOpen(true);
  };

  const handleLaunchTest = (profile: UserAssessmentProfile) => {
    setCurrentProfile(profile);
    setIsUserInfoModalOpen(false);
    setActiveTab('test');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTestFinished = (result: AssessmentResult) => {
    setCurrentResult(result);
    // Persist result and generate certificate data locally
    const cert = CertificateService.saveAssessmentResult(result);
    setSelectedCertificate(cert);

    setActiveTab('analysis');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalysisCompleted = () => {
    setActiveTab('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCertificateModal = (cert?: CertificateData) => {
    if (cert) {
      setSelectedCertificate(cert);
    } else if (currentResult) {
      const all = CertificateService.getAllCertificates();
      const match = all.find(c => c.certificateId === currentResult.certificateId);
      if (match) setSelectedCertificate(match);
    }
    setIsCertificateModalOpen(true);
  };

  const handleRetake = () => {
    setCurrentResult(null);
    setIsUserInfoModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-mesh-light text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        streakCount={dailyStreak}
        onStartTest={handleStartAssessmentClick}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1 w-full">
        {/* 1. Landing Home View */}
        {activeTab === 'home' && (
          <LandingHero
            onStartAssessment={handleStartAssessmentClick}
            onHowItWorksClick={() => {
              setActiveTab('how-it-works');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreCategories={() => {
              setActiveTab('how-it-works');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* 2. Active Test Session View */}
        {activeTab === 'test' && currentProfile && (
          <TestInterface
            profile={currentProfile}
            onFinishTest={handleTestFinished}
            onAbortTest={() => {
              if (confirm('Are you sure you want to exit the assessment? Your progress will be discarded.')) {
                setActiveTab('home');
              }
            }}
          />
        )}

        {/* 3. Analysis Computing Transition */}
        {activeTab === 'analysis' && (
          <AnalysisLoader onComplete={handleAnalysisCompleted} />
        )}

        {/* 4. Results & Cognitive Profile View */}
        {activeTab === 'results' && currentResult && (
          <ResultsView
            result={currentResult}
            onOpenCertificate={() => handleOpenCertificateModal()}
            onRetake={handleRetake}
            onViewLeaderboard={() => {
              setActiveTab('leaderboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* 5. Daily Challenge View */}
        {activeTab === 'daily' && (
          <DailyChallenge
            onStreakUpdate={(newStreak) => setDailyStreak(newStreak)}
            onTakeFullAssessment={handleStartAssessmentClick}
          />
        )}

        {/* 6. Verify Certificate Public Page */}
        {activeTab === 'verify' && (
          <VerifyCertificate
            initialId={verifyInitialId}
            onViewCertificateModal={(cert) => {
              setSelectedCertificate(cert);
              setIsCertificateModalOpen(true);
            }}
          />
        )}

        {/* 7. Leaderboard View */}
        {activeTab === 'leaderboard' && (
          <Leaderboard onStartAssessment={handleStartAssessmentClick} />
        )}

        {/* 8. User Dashboard / Past Assessments */}
        {activeTab === 'dashboard' && (
          <UserDashboard
            onStartAssessment={handleStartAssessmentClick}
            onViewCertificateModal={(cert) => {
              setSelectedCertificate(cert);
              setIsCertificateModalOpen(true);
            }}
          />
        )}

        {/* 9. How It Works & Framework Documentation */}
        {activeTab === 'how-it-works' && (
          <HowItWorksView onStartAssessment={handleStartAssessmentClick} />
        )}

        {/* 10. Admin Question Bank Manager */}
        {activeTab === 'admin' && (
          <AdminPanel onBackToApp={() => setActiveTab('home')} />
        )}
      </main>

      {/* User Information & Age Setup Modal */}
      <UserInfoModal
        isOpen={isUserInfoModalOpen}
        onClose={() => setIsUserInfoModalOpen(false)}
        onStartTest={handleLaunchTest}
      />

      {/* Verified Certificate Modal */}
      {selectedCertificate && (
        <CertificateModal
          isOpen={isCertificateModalOpen}
          onClose={() => setIsCertificateModalOpen(false)}
          certificate={selectedCertificate}
        />
      )}

      {/* Global Footer */}
      <Footer
        onNavClick={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onStartAssessment={handleStartAssessmentClick}
      />
    </div>
  );
}

