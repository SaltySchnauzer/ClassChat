import React from "react";
import { ChatMessage } from "@chat/types";
import Message from "./message";
import { style } from "typestyle";

export default function ChatReceiver({
  msgs,
}: {
  msgs: ChatMessage[];
}): JSX.Element {
  let css = style({
    backgroundColor: "#36393F",
    borderRadius: "1em",
    padding: "1em",
    color: "#767D8B",
    position: "relative",
    overflowY: "scroll",
    top: 0,
    bottom: 0,
    scrollMarginBlock: 40,
  });

  return (
    <div className={css}>
      {msgs.map((value, index) => {
        return <Message content={value} key={index} />;
      })}
    </div>
  );
}
