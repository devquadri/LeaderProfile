import { useState, useEffect } from "react";
import { resumeData } from "@/data/resume";

function ThemeToggle({
  dark,
  onToggle,
}: {
  dark: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle dark mode"
      className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
    >
      {dark ? (
        <svg
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

function NavBar({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="text-sm font-semibold text-foreground tracking-tight hover:text-muted-foreground transition-colors"
        >
          mriyazuddin.com
        </a>
        <nav className="flex items-center gap-1">
          {["About", "Experience", "Skills", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
            >
              {item}
            </a>
          ))}
          <ThemeToggle dark={dark} onToggle={onToggle} />
        </nav>
      </div>
    </header>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
        {children}
      </span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

function ExperienceCard({
  job,
}: {
  job: (typeof resumeData.experience)[number];
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group relative">
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <div className="w-2 h-2 rounded-full bg-muted-foreground/40 mt-2 shrink-0" />
          <div className="flex-1 w-px bg-border mt-2" />
        </div>
        <div className="pb-10 flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-1">
            <h3 className="font-semibold text-foreground">{job.role}</h3>
            <span className="text-muted-foreground text-sm">—</span>
            <span className="text-sm font-medium text-foreground/80">
              {job.company}
            </span>
            <span className="text-xs text-muted-foreground">
              {job.location}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-3 font-mono">
            {job.period}
          </p>
          <p
            className={`text-sm text-muted-foreground leading-relaxed ${expanded ? "" : "line-clamp-3"}`}
          >
            {job.description}
          </p>
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
          {expanded && (
            <ul className="mt-4 space-y-2">
              {job.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm text-muted-foreground leading-relaxed"
                >
                  <span className="text-foreground/40 mt-0.5 shrink-0">→</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function SkillPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border hover:border-foreground/20 hover:text-foreground transition-colors">
      {label}
    </span>
  );
}

function AchievementItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
      <span className="text-foreground font-semibold mt-0.5 shrink-0 text-xs">
        ✦
      </span>
      <span>{text}</span>
    </div>
  );
}

export default function Portfolio() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const {
    tagline,
    contact,
    summary,
    expertise,
    certifications,
    technicalSkills,
    achievements,
    experience,
    education,
    languages,
  } = resumeData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar dark={dark} onToggle={() => setDark((d) => !d)} />

      {/* Hero */}
      <section id="about" className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
            <div className="mb-2">
              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                Technical Support Leader
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4 leading-tight">
              Mohammed Riyazuddin
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
              {tagline}
            </p>
          </div>
          {/* Profile photo — replace photo.jpg in client/public/ with your own image */}
          <div className="shrink-0 mt-1">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-border bg-muted shadow-sm">
              <img
                src="/photo.jpg"
                alt="Mohammed Riyazuddin"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  (e.currentTarget.nextSibling as HTMLElement).style.display =
                    "flex";
                }}
              />
              <div
                className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/60 gap-1"
                style={{ display: "none" }}
              >
                <svg
                  width="28"
                  height="28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="text-[10px] font-medium text-center px-2 leading-tight">
                  Add photo
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <svg
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Get in touch
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </div>

        {/* Quick stats */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: "13+", label: "Years of Experience" },
            { value: "120+", label: "Team Size Led" },
            { value: "83%+", label: "Engagement Score" },
            { value: "50%", label: "Onboarding Time Saved" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 rounded-xl border border-border bg-card"
            >
              <div className="text-2xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About / Summary */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-border">
        <SectionLabel>About</SectionLabel>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {summary}
        </p>
      </section>

      {/* Key Achievements */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-border">
        <SectionLabel>Key Achievements</SectionLabel>
        <div className="space-y-4">
          {achievements.map((a, i) => (
            <AchievementItem key={i} text={a} />
          ))}
        </div>
      </section>

      {/* Experience */}
      <section
        id="experience"
        className="max-w-3xl mx-auto px-6 py-12 border-t border-border"
      >
        <SectionLabel>Experience</SectionLabel>
        <div>
          {experience.map((job, i) => (
            <ExperienceCard key={i} job={job} />
          ))}
        </div>
      </section>

      {/* Skills */}
      <section
        id="skills"
        className="max-w-3xl mx-auto px-6 py-12 border-t border-border"
      >
        <SectionLabel>Skills & Expertise</SectionLabel>
        <div className="space-y-8">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Areas of Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              {expertise.map((s) => (
                <SkillPill key={s} label={s} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Technical Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {technicalSkills.map((s) => (
                <SkillPill key={s} label={s} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Certifications
            </h3>
            <div className="flex flex-wrap gap-2">
              {certifications.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-foreground/5 text-foreground border border-foreground/10"
                >
                  <svg
                    width="10"
                    height="10"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Languages
            </h3>
            <div className="flex flex-wrap gap-4">
              {languages.map((l) => (
                <div
                  key={l.language}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span className="font-medium text-foreground">
                    {l.language}
                  </span>
                  <span className="text-muted-foreground/60">·</span>
                  <span>{l.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-border">
        <SectionLabel>Education</SectionLabel>
        {education.map((edu, i) => (
          <div key={i}>
            <h3 className="font-semibold text-foreground">{edu.degree}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {edu.institution} · {edu.location}
            </p>
          </div>
        ))}
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="max-w-3xl mx-auto px-6 py-12 border-t border-border"
      >
        <SectionLabel>Contact</SectionLabel>
        <div className="space-y-3">
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span className="w-8 h-8 flex items-center justify-center rounded-lg border border-border group-hover:border-foreground/30 transition-colors bg-card">
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </span>
            {contact.email}
          </a>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-card">
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.08 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 8 8l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 23 18h-.08z" />
              </svg>
            </span>
            {contact.phone}
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-card">
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            {contact.location}
          </div>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span className="w-8 h-8 flex items-center justify-center rounded-lg border border-border group-hover:border-foreground/30 transition-colors bg-card">
              <svg
                width="14"
                height="14"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </span>
            LinkedIn Profile
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-3xl mx-auto px-6 py-8 border-t border-border">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Mohammed Riyazuddin</span>
          <span>Hyderabad, India · contact@riyaz.blog</span>
        </div>
      </footer>
    </div>
  );
}
