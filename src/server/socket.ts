import { createServer } from "http";
import { Server } from "socket.io";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("join-workspace", (teamId) => {
            socket.join(teamId);
            console.log("Joined workspace:", teamId);
        });

        socket.on("send-message", (data) => {
            io.to(data.teamId).emit("receive-message", data);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected");
        });
    });

    httpServer.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});