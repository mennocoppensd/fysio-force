import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Team from './pages/Team';
import Services from './components/Services';
import Values from './components/Values';
import About from './pages/About';
import Contact from './pages/Contact';
import './styles/App.css';
import ScrollToTop from './components/ScrollToTop';
import './i18n';
import FAQ from './pages/FAQ';
import Rates from './pages/Rates';

const LOADER_DURATION_MS = 2000;
const LOADER_PROGRESS_TICK_MS = 80;

function App() {
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    setLoadProgress(0);
    const steps = Math.ceil(LOADER_DURATION_MS / LOADER_PROGRESS_TICK_MS);
    let step = 0;
    const intervalId = window.setInterval(() => {
      step += 1;
      const next = Math.min(100, (step / steps) * 100);
      setLoadProgress(next);
      if (step >= steps) {
        window.clearInterval(intervalId);
        setLoadProgress(100);
        setLoading(false);
      }
    }, LOADER_PROGRESS_TICK_MS);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="app">
      <Navbar />
      <ScrollToTop />
      {loading ? (
        <Loader progress={loadProgress} />
      ) : (
        <main>
          <section id="home"><Home /></section>
          <section id="about"><About /></section>
          <section id="team"><Team /></section>
          <section id="values"><Values /></section>
          <section id="services"><Services /></section>
          <section id="rates"><Rates /></section>
          <section id="contact"><Contact /></section>
          <section id="faq"><FAQ /></section>
        </main>
      )}
    </div>
  );
}

export default App; 