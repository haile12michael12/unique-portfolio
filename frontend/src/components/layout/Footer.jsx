import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Github,
  Linkedin,
  Twitter,
  ArrowUpRight,
  Mail,
  Heart,
} from "lucide-react";
import Logo from "@/components/ui/Logo";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Services", to: "/services" },
  { label: "Experience", to: "/about#experience" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "#",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    href: "#",
    icon: Twitter,
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/40 bg-background">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/10 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <div className="flex items-center gap-3">
              <Logo size={32} />
              <h2 className="font-syne text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Hailemichael Assefa
              </h2>
            </div>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Building modern digital experiences, scalable systems, and
              premium software products with performance-focused engineering.
            </p>

            {/* Availability */}
            <div className="inline-flex items-center gap-3 rounded-full border border-border/50 bg-card/40 backdrop-blur-sm px-4 py-2">
              <div className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </div>

              <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                Available for select projects
              </span>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <h3 className="font-syne text-lg font-semibold text-foreground">
              Navigation
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {footerLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="group flex items-center gap-2 text-sm text-muted-foreground transition-all hover:text-primary"
                >
                  <span>{item.label}</span>

                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Contact + Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-5"
          >
            <h3 className="font-syne text-lg font-semibold text-foreground">
              Connect
            </h3>

            <a
              href="mailto:hello@example.com"
              className="group inline-flex items-center gap-3 rounded-2xl border border-border/40 bg-card/40 px-5 py-4 transition-all duration-300 hover:border-primary/40 hover:bg-primary/5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Mail className="h-4 w-4" />
              </div>

              <div>
                <div className="text-sm font-medium text-foreground">
                  Start a project
                </div>
                <div className="text-xs text-muted-foreground">
                  hello@example.com
                </div>
              </div>
            </a>

            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <motion.a
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    key={social.name}
                    href={social.href}
                    className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-border/40 bg-card/40 text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                  >
                    <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Bottom Section */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground/70">
              © 2026 Hailemichael Assefa — Crafted with precision
            </p>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Designed & Developed with</span>

              <Heart className="h-3.5 w-3.5 fill-current text-red-500" />

              <span>using React + Tailwind</span>
            </div>
          </div>

          {/* System Status */}
          <div className="flex items-center gap-3 rounded-full border border-border/40 bg-card/40 px-4 py-2 backdrop-blur-sm">
            <div className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </div>

            <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-emerald-400">
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}