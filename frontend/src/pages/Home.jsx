import HeroSection from '@/components/layout/HeroSection';
import CaseStudySection from '@/components/sections/portfolio/CaseStudySection';
import ArchitectureDiagram from '@/components/sections/portfolio/ArchitectureDiagram';
import SkillGraph from '@/components/sections/portfolio/SkillGraph';
import SystemMonolith from '@/components/sections/portfolio/SystemMonolith';
import LocalImpact from '@/components/sections/portfolio/LocalImpact';
import GitHubDeep from '@/components/sections/github/GitHubDeep';
import { GitHubStats } from '@/components/sections/github/GitHubStats';
import SupportButton from '@/components/sections/support/SupportButton';
import PortfolioChat from '@/components/sections/projects/PortfolioChat';
import ExportPDF from '@/components/sections/shared/ExportPDF';
import SystemSimulation from '@/components/sections/portfolio/SystemSimulation';
import { TerminalSimulation } from '@/components/sections/portfolio/TerminalSimulation';
import { Globe3D } from '@/components/sections/portfolio/Globe3D';
import CloneMyBrain from '@/components/sections/portfolio/CloneMyBrain';
import PerformanceMetrics from '@/components/sections/portfolio/PerformanceMetrics';
import BuildInPublic from '@/components/sections/blog/BuildInPublic';
import ExploreCodebase from '@/components/sections/portfolio/ExploreCodebase';
import NewsletterSection from '@/components/sections/blog/NewsletterSection';
import Testimonials from '@/components/sections/portfolio/Testimonials';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
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
        <PerformanceMetrics />
        <BuildInPublic />
        <Testimonials />
        <NewsletterSection />
      </main>

      <Footer />
      <SupportButton />
      <PortfolioChat />
      <ExportPDF />
    </div>
  );
}
