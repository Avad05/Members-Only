# 🏛️ Members Only Clubhouse

A private message board where users can write posts, but only authenticated "Members" can see the authors and dates. Non-members can see the messages but not who wrote them. Built with Node.js, Express, Passport.js, and PostgreSQL.

## 🚀 Live Demo
https://members-only-xfh9.onrender.com/

## ✨ Features
- **Authentication:** Secure login/signup using Passport.js and Bcrypt password hashing.
- **Role-Based Access:** - **User:** Can view messages (anonymous authors).
  - **Member:** Can view authors, timestamps, and create new posts.
  - **Admin:** Can delete any message.
- **Persistent Sessions:** Sessions are stored in PostgreSQL using `connect-pg-simple` to prevent logouts on server restarts.
- **Responsive UI:** Styled with Tailwind CSS and EJS templates.

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (Hosted on Render)
- **Auth:** Passport.js (Local Strategy)
- **Templating:** EJS
- **Styling:** Tailwind CSS

## 📋 Database Schema
The project uses three main tables:
1. `userinfo`: Stores credentials and membership status.
2. `messageinfo`: Stores posts linked to users via Foreign Keys.
3. `session`: Stores persistent session data for `express-session`.



## ⚙️ Setup & Installation

1. **Clone the repository:**
```bash
git clone git@github.com:Avad05/Members-Only.git
cd Members-Only

```

2. **Install dependencies:**
```bash
npm install

```


3. **Environment Variables:**
Create a `.env` file in the root directory and add:
```env
DATABASE_URL=your_postgresql_url
SESSION_SECRET=your_random_secret
PORT=8000
NODE_ENV=development

```


4. **Initialize Database:**
Run the schema script to create tables:
```bash
psql -d your_db_name -f schema.sql

```


5. **Run the app:**
```bash
npm run start

```



## 🌐 Deployment (Render)

This app is optimized for deployment on Render. Ensure you set the `NODE_ENV` to `production` in the Render dashboard to enable secure cookies and the `trust proxy` setting.

---

Created by Avadhut Kaskar
