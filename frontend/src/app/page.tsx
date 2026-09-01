import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import WhyChooseUs from './components/WhyChooseUs';
import ProjectsSection from './components/ProjectsSection';
import TeamSection from './components/TeamSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';
import ContactSection from './components/ContactSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Navbar />
        <Hero />
        <AboutSection />
        <ServicesSection />
        <WhyChooseUs />
        <ProjectsSection />
        <TeamSection />
        <TestimonialsSection />
        <ContactSection />
     </div>
      <Footer />
    </main>
  );
}