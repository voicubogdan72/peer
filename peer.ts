import Peer, { DataConnection } from "peerjs";
import readlineSync from "readline-sync";

class PeerBalance {
  private peer: Peer;
  private conn: DataConnection | null = null;
  private balance: number = 0;

  constructor(id: string, peerServerHost: string, peerServerPort: number) {
    this.peer = new Peer(id, {
      host: peerServerHost,
      port: peerServerPort,
      path: "/",
      secure: false, // Make sure to add this if you're not using HTTPS
    });

    this.peer.on("open", (id) => {
      console.log(`My peer ID is: ${id}`);
      this.runCLI();
    });

    this.peer.on("connection", (conn) => {
      this.conn = conn;
      console.log(`Connected to peer: ${conn.peer}`);

      this.conn.on("data", (data: any) => {
        if (typeof data === "number") {
          this.balance += data;
          console.log(`You were paid ${data}!`);
        }
      });
    });

    this.peer.on("error", (err) => {
      console.error(err);
    });
  }

  private connectToPeer(peerId: string) {
    this.conn = this.peer.connect(peerId);

    this.conn.on("open", () => {
      console.log(`Connected to peer: ${peerId}`);
    });

    this.conn.on("data", (data: any) => {
      if (typeof data === "number") {
        this.balance += data;
        console.log(`You were paid ${data}!`);
      }
    });

    this.conn.on("error", (err: any) => {
      console.error(err);
    });
  }

  private runCLI() {
    console.log("Welcome to your peering relationship!");
    while (true) {
      const command = readlineSync.question("> ").trim();
      const [action, ...args] = command.split(" ");

      switch (action) {
        case "balance":
          console.log(this.balance);
          break;
        case "pay":
          if (this.conn) {
            const amount = parseFloat(args[0]);
            if (!isNaN(amount)) {
              this.balance -= amount;
              this.conn.send(amount);
              console.log("Sent");
            } else {
              console.log("Invalid amount");
            }
          } else {
            console.log("No peer connected");
          }
          break;
        case "connect":
          const peerId = args[0];
          if (peerId) {
            this.connectToPeer(peerId);
          } else {
            console.log("Please provide a peer ID to connect");
          }
          break;
        case "exit":
          console.log("Goodbye.");
          process.exit(0);
        default:
          console.log(
            'Unknown command. Use "balance", "pay <amount>", "connect <peerId>", or "exit".'
          );
      }
    }
  }
}

const peerId = readlineSync.question("Enter your peer ID: ").trim();
const peerServerHost = "localhost";
const peerServerPort = 8000;

new PeerBalance(peerId, peerServerHost, peerServerPort);
