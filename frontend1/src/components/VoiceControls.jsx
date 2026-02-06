import React, { useEffect, useMemo, useRef, useState } from "react";
import { createSpeechRecognizer, langToSpeechLocale } from "../services/speech";
import { t } from "../services/i18n";

export default function VoiceControls({
  lang,
  inputText,
  setInputText,
  speakEnabled,
  setSpeakEnabled
}) {
  const [listening, setListening] = useState(false);
  const recogRef = useRef(null);

  const locale = useMemo(() => langToSpeechLocale(lang), [lang]);

  useEffect(() => {
    // Create recognizer once per language
    const recog = createSpeechRecognizer({
      lang: locale,
      onResult: (text) => setInputText(text),
      onError: () => setListening(false),
      onEnd: () => setListening(false)
    });
    recogRef.current = recog;
    return () => {
      try { recog?.stop?.(); } catch {}
    };
  }, [locale, setInputText]);

  function start() {
    if (!recogRef.current) return;
    setListening(true);
    try {
      recogRef.current.start();
    } catch {
      // start can throw if already started
    }
  }

  function stop() {
    if (!recogRef.current) return;
    setListening(false);
    try { recogRef.current.stop(); } catch {}
  }

  const speechSupported = !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  return (
    <div className="row" style={{ marginTop: 10 }}>
      <div>
        <div className="label">{t(lang, "voiceIn")}</div>
        <div className="btnRow">
          <button className="btn" onClick={start} disabled={!speechSupported || listening}>
            {t(lang, "start")}
          </button>
          <button className="btn btnDanger" onClick={stop} disabled={!speechSupported || !listening}>
            {t(lang, "stop")}
          </button>
        </div>
        {!speechSupported ? (
          <div className="smallNote">Voice input needs Chrome desktop / Android Chrome.</div>
        ) : (
          <div className="smallNote">{listening ? "Listening…" : "Not listening"}</div>
        )}
      </div>

      <div>
        <div className="label">{t(lang, "voiceOut")}</div>
        <div className="btnRow">
          <button
            className={`btn ${speakEnabled ? "btnPrimary" : ""}`}
            onClick={() => setSpeakEnabled((v) => !v)}
          >
            {speakEnabled ? "ON" : "OFF"}
          </button>
          <button className="btn" onClick={() => setInputText("")} disabled={!inputText}>
            {t(lang, "clear")}
          </button>
        </div>
        <div className="smallNote">If ON, bot replies will play via backend TTS.</div>
      </div>
    </div>
  );
}
