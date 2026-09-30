import { useState } from 'react';
import { AlertProvider } from './context/AlertContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import LiveRiskDashboard from './components/LiveRiskDashboard';
import RedZoneMap from './components/RedZoneMap';
import ExploreGrid from './components/ExploreGrid';
import CoordinationPreview from './components/CoordinationPreview';
import AuthGateway from './components/AuthGateway';
import Footer from './components/Footer';
import EmergencyAlert from './components/EmergencyAlert';
import EmergencyAtmosphere from './components/EmergencyAtmosphere';
import AlertCenter from './components/AlertCenter';
import EvacuationInfoModal from './components/EvacuationInfoModal';
import EmergencySimToolbar from './components/EmergencySimToolbar';
import IndividualDashboard from './components/IndividualDashboard';
import NGODashboard from './components/NGODashboard';

export default function App() {
  const [session, setSession] = useState(null);

  const handleLogin = (role) => {
    setSession(role);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleLogout = () => {
    setSession(null);
    window.setTimeout(() => {
      document.getElementById('auth')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <AlertProvider>
      <div className="relative min-h-screen bg-[#050812] text-[#E8ECF5] selection:bg-blue-600 selection:text-white">
        {!session ? (
          <>
            <EmergencyAtmosphere />
            <EmergencyAlert />
            <Navbar />
            <main>
              <Hero />
              <HowItWorks />
              <LiveRiskDashboard />
              <RedZoneMap />
              <ExploreGrid />
              <CoordinationPreview />
              <AuthGateway onLogin={handleLogin} />
            </main>
            <Footer />
            <AlertCenter />
            <EvacuationInfoModal />
            <EmergencySimToolbar />
          </>
        ) : session === 'individual' ? (
          <IndividualDashboard onLogout={handleLogout} />
        ) : (
          <NGODashboard onLogout={handleLogout} />
        )}
      </div>
    </AlertProvider>
  );
}
