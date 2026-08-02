import { Github, GraduationCap, Mail, MapPin, Phone } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { SectionHeader } from '../components/SectionHeader';
import {
  education,
  experience,
  profile,
  projects,
  skillGroups,
  stats,
} from '../data/cv';

export function HomePage() {
  return (
    <main className="home-page">
      <section className="hero">
        <p className="eyebrow">{profile.name} / {profile.role}</p>
        <h1>Xây dựng backend cho các hệ thống nghiệp vụ thực tế.</h1>
        <p className="hero-lead">{profile.summary}</p>

        <div className="hero-contact">
          <span>
            <MapPin size={16} aria-hidden="true" />
            {profile.location}
          </span>
          <a href={`tel:${profile.phone}`}>
            <Phone size={16} aria-hidden="true" />
            {profile.phone}
          </a>
          <a href={`mailto:${profile.email}`}>
            <Mail size={16} aria-hidden="true" />
            {profile.email}
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            <Github size={16} aria-hidden="true" />
            github.com/nguyenngocdinh2507
          </a>
        </div>

        <div className="home-actions">
          <a className="button button-primary" href={`mailto:${profile.email}`}>
            <Mail size={18} aria-hidden="true" />
            Liên hệ với tôi
          </a>
          <a className="button button-outline" href={profile.github} target="_blank" rel="noreferrer">
            <Github size={18} aria-hidden="true" />
            Xem GitHub
          </a>
        </div>
      </section>

      <section className="home-section" id="about">
        <SectionHeader eyebrow="Giới thiệu" title="Đôi nét về tôi" />
        <div className="stats-grid">
          {stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} trend={stat.trend} />
          ))}
        </div>
      </section>

      <section className="home-section" id="skills">
        <SectionHeader eyebrow="Kỹ năng" title="Công nghệ tôi làm việc cùng" />
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <article className="skill-card" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section" id="experience">
        <SectionHeader eyebrow="Kinh nghiệm" title="Quá trình làm việc" />
        <div className="timeline">
          {experience.map((job) => (
            <article className="timeline-item" key={job.company}>
              <div className="timeline-heading">
                <h3>{job.role}</h3>
                <span className="timeline-period">{job.period}</span>
              </div>
              <p className="timeline-company">{job.company}</p>
              <ul>
                {job.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section" id="projects">
        <SectionHeader eyebrow="Dự án cá nhân" title="Dự án tôi đã xây dựng" />
        <div className="projects-grid">
          {projects.map((item) => (
            <article className="project-card" key={item.name}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="tag-list">
                {item.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section" id="education">
        <SectionHeader eyebrow="Học vấn" title="Quá trình học tập" />
        <div className="education-list">
          {education.map((item) => (
            <article className="education-item" key={item.school}>
              <GraduationCap size={22} aria-hidden="true" />
              <div>
                <h3>{item.school}</h3>
                <p>{item.degree}</p>
                <span>{item.period}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section contact-section" id="contact">
        <SectionHeader
          eyebrow="Liên hệ"
          title="Sẵn sàng trao đổi về vị trí Backend Engineer"
          description="Gửi email hoặc kết nối với tôi qua GitHub, tôi sẽ phản hồi sớm nhất có thể."
        />
        <div className="contact-links">
          <a className="contact-link" href={`mailto:${profile.email}`}>
            <Mail size={18} aria-hidden="true" />
            {profile.email}
          </a>
          <a className="contact-link" href={`tel:${profile.phone}`}>
            <Phone size={18} aria-hidden="true" />
            {profile.phone}
          </a>
          <a className="contact-link" href={profile.github} target="_blank" rel="noreferrer">
            <Github size={18} aria-hidden="true" />
            GitHub
          </a>
        </div>
      </section>
    </main>
  );
}
