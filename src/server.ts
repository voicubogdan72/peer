import express from "express";
import ExpressPeerServer from "peerjs";

const app = express();
const server = app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

const peerServer = ExpressPeerServer(server, {
  path: "/peerjs",
  proxied: true,
});

app.use("/peerjs", peerServer);
