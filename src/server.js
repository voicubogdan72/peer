"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const peer_1 = require("peer");
const app = (0, express_1.default)();
const server = app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
const peerServer = (0, peer_1.ExpressPeerServer)(server, {
    path: "/peerjs",
    proxied: true,
});
app.use("/peerjs", peerServer);
