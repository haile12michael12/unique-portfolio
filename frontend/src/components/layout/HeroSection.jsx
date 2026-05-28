import { motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  Linkedin,
  Download,
  Sparkles,
} from "lucide-react";

import HeroSignalAnimation from "@/components/animations/HeroSignalAnimation";
import ActivityPulse from "@/components/sections/shared/ActivityPulse";
import heroImage from "@/assets/hero.png";

export default function HeroSection() {
  const scrollToProjects = () => {
    document
      .getElementById("archive")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
    >
      {/* Background Effects */}
      <ActivityPulse />
      <HeroSignalAnimation />

      {/* Gradient Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/10 blur-3xl rounded-full" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent/10 blur-3xl rounded-full" />

      {/* Hero Image */}
      <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block opacity-20 pointer-events-none">
        <img
          src={heroImage}
          alt="Software Architecture"
          className="w-full h-full object-cover grayscale"
        />

        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/80 to-background" />
      </div>

      {/* Grid Lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[20, 40, 60, 80].map((p) => (
          <div
            key={p}
            className="absolute top-0 bottom-0 w-px bg-border/20"
            style={{ left: `${p}%` }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 py-32 w-full">
        {/* Top Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <div className="w-10 h-px bg-primary" />

          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-primary">
            Full Stack Software Engineer — Ethiopia
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-6xl"
        >
          <h1 className="font-syne text-5xl sm:text-7xl md:text-8xl lg:text-[120px] font-extrabold leading-[0.85] tracking-[-0.05em] text-foreground">
            Hailemichael
            <br />

            <span className="text-primary">Assefa</span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 max-w-3xl"
        >
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
            Full Stack Software Developer specializing in scalable web
            applications, DevOps automation, microservices architecture, and
            modern cloud-ready systems using React, Node.js, Laravel, Django,
            PostgreSQL, Docker, and CI/CD pipelines.
          </p>
        </motion.div>

        {/* Tech Stack Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          {[
            "React",
            "Node.js",
            "Laravel",
            "Docker",
            "PostgreSQL",
            "Microservices",
            "CI/CD",
            "TailwindCSS",
            "MongoDB",
            "REST APIs",
          ].map((tech) => (
            <div
              key={tech}
              className="px-4 py-2 rounded-full border border-border/40 bg-card/40 backdrop-blur-sm text-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-all duration-300"
            >
              {tech}
            </div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            {
              label: "Years Experience",
              value: "3+",
            },
            {
              label: "Projects Built",
              value: "20+",
            },
            {
              label: "Tech Stack",
              value: "15+",
            },
            {
              label: "CI/CD Deployments",
              value: "30+",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="border border-border/30 bg-card/30 backdrop-blur-sm rounded-2xl p-5"
            >
              <div className="font-mono text-3xl font-bold text-primary">
                {item.value}
              </div>

              <div className="mt-2 text-sm text-muted-foreground">
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-14 flex flex-wrap items-center gap-5"
        >
          <button
            onClick={scrollToProjects}
            className="group inline-flex items-center gap-3 rounded-2xl bg-primary px-7 py-4 text-sm font-medium text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20"
          >
            View Projects

            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <a
            href="/resume.pdf"
            className="inline-flex items-center gap-3 rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm px-7 py-4 text-sm text-foreground hover:border-primary/40 hover:text-primary transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-12 flex items-center gap-4"
        >
          {[
            {
              icon: Github,
              href: "#",
            },
            {
              icon: Linkedin,
              href: "#",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <a
                key={index}
                href={item.href}
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/40 bg-card/40 text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}

          <div className="flex items-center gap-2 ml-4">
            <Sparkles className="w-4 h-4 text-primary" />

            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
              Available for freelance & remote opportunities
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-10 left-6 md:left-10 right-6 md:right-10 h-px bg-gradient-to-r from-primary/40 via-border to-transparent origin-left"
      />
    </section>
  );
}