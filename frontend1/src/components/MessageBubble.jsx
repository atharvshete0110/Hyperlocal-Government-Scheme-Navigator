import React from "react";

export default function MessageBubble({ role, content, meta }) {
  const isUser = role === "user";
  return (
    <div className={`msg ${isUser ? "msgUser" : "msgBot"}`}>
      {content}
      {meta ? <div className="msgMeta">{meta}</div> : null}
    </div>
  );
}
