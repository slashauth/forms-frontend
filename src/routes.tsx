import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavigationProvider } from './providers/navigation-provider';
import { SlashAuthLoadedWrapper } from './common/components/slashauth-loader-wrapper';
import Home from './pages/home';
import { EventsPage } from './pages/events';
import { ContactPage } from './pages/contact';
import { AdminPage } from './pages/admin';
// import Home from './pages/AppList';
// import { CreateApp } from './pages/CreateApp';
// import { SingleAppPage } from './pages/SingleApp';

export const SlashAuthRoutes = () => {
  return (
    <Router>
      <NavigationProvider>
        <SlashAuthLoadedWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
            {/* <Route path="/create" element={<CreateApp />} />
            <Route path="/app/:appID/*" element={<SingleAppPage />} />
            <Route path="/" element={<Home />} /> */}
          </Routes>
        </SlashAuthLoadedWrapper>
      </NavigationProvider>
    </Router>
  );
};
