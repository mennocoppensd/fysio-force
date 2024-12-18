import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Team from './pages/Team';
import Services from './components/Services';
import Values from './components/Values';
import About from './pages/About';
import Contact from './pages/Contact';
import ThemeToggle from './components/ThemeToggle';
import './styles/App.css';
import ScrollToTop from './components/ScrollToTop';
import './i18n';
import FAQ from './pages/FAQ';

function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark-mode');
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
  };

  return (
    <div className="app">
      <Navbar />
      <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
      <ScrollToTop />
      {loading ? (
        <Loader />
      ) : (
        <>
          <main>
            <section id="home"><Home /></section>
            <section id="about"><About /></section>
            <section id="team"><Team /></section>
            <section id="values"><Values /></section>
            <section id="services"><Services /></section>
            <section id="contact"><Contact /></section>
            <section id="faq"><FAQ /></section>
          </main>
        </>
      )}
    </div>
  );
}

export default App; 