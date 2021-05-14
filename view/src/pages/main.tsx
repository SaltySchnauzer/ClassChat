import React from "react";
import Chat from "../components/chat";
import { style } from "typestyle";
export default function MainPage(): JSX.Element {
  const css = style({
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    overflowX: "hidden",
  });
  return (
    <div className={css}>
      <Chat chatID="main" />
    </div>
  );
}
