import { Link, Outlet } from 'react-router-dom';
import { Atom, FileUser, Mail } from 'lucide-react';

const navItems = [
  { href: '/#systems', label: 'Systems' },
  { href: '/#work', label: 'Work' },
  { href: '/studio', label: 'CV Studio' },
];

export function AppLayout() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Dinh Huynh Portfolio">
          <span className="brand-mark">
            <Atom size={20} aria-hidden="true" />
          </span>
          <span>
            <strong>Dinh Huynh</strong>
            <small>Backend ERP Systems</small>
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
          <a className="icon-button" href="mailto:hello@example.com" aria-label="Email">
            <Mail size={18} aria-hidden="true" />
          </a>
          <Link className="button button-primary header-cta" to="/studio">
            <FileUser size={17} aria-hidden="true" />
            CV Studio
          </Link>
        </div>
      </header>

      <Outlet />
    </div>
  );
}
