import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

const EDUCATION = [
  {
    institution: 'Stanford University',
    degree: 'B.S. in Computer Science',
    period: '2012 — 2016',
    specialization: 'Distributed Systems & Security',
    highlights: [
      'Research assistant at the Stanford Secure Computer Systems Group',
      'Deans List: 2013, 2014, 2015',
      'President of the Stanford Open Source Society'
    ]
  }
];

const CERTIFICATIONS = [
  {
    name: 'AWS Certified Solutions Architect – Professional',
    issuer: 'Amazon Web Services',
    date: '2023',
    id: 'AWS-PSA-12345'
  },
  {
    name: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'Cloud Native Computing Foundation',
    date: '2022',
    id: 'CKA-987654'
  },
  {
    name: 'Google Cloud Professional Cloud Architect',
    issuer: 'Google Cloud',
    date: '2021',
    id: 'GCP-PCA-45678'
  }
];

export default function Education() {
  return (
    <section id="education" className="py-24 border-t border-border/30 bg-muted/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Education */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-12"
            >
              <div className="w-8 h-px bg-primary" />
              <span className="font-mono text-[11px] text-primary tracking-[0.15em] uppercase">
                Academic Background — Education
              </span>
            </motion.div>

            <div className="space-y-10">
              {EDUCATION.map((edu, i) => (
                <motion.div
                  key={edu.institution}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <div className="font-mono text-xs text-primary uppercase tracking-widest">{edu.period}</div>
                    <h3 className="font-syne text-2xl font-bold">{edu.institution}</h3>
                    <div className="flex items-center gap-2 text-sm text-foreground/80 font-mono">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      {edu.degree}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground font-mono italic mb-4">
                    Specialization: {edu.specialization}
                  </div>
                  <ul className="space-y-2">
                    {edu.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <BookOpen className="w-3.5 h-3.5 mt-0.5 text-primary/40 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-12"
            >
              <div className="w-8 h-px bg-primary" />
              <span className="font-mono text-[11px] text-primary tracking-[0.15em] uppercase">
                Professional Credentials — Certs
              </span>
            </motion.div>

            <div className="grid sm:grid-cols-1 gap-4">
              {CERTIFICATIONS.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-5 border border-border/40 bg-card/40 backdrop-blur-sm group hover:border-primary/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-primary/5 border border-primary/20 rounded-lg group-hover:bg-primary/10 transition-colors">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">{cert.date}</span>
                  </div>
                  <h4 className="font-syne font-bold text-lg mb-1 group-hover:text-primary transition-colors">{cert.name}</h4>
                  <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest">{cert.issuer}</div>
                  <div className="mt-4 text-[9px] font-mono text-muted-foreground/40 uppercase tracking-widest">ID: {cert.id}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
