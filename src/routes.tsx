import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavigationProvider } from './providers/navigation-provider';
import { SlashAuthLoadedWrapper } from './common/components/slashauth-loader-wrapper';
import Home from './pages/home';

export const SlashAuthRoutes = () => {
  return (
    <Router>
      <NavigationProvider>
        <SlashAuthLoadedWrapper>
          <div className="sm:mr-0">
            <Routes>
              <Route index element={<Home />} />
              <Route path=":formID" element={<Home />} />
            </Routes>
          </div>
        </SlashAuthLoadedWrapper>
      </NavigationProvider>
    </Router>
  );
};
