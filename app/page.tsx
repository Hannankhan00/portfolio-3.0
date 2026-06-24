'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DarkVeil from './components/DarkVeil';
import Header from './components/Header';
import ClickSpark from './components/ClickSpark';
import ProfileCard from './components/ProfileCard';

export default function Home() {

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // --- MAGNETIC BUTTON EFFECT ---
    const magneticBtns = document.querySelectorAll<HTMLElement>('.btn');
    const magneticStrength = 0.38;

    const magneticHandlers: Array<{
      el: HTMLElement;
      move: (e: MouseEvent) => void;
      leave: () => void;
    }> = [];

    magneticBtns.forEach(btn => {
      const onMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * magneticStrength;
        const dy = (e.clientY - cy) * magneticStrength;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      };

      const onLeave = () => {
        btn.style.transform = 'translate(0, 0)';
      };

      btn.addEventListener('mousemove', onMove);
      btn.addEventListener('mouseleave', onLeave);
      magneticHandlers.push({ el: btn, move: onMove, leave: onLeave });
    });

    return () => {
      magneticHandlers.forEach(({ el, move, leave }) => {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  useEffect(() => {
    // --- GSAP ANIMATIONS LOGIC ---
    // Wrap in gsap.context to ensure correct cleanup on unmount
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Hero entrance sequence
        const heroTimeline = gsap.timeline({
          defaults: {
            duration: 1.2,
            ease: 'power3.out'
          }
        });

        heroTimeline.fromTo('#hero-name',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0 }
        );

        heroTimeline.fromTo('#hero-subtitle',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0 },
          '-=1.0'
        );

        heroTimeline.fromTo('#hero-actions',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0 },
          '-=0.8'
        );

        // Skills section stagger
        gsap.fromTo('.skill-tag',
          {
            opacity: 0,
            y: 35,
            scale: 0.85
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#skills',
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );

        // Selected Work alternating slide-in
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
          const isLeft = card.classList.contains('animate-left');

          gsap.fromTo(card,
            {
              opacity: 0,
              x: isLeft ? -80 : 80
            },
            {
              opacity: 1,
              x: 0,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
              }
            }
          );
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <ClickSpark
      sparkColor="#c084fc"
      sparkSize={14}
      sparkRadius={28}
      sparkCount={10}
      duration={450}
      easing="ease-out"
      extraScale={1.1}
    >
      {/* DarkVeil — Fixed full-screen WebGL background */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      >
        <DarkVeil
          hueShift={0}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
          resolutionScale={1}
        />
      </div>

      {/* Animated Grain Overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Morphing Hamburger Header */}
      <Header />

      <main>
        {/* Hero Section */}
        <section id="hero" className="hero">
          <div className="hero-content">
            <h1 className="hero-name" id="hero-name">Khadija Mansoor</h1>
            <p className="hero-subtitle" id="hero-subtitle">
              Full Stack Developer · Building end-to-end digital products that are fast, scalable, and beautifully crafted
            </p>
            <div className="hero-actions" id="hero-actions">
              <a href="#projects" className="btn btn-outline">View My Work</a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section">
          <div className="section-container about-container">
            {/* Left — text */}
            <div className="about-text">
              <h2 className="section-title">About Me</h2>
              <p className="about-body">
                Hey! I&apos;m <strong>Khadija Mansoor</strong> a Full Stack Developer based in
                Pakistan with a passion for building beautiful, high-performance digital
                experiences from the ground up.
              </p>
              <p className="about-body">
                I specialize in the modern JavaScript ecosystem. React, Next.js, Node.js
                and care deeply about clean code, thoughtful UX, and pixel-perfect design.
                Whether it&apos;s a sleek marketing site or a complex web application, I bring
                the same level of craft and attention to every project.
              </p>
              <p className="about-body">
                When I&apos;m not coding, you&apos;ll find me exploring new design trends,
                tinkering with creative tech, or hunting for the perfect cup of chai.
              </p>
              <div className="about-stats">
                <div className="about-stat">
                  <span className="about-stat-num">2+</span>
                  <span className="about-stat-label">Years experience</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-num">15+</span>
                  <span className="about-stat-label">Projects shipped</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-num">10+</span>
                  <span className="about-stat-label">Technologies</span>
                </div>
              </div>
            </div>

            {/* Right — ProfileCard */}
            <div className="about-card">
              <ProfileCard
                name="Khadija Mansoor"
                title="Full Stack Developer"
                handle="khadijamansoor"
                status="Open to work ✦"
                contactText="Hire Me"
                avatarUrl="/assets/khadija.jpg"
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={false}
                behindGlowEnabled={true}
                behindGlowColor="rgba(168, 85, 247, 0.5)"
                innerGradient="linear-gradient(145deg, #2d1b4e 0%, #1a1035 50%, #0f0a1e 100%)"
                onContactClick={() => {
                  document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills-section">
          <div className="section-container">
            <h2 className="section-title">What I Work With</h2>
            <div className="skills-grid" id="skills-grid">
              <span className="skill-tag">HTML</span>
              <span className="skill-tag">CSS</span>
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag">React.js</span>
              <span className="skill-tag">Next.js</span>
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">Tailwind CSS</span>
              <span className="skill-tag">Git</span>
              <span className="skill-tag">Figma</span>
              <span className="skill-tag">WordPress</span>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects-section">
          <div className="section-container">
            <h2 className="section-title">Selected Work</h2>
            <div className="projects-grid" id="projects-grid">
              {/* Project 1 */}
              <article className="project-card animate-left">
                <div className="project-info">
                  <span className="project-num">01 /</span>
                  <h3 className="project-name">Portfolio Website</h3>
                  <p className="project-desc">Personal portfolio built with Next.js and Tailwind CSS.</p>
                  <div className="project-stack">
                    <span className="stack-tag">Next.js</span>
                    <span className="stack-tag">Tailwind</span>
                  </div>
                </div>
                <a href="#" className="project-link">
                  View Project <span className="arrow">→</span>
                </a>
              </article>

              {/* Project 2 */}
              <article className="project-card animate-right">
                <div className="project-info">
                  <span className="project-num">02 /</span>
                  <h3 className="project-name">E-Commerce UI</h3>
                  <p className="project-desc">A clean shopping frontend with cart and product filtering.</p>
                  <div className="project-stack">
                    <span className="stack-tag">React</span>
                    <span className="stack-tag">CSS</span>
                  </div>
                </div>
                <a href="#" className="project-link">
                  View Project <span className="arrow">→</span>
                </a>
              </article>

              {/* Project 3 */}
              <article className="project-card animate-left">
                <div className="project-info">
                  <span className="project-num">03 /</span>
                  <h3 className="project-name">Blog Platform</h3>
                  <p className="project-desc">Minimal blog with markdown support and dark mode.</p>
                  <div className="project-stack">
                    <span className="stack-tag">Next.js</span>
                    <span className="stack-tag">MDX</span>
                  </div>
                </div>
                <a href="#" className="project-link">
                  View Project <span className="arrow">→</span>
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <section id="connect" className="connect-section">
          <div className="section-container">
            <h2 className="section-title">Let's Connect</h2>
            <p className="connect-text">I'm open to internships, freelance projects, and collaborations.</p>

            <div className="connect-links" id="connect-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="connect-row">
                <svg className="connect-icon" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                <span className="connect-label">GitHub</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="connect-row">
                <svg className="connect-icon" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span className="connect-label">LinkedIn</span>
              </a>
              <a href="mailto:khadija@example.com" className="connect-row">
                <svg className="connect-icon" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span className="connect-label">Email</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="section-container footer-content">
          <p className="copyright">© 2025 Khadija Mansoor · Designed with care</p>
        </div>
      </footer>
    </ClickSpark>
  );
}
