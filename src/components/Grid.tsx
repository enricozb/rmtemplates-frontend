import React, { useState } from "react";

import "../css/Grid.css";

function Categories() {
  const [selected, setSelected] = useState("All");

  return (
    <div className="categories">
      <div className="categories-list">
        {["All", "Creative", "Grids", "Life/organize", "Lines"].map(
          (category) => (
            <li
              key={category}
              className={`category ${category === selected ? "selected" : ""}`}
              onClick={() => setSelected(category)}
            >
              {category}
            </li>
          )
        )}
      </div>
    </div>
  );
}

export function Grid() {
  return (
    <>
      <Categories />
      <div className="grid">grid</div>
    </>
  );
}
