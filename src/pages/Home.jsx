import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from '../components/portfolio/Navigation';
import HeroSection from '../components/portfolio/HeroSection';
import ProjectsArchive from '../components/portfolio/ProjectsArchive';
import CaseStudySection from '../components/portfolio/CaseStudySection';
import ArchitectureDiagram from '../components/portfolio/ArchitectureDiagram';
import CaseStudy from '../components/portfolio/CaseStudy';
import TerminalContact from '../components/portfolio/TerminalContact';
import SkillGraph from '../components/portfolio/SkillGraph';
import SystemMonolith from '../components/portfolio/SystemMonolith';
import LocalImpact from '../components/portfolio/LocalImpact';
import GitHubDeep from '../components/portfolio/GitHubDeep';
import SupportButton from '../components/portfolio/SupportButton';
import PortfolioChat from '../components/portfolio/PortfolioChat';
import ExportPDF from '../components/portfolio/ExportPDF';
import SystemSimulation from '../components/portfolio/SystemSimulation';
import CloneMyBrain from '../components/portfolio/CloneMyBrain';
import BlogSection from '../components/portfolio/BlogSection';
import ArchCaseStudies from '../components/portfolio/ArchCaseStudies';
import PerformanceMetrics from '../components/portfolio/PerformanceMetrics';
import BuildInPublic from '../components/portfolio/BuildInPublic';
import ExploreCodebase from '../components/portfolio/ExploreCodebase';
import NewsletterSection from '../components/portfolio/NewsletterSection';
import Footer from '../components/portfolio/Footer';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Navigation />
      <SystemMonolith />

      <main className="xl:pr-10">
        <HeroSection />
        <ProjectsArchive onSelectProject={setSelectedProject} />
        <CaseStudySection />
        <ArchitectureDiagram />
        <CloneMyBrain />
        <SystemSimulation />
        <GitHubDeep />
        <LocalImpact />
        <SkillGraph />
        <ExploreCodebase />
        <ArchCaseStudies />
        <PerformanceMetrics />
        <BuildInPublic />
        <BlogSection />
        <TerminalContact />
        <NewsletterSection />
      </main>

      <Footer />
      <SupportButton />
      <PortfolioChat />
      <ExportPDF />

      {/* Case Study Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudy
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}