import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import Loader from './components/layout/Loader';
import PageTransition from './components/layout/PageTransition';
import ScrollProgress from './components/layout/ScrollProgress';
import GrainOverlay from './components/ui/GrainOverlay';
import CustomCursor from './components/ui/CustomCursor';
import { useLenis } from './hooks/useLenis';

import Home from './routes/Home';
import Collections from './routes/Collections';
import Craft from './routes/Craft';
import Story from './routes/Story';
import Experience from './routes/Experience';
import Journal from './routes/Journal';
import Contact from './routes/Contact';

function AppInner() {
  useLenis();

  return (
    <>
      <GrainOverlay />
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <PageTransition>
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/craft"      element={<Craft />} />
          <Route path="/story"      element={<Story />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/journal"    element={<Journal />} />
          <Route path="/contact"    element={<Contact />} />
        </Routes>
      </PageTransition>
      <Footer />
    </>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <BrowserRouter>
      <Loader onDone={() => setLoaded(true)} />
      {loaded && <AppInner />}
    </BrowserRouter>
  );
}