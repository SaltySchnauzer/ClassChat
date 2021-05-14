import { ChatMessage } from "@chat/types";
/**
 * Connects to the mongoDB server and then runs whatever function is put in.
 *
 * @param func The function to be run.
 */
export declare function Connect(func: Function): void;
/**
 * Checks the user database to see if there is an admin and dummy user.
 *
 * If not, it adds both.
 *
 * This is to check that the system is working properly and to give me roughly functioning users.
 *
 * abandoned temporarily to setup chat system as that's higher priority
 */
export declare function FirstTimeSetup(): void;
/**
 * Will get *all* messages that are in a chatroom.
 *
 * @todo Return only a set amount of messages to prevent the server from blowing up
 *
 * @param chatID The chatroom database ID, usually the name of the room
 */
export declare function ReturnMessages(chatID: string): void;
export declare function AddMessages(chatID: string, msgs: ChatMessage[]): void;
