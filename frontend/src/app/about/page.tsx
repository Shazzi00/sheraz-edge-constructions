import Navbar from '../components/Navbar';
import AboutSection from '../components/AboutSection';
import TeamSection from '../components/TeamSection';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-between pt-20">
      <Navbar />
      <AboutSection />
      <TeamSection />
      <Footer />
    </main>
  );
}