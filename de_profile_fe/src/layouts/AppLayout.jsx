import { Link, Outlet } from 'react-router-dom';
import { Github, Mail } from 'lucide-react';
import { profile } from '../data/cv';

const navItems = [
  { href: '/#about', label: 'Giới thiệu' },
  { href: '/#skills', label: 'Kỹ năng' },
  { href: '/#experience', label: 'Kinh nghiệm' },
  { href: '/#projects', label: 'Dự án' },
  { href: '/#contact', label: 'Liên hệ' },
];

export function AppLayout() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label={`${profile.name} Portfolio`}>
          <span>
            <strong>{profile.name}</strong>
            <small>{profile.role}</small>
          </span>
        </Link>

        <nav className="nav-list" aria-label="Điều hướng chính">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions" aria-label="Liên kết cá nhân">
          <a className="icon-button" href={`mailto:${profile.email}`} aria-label="Email">
            <Mail size={18} aria-hidden="true" />
          </a>
          <a
            className="icon-button"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Github size={18} aria-hidden="true" />
          </a>
          <a className="button button-primary header-cta" href="/#contact">
            Liên hệ
          </a>
        </div>
      </header>

      <Outlet />

      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
      </footer>
    </div>
  );
}
