import socketio from "socket.io-client";

const socket = socketio("http://10.0.2.2:3333", {
  autoConnect: true
});

function connect(latitude, longitude, techs) {
  socket.io.opts.query = {
    latitude, 
    longitude, 
    techs,
  }
  socket.connect();
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

function subscribeToNewUser(subscribeFuction) {
  socket.on('new-user', subscribeFuction);
}

export { connect, disconnect, subscribeToNewUser };
