import Hero from './components/Hero';
import HOD from './components/HOD';
import Team from './components/Team';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import About from './components/About';

const photos = {
  gallery: [
    {
      src: '/images/gallery/1.jpg',
      title: 'Waiting For The Day',
      description: 'Getting ready for the day you\'re born again. Spend some time alone.',
      date: '20/05/2024'
    },
    {
      src: '/images/gallery/2.jpg',
      title: 'Among Better Dreams',
      description: 'No use looking out. It\'s within that brings that lonely feeling.',
      date: '18/05/2024'
    },
    {
      src: '/images/gallery/3.jpg',
      title: 'Reflections',
      description: 'Understand that when you leave here, you\'ll be clear.',
      date: '15/05/2024'
    },
  ],
  photobook: [
    {
      src: '/images/photobook/1.jpg',
      title: 'My Photobook',
      description: 'A collection of moments frozen in time.',
    },
    {
      src: '/images/photobook/2.jpg',
      description: 'Streets of Paris',
    },
    {
      src: '/images/photobook/3.jpg',
      description: 'Urban Solitude',
    },
    {
      src: '/images/photobook/4.jpg',
      description: 'City Lights',
    },
  ]
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Hero />
      <About />
      <HOD />
      <Team />
      <Gallery />
      <Contact />
    </main>
  );
}
