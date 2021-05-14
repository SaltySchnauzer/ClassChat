"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMessages = exports.ReturnMessages = exports.FirstTimeSetup = exports.Connect = void 0;
const mongodb_1 = require("mongodb");
const url = "mongodb://localhost:27017/twonote";
/**
 * Connects to the mongoDB server and then runs whatever function is put in.
 *
 * @param func The function to be run.
 */
function Connect(func) {
    console.log("connecting to database...");
    mongodb_1.MongoClient.connect(url, (err, db) => {
        if (err)
            throw err;
        console.log("Database Connected!");
        func(db);
        db.close();
    });
}
exports.Connect = Connect;
/**
 * Checks the user database to see if there is an admin and dummy user.
 *
 * If not, it adds both.
 *
 * This is to check that the system is working properly and to give me roughly functioning users.
 *
 * abandoned temporarily to setup chat system as that's higher priority
 */
function FirstTimeSetup() {
    Connect((db) => {
        //quick reference to appropriate collection
        let ref = db.db("users").collection("users");
        if (ref.findOne({ username: "admin" }) == null) {
        }
    });
}
exports.FirstTimeSetup = FirstTimeSetup;
/**
 * Will get *all* messages that are in a chatroom.
 *
 * @todo Return only a set amount of messages to prevent the server from blowing up
 *
 * @param chatID The chatroom database ID, usually the name of the room
 */
function ReturnMessages(chatID) {
    Connect(async (client) => {
        let ref = client.db(chatID).collection("messages");
        let msgs = await ref.find().toArray();
        return msgs;
    });
}
exports.ReturnMessages = ReturnMessages;
function AddMessages(chatID, msgs) {
    Connect(async (client) => {
        let ref = client.db(chatID).collection("messages");
        let result = await ref.insertMany(msgs);
        console.log(`${result.insertedCount} messages saved to chat with id: "${chatID}".`);
    });
}
exports.AddMessages = AddMessages;
