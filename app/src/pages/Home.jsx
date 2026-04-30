import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Consultori from '../components/sections/Consultori';
import Team from '../components/sections/Team';
import Locations from '../components/sections/Locations';
import Testimonials from '../components/sections/Testimonials';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Consultori />
      <Team />
      <Locations />
      <Testimonials />
      <Contact />
    </main>
  );
}
