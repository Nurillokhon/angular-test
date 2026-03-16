<!-- @format -->

# Logistic App

Yuk tashish buyurtmalarini boshqarish uchun oddiy ilova. Frontend Angular, backend FastAPI.

## Loyiha tuzilishi

```
angular tast/
├── logisticApp/     — Angular frontend
├── backend/         — FastAPI backend
└── README.md
```

## Kerakli dasturlar

- **Node.js** (npm) — frontend uchun
- **Python 3** — backend uchun

## Ishga tushirish

### 1. Backend (API)

Backend papkasiga o‘ting va serverni ishga tushiring:

```bash
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload --port 8000
```

API ishlaydi: **http://localhost:8000**

### 2. Frontend (Angular)

Frontend papkasiga o‘ting va ilovani ishga tushiring:

```bash
cd logisticApp
npm install
npm start
```

Brauzerda oching: **http://localhost:4200**

## Foydalanish

1. **Login** — `/login` sahifasida telefon va parol bilan kiring.
2. **Buyurtmalar** — kirgach `/orders` sahifasida buyurtmalar ro‘yxati ko‘rinadi.
3. **Buyurtma batafsil** — jadvaldagi qatorni bosish orqali modal ochiladi, statusni select orqali o‘zgartirish mumkin.
4. **Yangi buyurtma** — "Create Order" tugmasi orqali modal ochib, from, to, weight, price, status va senderId kiritiladi.

## API (backend)

| Metod | Yo‘l                      | Vazifa                 |
| ----- | ------------------------- | ---------------------- |
| POST  | `/api/login`              | Login (telefon, parol) |
| GET   | `/api/orders`             | Buyurtmalar ro‘yxati   |
| GET   | `/api/orders/{id}`        | Bitta buyurtma         |
| POST  | `/api/orders`             | Yangi buyurtma         |
| PATCH | `/api/orders/{id}/status` | Status o‘zgartirish    |

API chaqiruvlarida `Authorization: Bearer <token>` header kerak (login qilgandan keyin token olinadi).

## Texnologiyalar

- **Frontend:** Angular 21, Tailwind CSS, ng-zorro-antd (modal, UI)
- **Backend:** FastAPI, Python

## Test foydalanuvchilar (backend)

- Telefon: `+998339721212`, parol: `admin123` (moderator)
