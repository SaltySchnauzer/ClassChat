import { ChatMessage } from "@chat/types";
import { MongoClient } from "mongodb";
const url = "mongodb://localhost:27017/twonote";

/**
 * Connects to the mongoDB server and then runs whatever function is put in.
 *
 * @param func The function to be run.
 */
export function Connect(func: Function) {
  console.log("connecting to database...");
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    console.log("Database Connected!");
    func(db);
    db.close();
  });
}

/**
 * Checks the user database to see if there is an admin and dummy user.
 *
 * If not, it adds both.
 *
 * This is to check that the system is working properly and to give me roughly functioning users.
 *
 * abandoned temporarily to setup chat system as that's higher priority
 */
export function FirstTimeSetup() {
  Connect((db: MongoClient) => {
    //quick reference to appropriate collection
    let ref = db.db("users").collection("users");
    if (ref.findOne({ username: "admin" }) == null) {
    }
  });
}

/**
 * Will get *all* messages that are in a chatroom.
 *
 * @todo Return only a set amount of messages to prevent the server from blowing up
 *
 * @param chatID The chatroom database ID, usually the name of the room
 */
export function ReturnMessages(chatID: string) {
  Connect(async (client: MongoClient) => {
    let ref = client.db(chatID).collection("messages");
    let msgs = await ref.find().toArray();
    return msgs;
  });
}

export function AddMessages(chatID: string, msgs: ChatMessage[]) {
  Connect(async (client: MongoClient) => {
    let ref = client.db(chatID).collection("messages");
    let result = await ref.insertMany(msgs);
    console.log(
      `${result.insertedCount} messages saved to chat with id: "${chatID}".`
    );
  });
}
