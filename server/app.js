const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { socketAuth } = require('./utils/auth');
const { environment } = require('./config');
const routes = require('./routes');

require('./config/database');
const { Party } = require('./models');

const isProduction = environment === 'production';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
  },
});

io.use(socketAuth);
io.on('connection', async (socket) => {
  console.log(socket.id, 'has connected');
  app.set('socket', socket);

  const parties = await Party.find({ memberIds: socket.userId });

  parties.forEach((party) => {
    socket.join(party.id);
  });

  socket.broadcast.emit('userStatus');

  socket.on('disconnect', () => {
    console.log(socket.id, 'has disconnected');

    socket.broadcast.emit('userStatus');
  });
});

app.set('io', io);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(helmet.crossOriginResourcePolicy({
  policy: 'cross-origin',
}));

// Set the _csrf token and create req.csrfToken method
app.use(csurf({
  cookie: {
    secure: isProduction,
    sameSite: isProduction && 'Lax',
    httpOnly: true,
  },
}));

app.use(routes); // Connect all the routes

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = 'Resource Not Found';
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

// Error formatter
app.use((err, req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = server;
