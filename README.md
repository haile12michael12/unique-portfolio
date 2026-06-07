# Portfolio Backend API

Node.js/Express/MongoDB backend for [unique-portfolio](https://github.com/haile12michael12/unique-portfolio).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 18+ |
| Framework | Express 4 |
| Database | MongoDB + Mongoose |
| Auth | JWT (jsonwebtoken) |
| Email | Nodemailer (Gmail / SMTP) |
| File Upload | Multer |
| Security | Helmet, express-rate-limit, mongo-sanitize |
| Logging | Winston + Morgan |
| Testing | Jest + Supertest |

---

## Project Structure

```
portfolio-backend/
├── src/
│   ├── app.js                  # Express app (middleware, routes)
│   ├── server.js               # Entry point
│   ├── seed.js                 # DB seed script
│   ├── config/
│   │   └── database.js         # MongoDB connection
│   ├── controllers/
│   │   ├── aboutController.js
│   │   ├── authController.js
│   │   ├── contactController.js
│   │   ├── projectController.js
│   │   └── skillController.js
│   ├── middleware/
│   │   ├── auth.js             # JWT protect middleware
│   │   ├── errorHandler.js     # Global error handler
│   │   └── upload.js           # Multer image/PDF upload
│   ├── models/
│   │   ├── About.js
│   │   ├── Contact.js
│   │   ├── Project.js
│   │   └── Skill.js
│   ├── routes/
│   │   ├── about.js
│   │   ├── auth.js
│   │   ├── contact.js
│   │   ├── projects.js
│   │   ├── resume.js
│   │   └── skills.js
│   └── utils/
│       ├── apiService.js       # Drop into React frontend as src/services/api.js
│       └── logger.js
├── uploads/                    # Uploaded images & resume PDFs
├── logs/                       # Winston log files
├── __tests__/
│   └── api.test.js
├── .env.example
├── jest.config.js
└── package.json
```

---

## Quick Start

### 1. Install dependencies
```bash
cd portfolio-backend
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env with your MongoDB URI, email credentials, JWT secret, etc.
```

### 3. Seed the database
```bash
node src/seed.js
```

### 4. Start the server
```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

The API will be available at `http://localhost:5000`.

---

## API Reference

### Health
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/health` | — | Server status check |

### Auth
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | — | Admin login → returns JWT |
| GET | `/api/auth/me` | 🔒 JWT | Get current admin info |

**Login body:**
```json
{ "username": "admin", "password": "admin123" }
```

### Contact
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/contact` | — | Send a contact message (+ auto-email) |
| GET | `/api/contact` | 🔒 JWT | List all messages (paginated) |
| PATCH | `/api/contact/:id/read` | 🔒 JWT | Mark message as read |
| DELETE | `/api/contact/:id` | 🔒 JWT | Delete a message |

**POST body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Collaboration opportunity",
  "message": "Hi, I'd love to work with you!"
}
```

### Projects
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/projects` | — | Get all projects (filter: `?category=web&featured=true`) |
| GET | `/api/projects/:id` | — | Get single project |
| POST | `/api/projects` | 🔒 JWT | Create project (supports `multipart/form-data` for image) |
| PUT | `/api/projects/:id` | 🔒 JWT | Update project |
| DELETE | `/api/projects/:id` | 🔒 JWT | Delete project |

### Skills
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/skills` | — | Get skills (add `?grouped=true` for object grouped by category) |
| POST | `/api/skills` | 🔒 JWT | Add a skill |
| POST | `/api/skills/bulk` | 🔒 JWT | Replace all skills at once |
| PUT | `/api/skills/:id` | 🔒 JWT | Update a skill |
| DELETE | `/api/skills/:id` | 🔒 JWT | Delete a skill |

### About
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/about` | — | Get bio/info |
| POST/PUT | `/api/about` | 🔒 JWT | Create or update bio (upsert) |

### Resume
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/resume` | — | Download latest resume PDF |
| POST | `/api/resume` | 🔒 JWT | Upload a new resume PDF |

---

## Connecting to the React Frontend

1. Copy `src/utils/apiService.js` → your React project at `src/services/api.js`
2. Add to your React `.env`:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
3. Use in components:
   ```jsx
   import api from '../services/api';

   // Contact form
   await api.contact.send({ name, email, message });

   // Load projects
   const { data } = await api.projects.getAll({ featured: true });

   // Load skills grouped by category
   const { data } = await api.skills.getAll(true);

   // Download resume
   api.resume.download();
   ```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Server port (default: 5000) |
| `NODE_ENV` | No | `development` / `production` |
| `MONGO_URI` | **Yes** | MongoDB connection string |
| `JWT_SECRET` | **Yes** | Secret key for signing JWTs |
| `JWT_EXPIRES_IN` | No | Token expiry (default: `7d`) |
| `EMAIL_USER` | No | Gmail address for contact form |
| `EMAIL_PASS` | No | Gmail app password |
| `EMAIL_TO` | No | Where to forward contact messages |
| `CLIENT_URL` | No | React app origin for CORS (default: `http://localhost:5173`) |
| `ADMIN_USERNAME` | No | Admin login username (default: `admin`) |
| `ADMIN_PASSWORD` | No | Admin plaintext password for dev only |
| `ADMIN_PASSWORD_HASH` | Recommended | bcrypt hash of admin password for production |

### Generating a bcrypt password hash
```bash
node -e "const b=require('bcryptjs'); b.hash('yourpassword',12).then(console.log)"
```
Paste the output as `ADMIN_PASSWORD_HASH` in `.env`.

---

## Running Tests
```bash
npm test
# With coverage
npm test -- --coverage
```

---

## Deployment Notes

- Set `NODE_ENV=production` in your environment
- Use a managed MongoDB (MongoDB Atlas) for production
- Store uploaded files on S3 or Cloudinary instead of local `uploads/` in production
- Set `CLIENT_URL` to your live frontend domain
- Always use `ADMIN_PASSWORD_HASH` (never plaintext) in production
