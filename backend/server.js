require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 4000;

// ─── Global Middleware ───────────────────────────────
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// ─── Routes ───────────────────────────────────────────
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// ─── Test Route ───────────────────────────────────────
app.get('/', (req, res) => {
  res.send('Skill Swap Backend is running!');
});

// ─── Database Setup ───────────────────────────────────
const sequelize = require('./config/db');
require('./models/User'); // Register the User model

sequelize.sync()
  .then(() => console.log('✅ Database synced'))
  .catch(err => console.error('❌ Database sync failed:', err));

// ─── Start Server ─────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
