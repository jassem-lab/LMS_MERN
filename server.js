require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const cookieSession = require('cookie-session');

const passport = require('passport');
const path = require('path');
const morgan = require('morgan')

const cors = require('cors');

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('debug', true);

const accountRoutes = require('./routes/api/account');

const leaveRoutes = require('./routes/api/leave');
const staffRoutes = require('./routes/api/staff');
const timetableRoutes = require('./routes/api/timetable');
const profileRoutes = require('./routes/api/profile');
const leaveTypeRoutes = require('./routes/api/leavetype');
const leaveAllocationRoutes = require('./routes/api/leaveallocation');
const helperRoutes = require('./routes/api/helpers');
const holidayRoutes = require('./routes/api/holiday');
const alterationRoutes = require('./routes/api/alteration');
const { fileDownloadHandler } = require('./routes/utils');

const app = express();

//body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

//if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, 'client', 'build')));
//}



//connect to mongodb
mongoose
  .connect(process.env.mongoURI, {
    autoReconnect: true,
    reconnectTries: 100,
    reconnectInterval: 5000
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

//passport middleware
// app.use(passport.session());  
app.use(passport.initialize());
// app.use(cookieSession({
//   name : 'session',
//   keys : process.env.secretOrKey
// }))
app.use(compression());
app.use(morgan('dev'))
//passport config
require('./config/passport.js')(passport);

//use routes

app.use('/api/alteration', alterationRoutes);

app.use('/api/account', accountRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/leave-type', leaveTypeRoutes);
app.use('/api/leave-allocation', leaveAllocationRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/helpers', helperRoutes);
app.use('/api/holiday', holidayRoutes);
app.get('/uploads', fileDownloadHandler);

const port = process.env.PORT || 5000;

//if (process.env.NODE_ENV === 'production') {
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
//}

let server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

let io = require('./routes/sockets').init(server);

io.sockets.on('connection', socket => {
  socket.on('subscribeToNotifications', data => {
    require('./routes/sockets/notificationHandler')(io, socket, data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

require('./routes/utils/sendNotification');

/* https
  .createServer(
    {
      key: fs.readFileSync('config/server.key'),
      cert: fs.readFileSync('config/server.crt')
    },
    app
  )
  .listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
 */
