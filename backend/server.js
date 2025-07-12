// backend/server.js
require('dotenv').config();

const express       = require('express');
const cors          = require('cors');
const cookieParser  = require('cookie-parser');
const morgan        = require('morgan');

const { authGuard }     = require('./middleware/authGuard');
const { errorHandler }  = require('./middleware/errorHandler');

const authRoutes   = require('./routes/authRoutes');
const sequelize    = require('./config/db');
require('./models/User');  // register User model

const app  = express();
const PORT = process.env.PORT || 4000;

/* ─────────────────────── Global Middleware ─────────────────────── */
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));          // logs [GET] /path 200 12 ms

/* ───────────────────────────── Routes ───────────────────────────── */
app.get('/', (_req, res) => {
  res.send('Skill Swap Backend is running!');
});

app.use('/api/auth', authRoutes);

/* Example protected route */
app.get('/api/dashboard', authGuard, (req, res) => {
  res.json({
    message: `Welcome ${req.user.name}!`,
    user: req.user
  });
});

/* ───────────────────────── Error Handler ───────────────────────── */
app.use(errorHandler);

/* ──────────────────────── Database Sync ────────────────────────── */
sequelize.sync()
  .then(() => console.log('✅ Database synced'))
  .catch(err  => console.error('❌ Database sync failed:', err));

/* ───────────────────────── Start Server ────────────────────────── */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
