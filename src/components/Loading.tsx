import React from "react";

import "../css/Loading.css";

export function Loading() {
  // three inner divs b/c of the three dots
  return (
    <div className="loading-container">
      <div className="loading">
        <div>.</div>
        <div>.</div>
        <div>.</div>
      </div>
    </div>
  );
}
