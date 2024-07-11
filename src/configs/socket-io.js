const socketIo = require('socket.io');

let io;
let activeUsers = 0;
const ips = {};

function initializeSocket(server) {
     io = socketIo(server, {
     cors: {
          origin: "http://localhost:5173", // Adjust this to match your client app's origin
          methods: ["GET", "POST"],
          credentials: true
     }
     });

     io.on('connection', (socket) => {
          const ipAddress = socket.handshake.address;
          console.log(ips)
          if(ips[ipAddress]) {
               ips[ipAddress] += 1;
          }else {
               ips[ipAddress] = 1;
               activeUsers += 1;
               io.emit('online-users', activeUsers);
          }
          socket.on('disconnect', () => {
               console.log('User disconnected');
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
