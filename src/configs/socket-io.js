const socketIo = require('socket.io');

let io;
let activeUsers = 0;
const ips = {};
const acceptedUrls = [
     'http://localhost:3000',
     'http://localhost:3001',
     'http://localhost:3002',
     'http://localhost:5173',
     'https://clickrwanda.com',
     'https://www.clickrwanda.com',
     'https://clickrwanda-client.vercel.app',
     'https://share.clickrwanda.com'
];

function initializeSocket(server) {
     io = socketIo(server, {
     cors: {
          origin: (origin, callback) => {
               if (acceptedUrls.includes(origin) || !origin) {
                    callback(null, true);
               } else {
                    callback(new Error('Not allowed by CORS'));
               }
          },
          methods: ["GET", "POST"],
          credentials: true
     }
     });

     io.on('connection', (socket) => {
          const ipAddress = socket.handshake.address;
          if(ips[ipAddress]) {
               ips[ipAddress] += 1;
          }else {
               ips[ipAddress] = 1;
               activeUsers += 1;
               io.emit('online-users', activeUsers);
          }
          socket.on('disconnect', () => {
               if(ips[ipAddress]) {
                    ips[ipAddress] -= 0;
                    if(ips[ipAddress] === 0 ){
                         activeUsers -= 1;
                    }
               }else{
                    activeUsers -= 1;
               }
               
               io.emit('online-users', activeUsers);
          });

          
     });
}

function getIo() {
     if (!io) {
     throw new Error("Socket.io not initialized!");
     }
     return io;
}

module.exports = { initializeSocket, getIo };
