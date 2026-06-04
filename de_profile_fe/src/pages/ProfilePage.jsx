import { Mail, MapPin, Phone } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';

const profile = {
  name: 'Dinh Huynh',
  role: 'Frontend Developer',
  email: 'hello@example.com',
  phone: '+84 900 000 000',
  location: 'Ho Chi Minh City, Vietnam',
};

export function ProfilePage() {
  return (
    <div className="page-stack">
      <SectionHeader
        eyebrow="User"
        title="Profile"
        description="Page mẫu cho thông tin cá nhân hoặc profile người dùng."
      />

      <section className="profile-panel">
        <div className="avatar" aria-hidden="true">
          DH
        </div>
        <div>
          <h2>{profile.name}</h2>
          <p>{profile.role}</p>
        </div>
      </section>

      <section className="contact-grid" aria-label="Thông tin liên hệ">
        <article className="contact-item">
          <Mail size={20} aria-hidden="true" />
          <span>{profile.email}</span>
        </article>
        <article className="contact-item">
          <Phone size={20} aria-hidden="true" />
          <span>{profile.phone}</span>
        </article>
        <article className="contact-item">
          <MapPin size={20} aria-hidden="true" />
          <span>{profile.location}</span>
        </article>
      </section>
    </div>
  );
}
