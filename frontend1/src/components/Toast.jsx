// import React from "react";

// export default function Toast({ title, message, onClose }) {
//   if (!message) return null;
//   return (
//     <div className="toast" onClick={onClose} role="button" tabIndex={0}>
//       <p className="toastTitle">{title || "Notice"}</p>
//       <p className="toastMsg">{message}</p>
//     </div>
//   );
// }





import React, { useEffect } from "react";

export default function Toast({ title, message, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="toast">
      <h3 className="toastTitle">{title}</h3>
      <p className="toastMsg">{message}</p>
    </div>
  );
}