import * as readline from "readline";
import { Peer } from "peerjs";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const peer = new Peer("id", {
  host: "localhost",
  port: 9000,
  path: "/peerjs",
  secure: false,
  debug: 2,
  config: {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  },
});

peer.on("open", (id) => {
  console.log(`Your peer ID is: ${id}`);
  promptForConnection();
});

peer.on("connection", (conn) => {
  conn.on("data", (data) => {
    console.log(`Peer: ${data}`);
  });

  rl.on("line", (line) => {
    conn.send(line);
  });
});

function promptForConnection() {
  rl.question("Enter peer ID to connect: ", (id) => {
    const conn = peer.connect(id);

    conn.on("open", () => {
      console.log(`Connected to: ${id}`);

      conn.on("data", (data) => {
        console.log(`Peer: ${data}`);
      });

      rl.on("line", (line) => {
        conn.send(line);
      });
    });
  });
}
