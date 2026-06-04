# CV Studio FE

Frontend React/Vite cho CV Studio: chỉnh sửa CV, kéo thả section/item, xem preview và lưu qua backend.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Chạy cùng backend

Terminal 1:

```bash
cd ../de_profile_be
npm run dev
```

Terminal 2:

```bash
cd ../de_profile_fe
npm run dev
```

Mở `http://localhost:5173/`. Vite proxy `/api` sang backend `http://localhost:4000`.

## Cấu trúc

```text
src/
  components/  Component tái sử dụng
  layouts/     Layout chính của ứng dụng
  pages/       Màn hình theo route
  router/      Cấu hình route
  services/    HTTP client/service layer
  styles/      CSS global và design tokens
  utils/       Helper dùng chung
```

## Environment

Khi deploy tách domain, đặt `VITE_API_BASE_URL` hoặc cấu hình reverse proxy cho `/api`.
