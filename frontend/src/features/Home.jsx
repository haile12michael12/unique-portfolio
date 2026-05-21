import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from '@/features/portfolio/Navigation';
import HeroSection from '@/features/portfolio/HeroSection';
import ProjectsArchive from '@/features/portfolio/ProjectsArchive';
import CaseStudySection from '@/features/portfolio/CaseStudySection';
import ArchitectureDiagram from '@/features/portfolio/ArchitectureDiagram';
import CaseStudy from '@/features/portfolio/CaseStudy';
import TerminalContact from '@/features/portfolio/TerminalContact';
import SkillGraph from '@/features/portfolio/SkillGraph';
import SystemMonolith from '@/features/portfolio/SystemMonolith';
import LocalImpact from '@/features/portfolio/LocalImpact';
import GitHubDeep from '@/features/portfolio/GitHubDeep';
import SupportButton from '@/features/portfolio/SupportButton';
import PortfolioChat from '@/features/portfolio/PortfolioChat';
import ExportPDF from '@/features/portfolio/ExportPDF';
import SystemSimulation from '@/features/portfolio/SystemSimulation';
import CloneMyBrain from '@/features/portfolio/CloneMyBrain';
import BlogSection from '@/features/portfolio/BlogSection';
import ArchCaseStudies from '@/features/portfolio/ArchCaseStudies';
import PerformanceMetrics from '@/features/portfolio/PerformanceMetrics';
import BuildInPublic from '@/features/portfolio/BuildInPublic';
import ExploreCodebase from '@/features/portfolio/ExploreCodebase';
import NewsletterSection from '@/features/portfolio/NewsletterSection';
import Footer from '@/features/portfolio/Footer';

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