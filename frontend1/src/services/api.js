const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

async function httpJson(path, { method = "GET", body, headers } = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {})
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${method} ${path} failed (${res.status}): ${text || res.statusText}`);
  }
  return res.json();
}

/**
 * Expected backend contract (you can align FastAPI accordingly):
 * POST /chat
 * body: { message: string, profile: {...}, language: string, history?: [{role, content}] }
 * returns: { answer: string, schemes?: Array<{id,title,summary,tags?:string[], url?:string}> }
 */
export async function sendChat({ message, profile, language, history }) {
  return httpJson("/chat", {
    method: "POST",
    body: { message, profile, language, history }
  });
}

/**
 * Optional: fetch all schemes or filtered schemes
 * GET /schemes?state=&occupation=&...
 */
export async function fetchSchemes(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const path = qs ? `/schemes?${qs}` : "/schemes";
  return httpJson(path);
}

/**
 * TTS: backend returns audio bytes
 * POST /tts -> audio/mpeg or audio/wav
 */
export async function synthesizeSpeech({ text, language }) {
  const res = await fetch(`${API_BASE_URL}/tts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, language })
  });
  if (!res.ok) {
    const textErr = await res.text().catch(() => "");
    throw new Error(`TTS failed (${res.status}): ${textErr || res.statusText}`);
  }
  const blob = await res.blob();
  return URL.createObjectURL(blob);
}

/**
 * Health check (optional)
 */
export async function ping() {
  return httpJson("/health");
}
