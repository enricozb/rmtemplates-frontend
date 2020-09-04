import React from "react";
import "../css/App.css";

import { Grid } from "./Grid";
import { Topbar } from "./Topbar";

function App() {
  return (
    <div className="container">
      <Topbar />
      <Grid />
    </div>
  );
}

export default App;
