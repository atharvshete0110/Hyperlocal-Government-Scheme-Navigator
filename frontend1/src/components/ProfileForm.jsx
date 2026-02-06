// import React from "react";
// import { t } from "../services/i18n";

// export default function ProfileForm({ lang, profile, setProfile, onReset }) {
//   function update(key, value) {
//     setProfile((p) => ({ ...p, [key]: value }));
//   }

//   return (
//     <div className="card">
//       <div className="cardHeader">
//         <h2 className="h1">{t(lang, "profile")}</h2>
//         <button className="btn" onClick={onReset}>
//           {t(lang, "clear")}
//         </button>
//       </div>

//       <div className="cardBody">
//         <div className="row">
//           <div>
//             <div className="label">{t(lang, "age")}</div>
//             <input
//               className="input"
//               type="number"
//               value={profile.age}
//               onChange={(e) => update("age", e.target.value)}
//               placeholder="e.g., 22"
//               min="0"
//             />
//           </div>
//           <div>
//             <div className="label">{t(lang, "income")}</div>
//             <input
//               className="input"
//               type="number"
//               value={profile.income}
//               onChange={(e) => update("income", e.target.value)}
//               placeholder="e.g., 250000"
//               min="0"
//             />
//           </div>
//         </div>

//         <div className="row">
//           <div>
//             <div className="label">{t(lang, "state")}</div>
//             <input
//               className="input"
//               value={profile.state}
//               onChange={(e) => update("state", e.target.value)}
//               placeholder="e.g., Maharashtra"
//             />
//           </div>
//           <div>
//             <div className="label">{t(lang, "district")}</div>
//             <input
//               className="input"
//               value={profile.district}
//               onChange={(e) => update("district", e.target.value)}
//               placeholder="e.g., Pune"
//             />
//           </div>
//         </div>

//         <div className="row">
//           <div>
//             <div className="label">{t(lang, "occupation")}</div>
//             <input
//               className="input"
//               value={profile.occupation}
//               onChange={(e) => update("occupation", e.target.value)}
//               placeholder="e.g., Student / Farmer / Private Job"
//             />
//           </div>
//           <div>
//             <div className="label">{t(lang, "category")}</div>
//             <input
//               className="input"
//               value={profile.category}
//               onChange={(e) => update("category", e.target.value)}
//               placeholder="e.g., SC / ST / OBC / General"
//             />
//           </div>
//         </div>

//         <div className="smallNote">
//           Tip: Fill only what you know. The assistant can ask follow-ups.
//         </div>
//       </div>
//     </div>
//   );
// }





import React from "react";
import { t } from "../services/i18n";

export default function ProfileForm({ lang, profile, setProfile, onReset }) {
  const update = (key, val) => setProfile({ ...profile, [key]: val });

  return (
    <div className="card">
      <div className="cardHeader">
        <h2 className="h1">{t(lang, "profileTitle")}</h2>
      </div>
      <div className="cardBody">
        <div className="row">
          <div>
            <label className="label">{t(lang, "age")}</label>
            <input
              type="number"
              className="input"
              value={profile.age}
              onChange={(e) => update("age", e.target.value)}
              placeholder="25"
            />
          </div>
          <div>
            <label className="label">{t(lang, "income")}</label>
            <input
              type="number"
              className="input"
              value={profile.income}
              onChange={(e) => update("income", e.target.value)}
              placeholder="300000"
            />
          </div>
        </div>

        <div className="row">
          <div>
            <label className="label">{t(lang, "state")}</label>
            <input
              type="text"
              className="input"
              value={profile.state}
              onChange={(e) => update("state", e.target.value)}
              placeholder="Maharashtra"
            />
          </div>
          <div>
            <label className="label">{t(lang, "district")}</label>
            <input
              type="text"
              className="input"
              value={profile.district}
              onChange={(e) => update("district", e.target.value)}
              placeholder="Pune"
            />
          </div>
        </div>

        <label className="label">{t(lang, "occupation")}</label>
        <select
          className="select"
          value={profile.occupation}
          onChange={(e) => update("occupation", e.target.value)}
        >
          <option value="">Select...</option>
          <option value="farmer">{t(lang, "farmer")}</option>
          <option value="student">{t(lang, "student")}</option>
          <option value="business">{t(lang, "business")}</option>
          <option value="employee">{t(lang, "employee")}</option>
          <option value="unemployed">{t(lang, "unemployed")}</option>
        </select>

        <label className="label">{t(lang, "category")}</label>
        <select
          className="select"
          value={profile.category}
          onChange={(e) => update("category", e.target.value)}
        >
          <option value="">Select...</option>
          <option value="general">{t(lang, "general")}</option>
          <option value="obc">{t(lang, "obc")}</option>
          <option value="sc">{t(lang, "sc")}</option>
          <option value="st">{t(lang, "st")}</option>
        </select>

        <div className="btnRow">
          <button className="btn btnPrimary" onClick={onReset}>
            {t(lang, "resetProfile")}
          </button>
        </div>
      </div>
    </div>
  );
}