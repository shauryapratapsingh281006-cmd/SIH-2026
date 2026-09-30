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

export default function App() {
  return (
    <AlertProvider>
      <div className="relative min-h-screen bg-[#050812] text-[#E8ECF5] selection:bg-blue-600 selection:text-white">
        {/* Dynamic Emergency Background Atmosphere (Vignette & Glow on Critical Threat) */}
        <EmergencyAtmosphere />

        {/* Floating Emergency Alert Pop-Up / Bottom Sheet */}
        <EmergencyAlert />

        {/* Global Navigation with Live Alert Bell Badge */}
        <Navbar />

        <main>
          <Hero />
          <HowItWorks />
          <LiveRiskDashboard />
          <RedZoneMap />
          <ExploreGrid />
          <CoordinationPreview />
          <AuthGateway />
        </main>

        <Footer />

        {/* Active Alert Center Slide-Over Drawer */}
        <AlertCenter />

        {/* Verified Evacuation Directive Intelligence Dialog */}
        <EvacuationInfoModal />

        {/* Real-time Risk Engine Diagnostic & Simulation Control Toolbar */}
        <EmergencySimToolbar />
      </div>
    </AlertProvider>
  );
}
