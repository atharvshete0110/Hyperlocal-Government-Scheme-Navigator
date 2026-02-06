// import React from "react";
// import { LANGS, t } from "../services/i18n";

// export default function Header({ lang, setLang }) {
//   return (
//     <div className="card">
//       <div className="cardHeader">
//         <div>
//           <h1 className="h1">{t(lang, "title")}</h1>
//           <p className="sub">{t(lang, "subtitle")}</p>
//         </div>

//         <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
//           <span className="pill">{t(lang, "language")}</span>
//           <select
//             className="select"
//             value={lang}
//             onChange={(e) => setLang(e.target.value)}
//             style={{ width: 150 }}
//           >
//             {LANGS.map((l) => (
//               <option key={l.code} value={l.code}>
//                 {l.label}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// }






/////////////////////////////////////////////////////////////////////////////
// import React from "react";
// import { LANGS, t } from "../services/i18n";

// export default function Header({ lang, setLang }) {
//   return (
//     <div className="card">
//       <div className="cardHeader">
//         <div>
//           <h1 className="h1">{t(lang, "title")}</h1>
//           <p className="sub">{t(lang, "subtitle")}</p>
//         </div>

//         <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
//           <span className="pill">{t(lang, "language")}</span>
//           <select
//             className="select"
//             value={lang}
//             onChange={(e) => setLang(e.target.value)}
//             style={{ width: 150 }}
//           >
//             {LANGS.map((l) => (
//               <option key={l.code} value={l.code}>
//                 {l.label}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// }




// import React from "react";
// import { LANGS, t } from "../services/i18n";

// export default function Header({ lang, setLang }) {
//   return (
//     <div className="card">
//       <div className="cardHeader">
//         <div>
//           <h1 className="h1">{t(lang, "title")}</h1>
//           <p className="sub">{t(lang, "subtitle")}</p>
//         </div>

//         <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
//           <span className="pill">{t(lang, "language")}</span>
//           <select
//             className="select"
//             value={lang}
//             onChange={(e) => setLang(e.target.value)}
//             style={{ width: 150 }}
//           >
//             {LANGS.map((l) => (
//               <option key={l.code} value={l.code}>
//                 {l.label}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// }



import React from "react";
import { LANGS, t } from "../services/i18n";

export default function Header({ lang, setLang }) {
  return (
    <div className="card">
      <div className="cardHeader">
        <div>
          <h1 className="h1">{t(lang, "title")}</h1>
          <p className="sub">{t(lang, "subtitle")}</p>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span className="pill">{t(lang, "language")}</span>
          <select
            className="select"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            style={{ width: 150 }}
          >
            {LANGS.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}