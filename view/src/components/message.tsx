import React from "react";
import { ChatMessage } from "@chat/types";
import { style } from "typestyle";

export default function Message({
  content,
}: {
  content: ChatMessage;
}): JSX.Element {
  let css = style({ padding: "0.5em", borderTop: "0.25em dotted #0A0A0C" });
  let name = style({ overflowX: "hidden", height: "1em" });
  return (
    <div className={css}>
      <div className={name}>{content.sender}</div>
      <div>{content.content}</div>
    </div>
  );
}
