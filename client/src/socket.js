import { io } from 'socket.io-client';

const socket = process.env.NODE_ENV === 'production'
  ? io('/', {
    autoConnect: false,
  })
  : io('http://localhost:5000', {
    autoConnect: false,
    withCredentials: true,
  });

export default socket;
