import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Page and component imports
import Builder from './components/Builder';
import CoverLetterBuilder from './components/CoverLetterBuilder';
import Dashboard from './components/Dashboard';
import Pricing from './components/Pricing';
import CareerBlog from './pages/CareerBlog';
import ResumeWritingGuide from './pages/ResumeWritingGuide';
import InterviewPreparation from './pages/InterviewPreparation';
import CareerCoaching from './pages/CareerCoaching';
import ATSResumeChecker from './pages/ATSResumeChecker';
import IndustryGuides from './pages/IndustryGuides';
import SalaryNegotiation from './pages/SalaryNegotiation';
import HelpCenter from './pages/HelpCenter';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfServices from './pages/TermsOfServices';
import AboutUs from './pages/AboutUs';
import ContactSupport from './pages/Contact Support';
import RefundPolicy from './pages/RefundPolicy';
import Login from './components/Login';
import Home from './components/Home';
import Footer from './components/Footer';

// Newly created pages
import Profile from './components/Profile';
import Settings from './components/Settings';
import Account from './components/Account';
import Notifications from './components/Notifications';
import Help from './components/Help';
import Register from './components/Register';

// CSS imports for each page/component
import './styles/Profile.css';
import './styles/Settings.css';
import './styles/Account.css';
import './styles/Notifications.css';
import './styles/Help.css';
import { UserProvider } from './context/UserContext';

function AppContent() {
  const location = useLocation();

  // List of dropdown routes where you want to hide the footer
  const hideFooterRoutes = [
    '/profile',
    '/settings',
    '/account',
    '/notifications',
    '/help'
  ];

  const shouldShowFooter =
    !hideFooterRoutes.includes(location.pathname) &&
    location.pathname !== '/login' &&
    location.pathname !== '/register';

  return (
    <>
      {/* Page content */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/cover-letter" element={<CoverLetterBuilder />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/blog" element={<CareerBlog />} />
        <Route path="/resume-tips" element={<ResumeWritingGuide />} />
        <Route path="/interview-tips" element={<InterviewPreparation />} />
        <Route path="/career-coaching" element={<CareerCoaching />} />
        <Route path="/ats-resume-checker" element={<ATSResumeChecker />} />
        <Route path="/industry-guides" element={<IndustryGuides />} />
        <Route path="/salary-negotiation" element={<SalaryNegotiation />} />
        <Route path="/ats-checker" element={<ATSResumeChecker />} />
        <Route path="/salary-guide" element={<SalaryNegotiation />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfServices />} />
        <Route path="/terms" element={<TermsOfServices />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact-support" element={<ContactSupport />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/refund" element={<RefundPolicy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/account" element={<Account />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/help" element={<Help />} />
        {/* Add other routes as needed */}
      </Routes>
      {shouldShowFooter && <Footer />}
    </>
  );
}


export default function App(): JSX.Element {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}
