const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
const { MONGO_PORT, MONGO_IP, MONGO_PASSWORD, MONGO_USER, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("./config/config");

const RedisStore = require("connect-redis").default;
const session = require("express-session");
const { createClient } = require("redis");
const app = express();


// Initialize Redis client
const redisClient = createClient({
  url: `redis://${REDIS_URL}:${REDIS_PORT}`,  // Use environment variables here
});

redisClient.connect().then(()=>{
  console.log("redis connected")
}).catch(console.error);

// Initialize Redis store for session management
const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:", // Optional prefix for keys in Redis
});



////// middlewares /////
app.use(cors())
app.enable("trust proxy");
// Session middleware
app.use(
  session({
    store: redisStore,
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      secure: false, // Ensure secure is false if not using HTTPS in development
      httpOnly: true,
      maxAge: 30000000,
    },
  })
);
app.use(express.json());



// MongoDB connection
mongoose
  .connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });



// Define routes
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
// Default route
app.get("/v1", (req, res) => {
  console.log("recived")
  res.status(200).json({ message: "Hello World!!" });
});
// Mount routers
app.use("/v1/posts", postRouter);
app.use("/v1/users", userRouter);



// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
