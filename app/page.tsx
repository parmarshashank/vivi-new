import Hero from './components/Hero';
import HOD from './components/HOD';
import Team from './components/Team';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import About from './components/About';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Hero />
      <About />
      <HOD />
      <Team />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
