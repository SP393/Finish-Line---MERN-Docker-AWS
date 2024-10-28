const cors = require("cors");
const express = require("express");
const mongoose = require('mongoose');
const tasks = require('./routes/route');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();

app.use(express.json())
app.use(cors({ origin: 'http://54.173.186.1:5173', 
    credentials: true}));
mongoose.connect("mongodb+srv://sruthipandiath3:cowN5JLSR0haoJvh@finishline.p2yq0.mongodb.net/")
// Set up session middleware with MongoDB store
app.use(session({
    secret: 'SruthiPan3',  // You should replace this with a strong secret
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://sruthipandiath3:cowN5JLSR0haoJvh@finishline.p2yq0.mongodb.net/',
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day session expiration
    }
}));


// routes
app.use("/tracktask", tasks);
const port = 8000;
app.listen(port, () => console.log("Listening on port "+ port));