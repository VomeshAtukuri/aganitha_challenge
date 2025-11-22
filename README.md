# 🚀 TinyLink — URL Shortener

A modern, full-stack URL shortener built using **Next.js 15**, **Drizzle ORM**, **Neon Postgres**, and **TailwindCSS**.
Users can create short links, view stats, delete links, and redirect using short codes — similar to Bit.ly.

This project fulfills all requirements from the **TinyLink Take-Home Assignment**.

# 🌐 Demo

🔗 **Live URL:** *https://aganitha-challenge.vercel.app/*

# 🧠 Features

### 🔗 Short Link Creation

- Create short links using a **custom code** or **auto-generated code**
- URL validation
- Custom code uniqueness enforced
- Inline errors + success states

### ↪️ Redirect System

- Visiting `/{code}` triggers a **302 redirect**
- Click count incremented
- Last clicked timestamp updated
- Deleted links return **404**

### 📊 Stats Page

- View detailed analytics for a specific link at `/code/{code}`
- Includes click count + last clicked + created time

### 🗂️ Dashboard

- Table of all links
- Search by code or URL
- Copy short link
- Add + delete links
- Responsive design
- Clean UI using shadcn components

### ❤️ Health Endpoint

- `/healthz` returns `{ ok: true, version: "1.0" }`

# 🏗️ Tech Stack

| Layer      | Technology                     |
| ---------- | ------------------------------ |
| Framework  | **Next.js 15 (App Router)**    |
| Database   | **Neon Postgres (Serverless)** |
| ORM        | **Drizzle ORM**                |
| UI         | **TailwindCSS + shadcn/ui**    |
| Deployment | **Vercel**                     |
| Language   | **TypeScript**                 |

# 🧪 API Endpoints

## Create link

```
POST /api/links
```

Body:

```json
{
  "url": "https://example.com",
  "code": "custom123" // optional
}
```

## List all links

```
GET /api/links
```

## Get stats for a code

```
GET /api/links/:code
```

## Delete a link

```
DELETE /api/links/:code
```

## Redirect

```
GET /:code
```

→ **302 redirect** to original target URL.

## Healthcheck

```
GET /healthz
```

Response:

```json
{ "ok": true, "version": "1.0" }
```

# 🧩 Installation & Setup

### 1️⃣ Clone repo

```sh
git clone https://github.com/VomeshAtukuri/aganitha_challenge.git
cd aganitha_challenge
```

### 2️⃣ Install dependencies

```sh
npm install
```

### 3️⃣ Configure environment variables

Create `.env`:

```
DATABASE_URL=your-neon-url
BASE_URL=http://localhost:3000
```

### 4️⃣ Run Drizzle migrations

```sh
npx drizzle-kit generate
npx drizzle-kit migrate
```

### 5️⃣ Start app locally

```sh
npm run dev
```

# 🚀 Deployment (Vercel)

1. Push repository to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

# 🧪 Test Scenarios (Autograder Compliance)

✔ `/healthz` returns `200`
✔ Duplicate custom codes return `409`
✔ Redirect increments click count
✔ Redirect returns `302`
✔ Deleted link returns `404`
✔ URL validation
✔ Search/filter works
✔ Responsive UI
✔ Clean layout and UX

# 🛠️ Future Improvements

- QR code generation
- API rate limiting
- Auth for personal dashboards
- Click history with charts
- Expiring links
