const Peer = require("peerjs");
const peer = new Peer("pick-and-idd");

const conn = peer.connect("another-peers-id");

conn.on("open", () => {
  conn.send("hi");
});

peer.on("connection", (conn: any) => {
  conn.on("data", (data: any) => {
    // Will print 'hi!'
    console.log(data);
  });
  conn.on("open", () => {
    conn.send("hello!");
  });
});
