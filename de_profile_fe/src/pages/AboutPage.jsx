import { Code2, FolderKanban, Rocket } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';

const features = [
  {
    icon: Rocket,
    title: 'Vite ready',
    description: 'Dev server nhanh, build gọn và cấu hình dễ mở rộng.',
  },
  {
    icon: FolderKanban,
    title: 'Feature friendly',
    description: 'Cấu trúc thư mục rõ ràng để thêm domain module khi dự án lớn dần.',
  },
  {
    icon: Code2,
    title: 'Plain React JS',
    description: 'Dùng JSX và CSS thuần, dễ đọc, dễ chuyển sang UI library sau này.',
  },
];

export function AboutPage() {
  return (
    <div className="page-stack">
      <SectionHeader
        eyebrow="About"
        title="Thông tin source base"
        description="Nền tảng đủ nhẹ để bắt đầu nhanh, nhưng có các điểm mở rộng cần thiết cho dự án thật."
      />

      <section className="feature-grid">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <article className="feature-card" key={feature.title}>
              <Icon size={22} aria-hidden="true" />
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
}
