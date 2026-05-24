import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from '@/components/layout/Navigation';
import HeroSection from '@/components/layout/HeroSection';
import ProjectsArchive from '@/pages/Projects';
import CaseStudySection from '@/components/sections/CaseStudySection';
import ArchitectureDiagram from '@/components/sections/ArchitectureDiagram';
import CaseStudy from '@/components/sections/CaseStudy';
import TerminalContact from '@/pages/Contact';
import SkillGraph from '@/components/sections/SkillGraph';
import SystemMonolith from '@/components/sections/SystemMonolith';
import LocalImpact from '@/components/sections/LocalImpact';
import GitHubDeep from '@/components/sections/GitHubDeep';
import { GitHubStats } from '@/components/sections/GitHubStats';
import SupportButton from '@/components/sections/SupportButton';
import PortfolioChat from '@/components/sections/PortfolioChat';
import ExportPDF from '@/components/sections/ExportPDF';
import SystemSimulation from '@/components/sections/SystemSimulation';
import { TerminalSimulation } from '@/components/sections/TerminalSimulation';
import { Globe3D } from '@/components/sections/Globe3D';
import CloneMyBrain from '@/components/sections/CloneMyBrain';
import BlogSection from '@/pages/Blog';
import ArchCaseStudies from '@/pages/CaseStudies';
import PerformanceMetrics from '@/components/sections/PerformanceMetrics';
import BuildInPublic from '@/components/sections/BuildInPublic';
import ExploreCodebase from '@/components/sections/ExploreCodebase';
import NewsletterSection from '@/components/sections/NewsletterSection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Navigation />
      <SystemMonolith />

      <main className="xl:pr-10">
        <HeroSection />
        
        {/* Interactive Globe Section */}
        <section className="py-20 flex flex-col items-center justify-center overflow-hidden border-t border-border/30">
          <div className="text-center mb-10">
            <h2 className="font-syne text-3xl md:text-5xl font-extrabold tracking-tight">GLOBAL INFRASTRUCTURE</h2>
            <p className="font-mono text-sm text-muted-foreground mt-2 uppercase tracking-widest">Distributed nodes & Edge presence</p>
          </div>
          <Globe3D />
        </section>

        <ProjectsArchive onSelectProject={setSelectedProject} />
        <CaseStudySection />
        <ArchitectureDiagram />
        
        {/* Terminal Deployment Simulation */}
        <section className="py-24 max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-syne text-4xl font-extrabold mb-6">AUTOMATED<br /><span className="text-primary">DEPLOYMENT</span></h2>
              <p className="text-muted-foreground font-mono text-sm leading-relaxed mb-8">
                Witness the lifecycle of a production deployment. From Raft consensus optimization to Docker buildx multi-arch pushes and Kubernetes rollout status monitoring.
              </p>
              <div className="space-y-4">
                {['CI/CD Pipeline', 'Container Orchestration', 'Multi-region Failover'].map(item => (
                  <div key={item} className="flex items-center gap-3 font-mono text-xs text-primary">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <TerminalSimulation />
          </div>
        </section>

        <CloneMyBrain />
        <SystemSimulation />
        <GitHubDeep />
        <GitHubStats />
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