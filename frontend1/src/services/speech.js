// Browser SpeechRecognition wrapper (works best on Chrome)
export function createSpeechRecognizer({ lang = "en-IN", onResult, onError, onEnd }) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return null;

  const recog = new SR();
  recog.lang = lang;
  recog.interimResults = true;
  recog.continuous = true;

  recog.onresult = (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    onResult?.(transcript, event.results[event.results.length - 1]?.isFinal === true);
  };

  recog.onerror = (e) => onError?.(e);
  recog.onend = () => onEnd?.();

  return recog;
}

export function langToSpeechLocale(appLang) {
  if (appLang === "hi") return "hi-IN";
  if (appLang === "mr") return "mr-IN";
  return "en-IN";
}
