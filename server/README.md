# Portfolio API (Express + MongoDB)

REST API for Dr. Fahmida Bristy's portfolio: admin login, CV upload/download, appointment requests, contact messages.

## Setup

```bash
cd server
npm install
cp .env.example .env        # then fill in MONGODB_URL and JWT_SECRET
npm run seed:admin          # creates the admin (reads ADMIN_EMAIL / ADMIN_PASSWORD from .env)
npm run dev                 # http://localhost:5000
npm test                    # integration tests; MONGODB_URL must point at a throwaway database
```

Initial login: username `bristy@gmail.com`, password `Bristy123` (from `.env.example`). The dashboard shows a banner until the password is changed in Dashboard > Account. Passwords must be at least 8 characters. `JWT_SECRET` must be 32+ random characters (`npm run setup` generates one). There is no public registration: the single admin account is created with `seed:admin`. Re-running it resets that account's password.

## Endpoints (all under `/api`)

Responses are JSON: `{ success, message?, data? }`. Errors use real HTTP status codes (400 validation, 401 auth, 404, 413, 429).

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| GET | `/health` | public | liveness check |
| POST | `/auth/login` | public (10 / 15 min) | `{identifier, password, remember?}` (identifier = username or email) -> `{token, user}`; `remember` gives a 7-day token instead of 1 day |
| POST | `/auth/forgot-password` | public (5 / hour) | `{identifier}`; always answers the same way; emails a 30-minute single-use reset link |
| POST | `/auth/reset-password` | public | `{token, password}` |
| GET | `/auth/me` | admin | current user |
| POST | `/auth/change-password` | admin | `{currentPassword, newPassword}`; old tokens stop working |
| GET | `/cv` | public | `{available, size?, updatedAt?, downloadUrl?}` |
| GET | `/cv/download` | public | streams the PDF |
| POST | `/cv` | admin | multipart field `file`, PDF only, max 5 MB; replaces the current CV |
| DELETE | `/cv` | admin | removes the CV |
| POST | `/appointments` | public (10 / hour) | `name, phone, preferredDate` required; `email, petName, petType, service, preferredTime, message` optional |
| GET | `/appointments` | admin | `?page=&limit=&status=` |
| PATCH | `/appointments/:id` | admin | `{status: pending\|confirmed\|completed\|cancelled}` |
| DELETE | `/appointments/:id` | admin | |
| POST | `/messages` | public (10 / hour) | `name, email, message` required; `subject` optional |
| GET | `/messages` | admin | `?page=&limit=&isRead=` |
| PATCH | `/messages/:id` | admin | `{isRead}` |
| DELETE | `/messages/:id` | admin | |

Send the token as `Authorization: Bearer <token>`. Public forms include a hidden honeypot field named `website`: leave it empty in the real form (bots that fill it are silently ignored).

## Security notes

- Passwords hashed with bcrypt (cost 12); login does equal work for unknown emails; generic error message.
- JWT (HS256, 1 day by default); tokens issued before a password change are rejected.
- Request bodies validated with zod (also blocks Mongo operator injection); 20 KB JSON limit; helmet; CORS limited to `CLIENT_ORIGIN`.
- Uploaded CVs get server-generated file names, are checked for a real `%PDF-` signature, are not served statically, and are only reachable via `/api/cv/download`.

## Password-reset email

Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` and `MAIL_FROM` in `.env`. Without `SMTP_HOST` nothing is emailed: in development the reset link is printed in the server console; in production a warning is logged. The email-sending path with real SMTP has not been tested. `CLIENT_ORIGIN` (first entry) is used to build the link.

## Not included yet

- Email notifications (new appointment / message).
- Refresh tokens or token revocation list (a stolen token is valid until it expires or the password changes).
- Uploads are stored on local disk: use a persistent volume, or move to S3/Cloudinary, on hosts with ephemeral disks.
