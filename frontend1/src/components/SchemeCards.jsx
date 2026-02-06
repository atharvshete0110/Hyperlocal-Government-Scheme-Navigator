import React from "react";
import { t } from "../services/i18n";

export default function SchemeCards({ lang, schemes = [] }) {
  return (
    <div className="card" style={{ marginTop: 14 }}>
      <div className="cardHeader">
        <h3 className="h1">{t(lang, "matchedSchemes")}</h3>
        <span className="pill">{schemes.length}</span>
      </div>

      <div className="cardBody">
        {schemes.length === 0 ? (
          <p className="schemeText">{t(lang, "none")}</p>
        ) : (
          <div className="schemeList">
            {schemes.map((s) => (
              <div className="schemeCard" key={s.id || s.title}>
                <p className="schemeTitle">{s.title}</p>
                {s.summary ? <p className="schemeText">{s.summary}</p> : null}
                <div className="schemeTags">
                  {(s.tags || []).slice(0, 6).map((tag) => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                  {s.url ? (
                    <a className="tag" href={s.url} target="_blank" rel="noreferrer">
                      Open
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
