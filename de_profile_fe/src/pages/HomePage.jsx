import { ArrowUpRight, CircuitBoard, Cpu, FileUser, Github, Linkedin, Mail, Satellite } from 'lucide-react';
import { CosmicMachineScene } from '../components/CosmicMachineScene';

const signalCards = [
  {
    icon: Cpu,
    title: 'Backend Architecture',
    text: 'Node.js, Express.js, REST API, module architecture, authentication, authorization and secure service boundaries.',
  },
  {
    icon: CircuitBoard,
    title: 'ERP Business Logic',
    text: 'Sales, warehouse, production, contracts, debt, cash flow and reporting flows mapped into reliable systems.',
  },
  {
    icon: Satellite,
    title: 'Infrastructure Signal',
    text: 'MySQL, Redis, MQTT, Docker, Linux and realtime communication for business systems that keep moving.',
  },
];

const projects = [
  'ERP Business Suite',
  'Warehouse Management',
  'Production Management',
  'Dynamic Pricing System',
  'Cash Transaction',
  'Dashboard & Reporting',
];

export function HomePage() {
  return (
    <main className="home-page">
      <section className="cosmic-hero">
        <CosmicMachineScene />
        <div className="hero-vignette" aria-hidden="true" />
        <div className="cosmic-copy">
          <p className="eyebrow">Dinh Huynh / Backend Engineer</p>
          <h1>Backend Engineer chuyên ERP & Business Systems.</h1>
          <p>
            Tôi phát triển hệ thống ERP, quản lý kho, sản xuất và bán hàng với Node.js, Express.js, MySQL, Redis,
            MQTT, Docker và Linux.
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
          <span>Node.js</span>
          <span>MySQL</span>
          <span>Redis</span>
          <span>MQTT</span>
          <span>Docker</span>
        </div>
      </section>

      <section className="home-section signal-section" id="systems">
        <div className="home-section-heading">
          <p className="eyebrow">Systems</p>
          <h2>Các hệ thống doanh nghiệp vận hành như một cỗ máy dữ liệu.</h2>
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
          <h2>ERP modules</h2>
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
          <h2>Kết nối để biến nghiệp vụ thành hệ thống backend có thể vận hành.</h2>
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
