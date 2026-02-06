// import React, { useEffect, useRef, useState } from "react";
// import MessageBubble from "./MessageBubble";
// import VoiceControls from "./VoiceControls";
// import SchemeCards from "./SchemeCards";
// import { sendChat, synthesizeSpeech } from "../services/api";
// import { t } from "../services/i18n";

// export default function ChatWindow({ lang, profile, toast }) {
//   const [messages, setMessages] = useState([
//     {
//       role: "assistant",
//       content:
//         "Tell me your age, income, state/district and occupation. I will suggest government schemes and guide you to apply."
//     }
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [schemes, setSchemes] = useState([]);
//   const [speakEnabled, setSpeakEnabled] = useState(true);

//   const scrollRef = useRef(null);

//   useEffect(() => {
//     const el = scrollRef.current;
//     if (el) el.scrollTop = el.scrollHeight;
//   }, [messages, loading]);

//   async function speak(text) {
//     if (!speakEnabled) return;
//     try {
//       const audioUrl = await synthesizeSpeech({ text, language: lang });
//       const audio = new Audio(audioUrl);
//       await audio.play();
//       // cleanup later
//       setTimeout(() => URL.revokeObjectURL(audioUrl), 30_000);
//     } catch (e) {
//       // If TTS fails, don’t break chat
//       toast?.(`Voice output failed: ${e.message}`);
//     }
//   }

//   async function onSend() {
//     const q = input.trim();
//     if (!q || loading) return;

//     const nextMessages = [...messages, { role: "user", content: q }];
//     setMessages(nextMessages);
//     setInput("");
//     setLoading(true);

//     try {
//       const history = nextMessages
//         .slice(-10)
//         .map((m) => ({ role: m.role, content: m.content }));

//       const res = await sendChat({
//         message: q,
//         profile,
//         language: lang,
//         history
//       });

//       const answer = res.answer ?? "Sorry, I could not generate an answer.";
//       const newSchemes = Array.isArray(res.schemes) ? res.schemes : [];

//       setMessages((m) => [...m, { role: "assistant", content: answer }]);
//       if (newSchemes.length) setSchemes(newSchemes);

//       await speak(answer);
//     } catch (e) {
//       toast?.(e.message);
//       setMessages((m) => [
//         ...m,
//         { role: "assistant", content: "Error: Unable to reach server. Please try again." }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   }

//   function onKeyDown(e) {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       onSend();
//     }
//   }

//   return (
//     <div className="card chatWrap">
//       <div className="cardHeader">
//         <h2 className="h1">{t(lang, "chat")}</h2>
//         <span className="pill">{loading ? "Thinking…" : "Ready"}</span>
//       </div>

//       <div className="messages" ref={scrollRef}>
//         {messages.map((m, idx) => (
//           <MessageBubble
//             key={idx}
//             role={m.role}
//             content={m.content}
//             meta={m.role === "assistant" ? `lang=${lang}` : null}
//           />
//         ))}
//         {loading ? <MessageBubble role="assistant" content="…" /> : null}

//         <SchemeCards lang={lang} schemes={schemes} />
//       </div>

//       <div className="chatComposer">
//         <div style={{ flex: 1 }}>
//           <div className="label">{t(lang, "ask")}</div>
//           <textarea
//             className="textarea"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={onKeyDown}
//             placeholder="e.g., I am 23, income 2L, Pune. Which schemes for education?"
//           />
//           <VoiceControls
//             lang={lang}
//             inputText={input}
//             setInputText={setInput}
//             speakEnabled={speakEnabled}
//             setSpeakEnabled={setSpeakEnabled}
//           />
//         </div>

//         <button className="btn btnPrimary" onClick={onSend} disabled={loading || !input.trim()}>
//           {t(lang, "send")}
//         </button>
//       </div>
//     </div>
//   );
// }







import React, { useState } from "react";
import { t } from "../services/i18n";

export default function ChatWindow({ lang, profile, toast }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: t(lang, "welcomeMessage"),
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = {
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Simulate API call (replace with real API later)
    setTimeout(() => {
      const botMsg = {
        role: "assistant",
        content: `I received: "${input}". Backend connection needed to process this properly.`,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMsg]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="card">
      <div className="cardHeader">
        <h2 className="h1">{t(lang, "chatTitle")}</h2>
      </div>

      <div className="chatWrap">
        <div className="messages">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={msg.role === "user" ? "msg msgUser" : "msg msgBot"}
            >
              {msg.content}
              <div className="msgMeta">
                {msg.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))}
          {loading && (
            <div className="msg msgBot">
              <div style={{ display: "flex", gap: 4 }}>
                <span>●</span>
                <span>●</span>
                <span>●</span>
              </div>
            </div>
          )}
        </div>

        <div className="chatComposer">
          <textarea
            className="textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder={t(lang, "typeMessage")}
            style={{ minHeight: 60 }}
          />
          <button
            className="btn btnPrimary"
            onClick={sendMessage}
            disabled={loading || !input.trim()}
          >
            {t(lang, "send")}
          </button>
        </div>
      </div>
    </div>
  );
}