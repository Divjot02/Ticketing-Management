const express = require("express");
const app = express();
const path = require("path");
var session = require("express-session");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const ticketRouter = require("./Routes/ticket");
const userRouter = require("./Routes/users");
const resolverRouter = require("./Routes/resolver");
const chatRouter = require("./Routes/chat");
const MessageModel = require("./Models/message");
//socketIO
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
server.listen(3000, function () {
  console.log("Server is listening on port 3000");
});
// connection
dotenv.config();
const url = process.env.MONGO_URI;
mongoose
  .connect(url)
  // mongoose
  //   .connect("mongodb://127.0.0.1:27017/TicketDb", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(
  session({
    secret: "WEDONTTELLTHATHERE",
    resave: false,
    saveUninitialized: true,
  })
);
//
app.set("view engine", "ejs");
// to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
//routes
app.get("/", (req, res) => {
  if (req.session.isLoggedIn) {
    res.render("userDashboard.ejs", { username: req.session.username });
    return;
  }
  if (req.session.resolverLogggedIn) {
    res.render("resolverDashboard.ejs", { session: req.session });
    return;
  }
  res.render("default.ejs");
});

//TEMPORARY---------------------------

// app.get("/dashboard", (req, res) => {
//   if (req.session.isLoggedIn) {
//     res.render("dashboard", { session: req.session });
//   } else {
//     res.redirect("/user/Login"); // Redirect to the login page if not logged in
//   }
// });
//------------------------------------
app.use("/user", userRouter);
app.use("/ticket", ticketRouter);
app.use("/resolver", resolverRouter);
app.use("/Chat", chatRouter);

// app.listen(3000, () => {
//   console.log("server is running on port 3000");
// });
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
  socket.on("join room", (ticketId) => {
    socket.join(ticketId); // Join the chat room corresponding to the ticket ID
  });
  socket.on("chat message", async (data) => {
    const { ticketId, sender, message } = data;

    // Save the message to the database
    const newMessage = new MessageModel({
      ticketId,
      sender,
      message,
    });

    try {
      await newMessage.save();
    } catch (error) {
      console.error("Error saving message:", error);
    }

    // Emit the message back to clients in the same chat room
    io.to(ticketId).emit("chat message", { sender, message });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// bp3Fb9JUcVQ2enBh;
