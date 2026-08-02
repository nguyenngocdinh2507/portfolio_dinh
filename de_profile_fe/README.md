# CV Studio FE

Portfolio cá nhân tĩnh của Nguyễn Ngọc Đính (React/Vite): giới thiệu, kỹ năng, kinh nghiệm, dự án, học vấn và liên hệ.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
```

Mở `http://localhost:5173/`.

## Cấu trúc

```text
src/
  components/  Component tái sử dụng
  data/        Nội dung CV tĩnh (profile, kinh nghiệm, dự án, kỹ năng, học vấn)
  layouts/     Layout chính của ứng dụng
  pages/       Màn hình theo route
  router/      Cấu hình route
  styles/      CSS global và design tokens
  utils/       Helper dùng chung
```

Chỉnh sửa nội dung CV bằng cách sửa trực tiếp `src/data/cv.js`.
