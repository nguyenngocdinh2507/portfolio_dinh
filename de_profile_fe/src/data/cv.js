export const profile = {
  name: 'Nguyễn Ngọc Đính',
  role: 'Backend Engineer',
  location: 'Ho Chi Minh City, Vietnam',
  phone: '0935877623',
  email: 'nguyenngocdinh2507@gmail.com',
  github: 'https://github.com/nguyenngocdinh2507',
  summary:
    'Sinh viên năm cuối Công nghệ Thông tin, hiện là Backend Developer Intern tại Mid Vietnam. Là người đóng góp chính cho một hệ thống quản lý kho–bán hàng–sản xuất theo Clean Architecture với Node.js, MySQL, Redis và MQTT trong 8 tháng. Học công nghệ bằng cách hiểu vì sao nó tồn tại và nó giải quyết vấn đề gì trước khi đi vào chi tiết triển khai.',
};

export const stats = [
  { label: 'Tháng làm việc', value: '8', trend: 'tại Mid Vietnam, 12/2025 – hiện tại' },
  { label: 'Commit đóng góp', value: '366/406', trend: '~90% commit của dự án' },
  { label: 'Module nghiệp vụ', value: '6+', trend: 'kho, sản xuất, hợp đồng, giá, thu-chi, báo cáo' },
  { label: 'Kiến trúc', value: 'Clean Architecture', trend: 'Controller → Service → UseCase → Repository' },
];

export const skillGroups = [
  {
    title: 'Ngôn ngữ',
    items: ['JavaScript (Node.js)', 'PHP', 'Java', 'C#', 'SQL'],
  },
  {
    title: 'Backend',
    items: [
      'REST API',
      'JWT Authentication',
      'Role-based Authorization',
      'Clean Architecture',
      'MVC',
      'CRUD',
      'MQTT pub/sub',
      'Socket.IO',
    ],
  },
  {
    title: 'Database',
    items: ['MySQL', 'SQL Server', 'MongoDB'],
  },
  {
    title: 'Hạ tầng',
    items: ['Linux', 'Docker', 'Git', 'Redis', 'Node.js Cluster', 'Postman'],
  },
  {
    title: 'Đang tìm hiểu sâu',
    items: [
      'System Design',
      'Message Queue',
      'Transactions',
      'Concurrency',
      'Distributed Systems',
      'Event-driven Architecture',
    ],
  },
];

export const experience = [
  {
    company: 'Mid Vietnam',
    role: 'Backend Developer Intern',
    period: '12/2025 – Hiện tại',
    highlights: [
      'Là lập trình viên chủ lực (366/406 commit, ~90%) trong một nhóm nhỏ, xây dựng hệ thống quản lý kho–bán hàng–sản xuất theo Clean Architecture (Controller → Service → UseCase → Repository) với Node.js/Express, MySQL, Redis, MQTT.',
      'Xây dựng module Hợp đồng: theo dõi thanh toán trước và công nợ theo từng trạng thái vòng đời hợp đồng.',
      'Xây dựng module Sản xuất: lệnh sản xuất, BOM (định mức nguyên vật liệu) và tính giá thành theo nguyên vật liệu.',
      'Xây dựng bảng giá theo cấp kho và theo số lượng (price book, tiered pricing).',
      'Xây dựng module Thu–Chi và một sổ cái kế toán ghi kép (double-entry) theo hệ thống tài khoản Thông tư 200, có cơ chế đảo bút toán (reversal) phục vụ audit.',
      'Xây dựng báo cáo/dashboard doanh thu, công nợ khách hàng/nhà cung cấp, tồn kho và định giá tồn kho.',
      'Triển khai JWT auth với phiên đăng nhập lưu trên Redis (thu hồi được), phân quyền theo kho; chạy Node.js ở chế độ cluster; cron job tự động sinh kế hoạch thu–chi có distributed lock (Redis) an toàn khi chạy nhiều tiến trình.',
    ],
  },
];

export const projects = [
  {
    name: 'Real-time Chat Application',
    description:
      'Xây dựng ứng dụng chat thời gian thực hỗ trợ đăng nhập, chat riêng và chat nhóm bằng Socket.IO.',
    stack: ['Node.js', 'Socket.IO', 'REST API', 'MySQL'],
  },
];

export const education = [
  {
    school: 'Saigon University',
    degree: 'Cử nhân Công nghệ Thông tin',
    period: '2020 – Hiện tại',
  },
];
