const { PeerServer } = require("peer");

const peerServer = PeerServer({ port: 8000, path: "/" });

console.log("PeerServer running on port 9000");
