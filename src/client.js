"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const peerjs_1 = require("peerjs");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const peer = new peerjs_1.Peer("id", {
    host: "localhost",
    port: 9000,
    path: "/peerjs",
    secure: false,
    debug: 2,
    // config: {
    //   iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    // },
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
