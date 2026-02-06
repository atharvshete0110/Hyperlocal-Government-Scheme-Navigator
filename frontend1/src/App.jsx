// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App



// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// import React, { useMemo, useState } from "react";
// import Header from "./components/Header";
// import ProfileForm from "./components/ProfileForm";
// import ChatWindow from "./components/ChatWindow";
// import Toast from "./components/Toast";

// const DEFAULT_PROFILE = {
//   age: "",
//   income: "",
//   state: "",
//   district: "",
//   occupation: "",
//   category: ""
// };

// export default function App() {
//   const [lang, setLang] = useState("en");
//   const [profile, setProfile] = useState(DEFAULT_PROFILE);

//   const [toastMsg, setToastMsg] = useState("");
//   const toast = (msg) => setToastMsg(msg);

//   const profileNormalized = useMemo(() => {
//     // Keep backend clean: convert numbers safely
//     const toNum = (v) => {
//       if (v === "" || v === null || v === undefined) return null;
//       const n = Number(v);
//       return Number.isFinite(n) ? n : null;
//     };
//     return {
//       age: toNum(profile.age),
//       income: toNum(profile.income),
//       state: profile.state?.trim() || null,
//       district: profile.district?.trim() || null,
//       occupation: profile.occupation?.trim() || null,
//       category: profile.category?.trim() || null
//     };
//   }, [profile]);

//   return (
//     <div className="container">
//       <Header lang={lang} setLang={setLang} />

//       <div style={{ height: 14 }} />

//       <div className="grid">
//         <ProfileForm
//           lang={lang}
//           profile={profile}
//           setProfile={setProfile}
//           onReset={() => setProfile(DEFAULT_PROFILE)}
//         />

//         <ChatWindow lang={lang} profile={profileNormalized} toast={toast} />
//       </div>

//       <Toast
//         title="Info"
//         message={toastMsg}
//         onClose={() => setToastMsg("")}
//       />
//     </div>
//   );
// }



import React, { useMemo, useState } from "react";
import "./index.css"; // IMPORTANT: use the global styles I gave (container/grid etc.)

import Header from "./components/Header";
import ProfileForm from "./components/ProfileForm";
import ChatWindow from "./components/ChatWindow";
import Toast from "./components/Toast";

const DEFAULT_PROFILE = {
  age: "",
  income: "",
  state: "",
  district: "",
  occupation: "",
  category: ""
};

export default function App() {
  const [lang, setLang] = useState("en");
  const [profile, setProfile] = useState(DEFAULT_PROFILE);

  const [toastMsg, setToastMsg] = useState("");
  const toast = (msg) => setToastMsg(msg);

  const profileNormalized = useMemo(() => {
    const toNum = (v) => {
      if (v === "" || v === null || v === undefined) return null;
      const n = Number(v);
      return Number.isFinite(n) ? n : null;
    };

    return {
      age: toNum(profile.age),
      income: toNum(profile.income),
      state: profile.state?.trim() || null,
      district: profile.district?.trim() || null,
      occupation: profile.occupation?.trim() || null,
      category: profile.category?.trim() || null
    };
  }, [profile]);

  return (
    <div className="container">
      <Header lang={lang} setLang={setLang} />

      <div style={{ height: 14 }} />

      <div className="grid">
        <ProfileForm
          lang={lang}
          profile={profile}
          setProfile={setProfile}
          onReset={() => setProfile(DEFAULT_PROFILE)}
        />

        <ChatWindow lang={lang} profile={profileNormalized} toast={toast} />
      </div>

      <Toast title="Info" message={toastMsg} onClose={() => setToastMsg("")} />
    </div>
  );
}







// // import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// import React, { useMemo, useState } from "react";
// import Header from "./components/Header";
// import ProfileForm from "./components/ProfileForm";
// import ChatWindow from "./components/ChatWindow";
// import Toast from "./components/Toast";

// export default function App() {
//   return (
//     <div style={{ padding: 40, fontSize: 24 }}>
//       ✅ React is working
//     </div>
//   );
// }