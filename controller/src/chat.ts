import ws from "ws";
import { ChatSocketMessage, ChatMessage } from "@chat/types";
import { ReturnMessages, AddMessages } from "@chat/model";

export class Chat {
  wss: ws.Server = new ws.Server({ port: 3694 });
  messages: ChatMessage[] = [
    {
      sender: "test man",
      content: "you are dumb, and another thing, you are ugly",
    },
  ];
  connected: ws[] = [];
  userCounter: number = 0;
  constructor() {
    //setup websocket responses
    this.wss.on("connection", (socket) => {
      //add to list of clients
      this.connected.push(socket);

      //setup ping/pong system
      //i think this is one per instance of connection but i'm not sure
      //@todo check if it's global or local variable but it should be fine for now
      //having one client with a shoddy connection causing the rest to disconnect is fiiiine
      let ponged: boolean = true;

      let counter = this.userCounter;
      let anonUsername = "";
      this.userCounter++;
      //starts interval to send a pong
      //if no pong, kills interval and client with a vicious knife
      //think julius ceasar but an angry sysadmin instead.
      let pongID = setInterval(() => {
        if (ponged) {
          ponged = false;
          socket.send(JSON.stringify({ type: "ping" } as ChatSocketMessage));
        } else {
          console.log(
            `killed client ${counter}, clients left alive: ${
              this.connected.length - 1
            } shamk`
          );
          this.connected.splice(
            this.connected.findIndex((value) => value == socket),
            1
          );
          socket.terminate();
          clearInterval(pongID);
        }
      }, 3000);

      //send message history
      socket.send(
        JSON.stringify({
          type: "loadmsg",
          content: this.messages,
        } as ChatSocketMessage)
      );

      //setup message reply logic
      socket.on("message", (data) => {
        //parse JSON
        let message: ChatSocketMessage = JSON.parse(data.toString());
        switch (message.type) {
          case "ping":
            //received pong
            ponged = true;
            break;
          //message being sent by user
          case "sendmsg":
            //authenticate user session

            //add message to database
            let msg = {
              sender:
                anonUsername == ""
                  ? `anon user ${counter}`
                  : `${anonUsername} (${counter})`,
              content: message.content,
            } as ChatMessage;
            if (msg.content == "") {
              //now what are you going to do now jasper
              break;
            }
            //AddMessages(message.chatID, [msg]);
            this.messages.push(msg);

            //update all connected users with message
            this.connected.forEach((value) => {
              value.send(
                JSON.stringify({
                  type: "loadmsg",
                  content: [msg],
                } as ChatSocketMessage)
              );
            });
            break;
          case "loadmsg":
            socket.send(JSON.stringify(ReturnMessages(message.chatID)));
            break;
          case "anonname":
            anonUsername = message.name;
            break;
          default:
            break;
        }
      });
    });
  }
}
