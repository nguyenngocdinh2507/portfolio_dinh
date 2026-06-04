import { ArrowUpRight, CircuitBoard, Cpu, FileUser, Github, Linkedin, Mail, Satellite } from 'lucide-react';
import { CosmicMachineScene } from '../components/CosmicMachineScene';

const signalCards = [
  {
    icon: Cpu,
    title: 'Frontend Systems',
    text: 'React interfaces, motion states, responsive surfaces and product-grade component structure.',
  },
  {
    icon: CircuitBoard,
    title: 'Machine Logic',
    text: 'Clean API flows, clear state transitions, performance-aware rendering and maintainable data shapes.',
  },
  {
    icon: Satellite,
    title: 'Digital Atmosphere',
    text: 'Portfolio visuals with cosmic depth, technical rhythm and a personal signature beyond a plain CV.',
  },
];

const projects = [
  'Analytics Workspace',
  'Hiring Pipeline',
  'Portfolio Platform',
  'CV Studio',
];

export function HomePage() {
  return (
    <main className="home-page">
      <section className="cosmic-hero">
        <CosmicMachineScene />
        <div className="hero-vignette" aria-hidden="true" />
        <div className="cosmic-copy">
          <p className="eyebrow">Dinh Huynh / Frontend Developer</p>
          <h1>Building interfaces where technology feels alive.</h1>
          <p>
            Portfolio cá nhân pha trộn không gian, máy móc và sản phẩm web: nơi các giao diện React được thiết kế như
            hệ thống có nhịp, có lực và có chiều sâu.
          </p>
          <div className="home-actions">
            <a className="button button-primary" href="/studio">
              <FileUser size={18} aria-hidden="true" />
              Mở CV Studio
            </a>
            <a className="button button-glass" href="#systems">
              Xem hệ thống
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="hero-meta">
          <span>React</span>
          <span>Three.js</span>
          <span>Machine UI</span>
        </div>
      </section>

      <section className="home-section signal-section" id="systems">
        <div className="home-section-heading">
          <p className="eyebrow">Systems</p>
          <h2>Giao diện cá nhân nhưng mang cảm giác của một cỗ máy số.</h2>
        </div>
        <div className="signal-grid">
          {signalCards.map((card) => {
            const Icon = card.icon;

            return (
              <article className="signal-card" key={card.title}>
                <Icon size={24} aria-hidden="true" />
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="home-section machine-band" id="work">
        <div>
          <p className="eyebrow">Work Index</p>
          <h2>Selected modules</h2>
        </div>
        <div className="project-strip">
          {projects.map((project, index) => (
            <article className="machine-project" key={project}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{project}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section contact-console" id="contact">
        <div>
          <p className="eyebrow">Transmission</p>
          <h2>Kết nối để biến ý tưởng thành giao diện có thể chạy.</h2>
        </div>
        <div className="console-actions">
          <a className="contact-link" href="mailto:hello@example.com">
            <Mail size={18} aria-hidden="true" />
            hello@example.com
          </a>
          <a className="contact-link" href="https://github.com" target="_blank" rel="noreferrer">
            <Github size={18} aria-hidden="true" />
            GitHub
          </a>
          <a className="contact-link" href="https://linkedin.com" target="_blank" rel="noreferrer">
            <Linkedin size={18} aria-hidden="true" />
            LinkedIn
          </a>
        </div>
      </section>
    </main>
  );
}
