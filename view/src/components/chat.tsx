import React, { useEffect } from "react";
import Sender from "./sender";
import Receiver from "./receiver";
import { ChatMessage, ChatSocketMessage } from "@chat/types";
import { style } from "typestyle";

export default function Chat({ chatID }: { chatID: string }): JSX.Element {
  // websocket setup here
  // socket setup works by remembering the socket details on re-render
  const socket = React.useMemo(
    () => new WebSocket(`ws://${location.hostname}:3694/chat/${chatID}`),
    []
  );
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  //message reception desk
  function receiveMessage(this: WebSocket, ev: MessageEvent) {
    const message = JSON.parse(ev.data) as ChatSocketMessage;
    switch (message.type) {
      case "loadmsg":
        setMessages(messages.concat(message.content));
        break;
      case "sendmsg":
        break;
      case "ping":
        socket.send(JSON.stringify({ type: "ping" } as ChatSocketMessage));
        break;
      default:
        break;
    }
  }
  //message receiver logic 😔😔😔😳
  useEffect(() => {
    //setup websocket listening thinga ma jig
    socket.addEventListener("message", receiveMessage);
    return () => {
      //stuff is out of date so kill it and it may work?
      //yeah this makes it work
      //if you remove i'll push you over
      socket.removeEventListener("message", receiveMessage);
    };
  });

  //message being sent 😳😳😳
  function sendMessage(message: string) {
    //do some stuff in here to update a client "waiting list" of messages that have been sent but not confirmed by the server
    socket.send(
      JSON.stringify({
        type: "sendmsg",
        content: message,
        chatID: chatID,
      } as ChatSocketMessage)
    );
  }

  function setUsername(name: string) {
    socket.send(
      JSON.stringify({
        type: "anonname",
        name: name,
      } as ChatSocketMessage)
    );
  }

  let css = style({
    position: "relative",
    backgroundColor: "#565B65",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    padding: "0.5em",
    width: "100%",
    overflowY: "scroll",
    flex: "1 0 auto",
  });
  return (
    <div className={css}>
      <Receiver msgs={messages} />
      <Sender sendFunc={sendMessage} setUsername={setUsername} />
    </div>
  );
}
