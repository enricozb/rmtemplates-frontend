import React, { useState } from "react";
import { Loading } from "./Loading";

import { fetchTemplates } from "../api";
import { TemplateJSON } from "../types";

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

interface GridProps {};
interface GridState {
  loading: Boolean;
  templates: TemplateJSON[];
};

export class Grid extends React.Component<GridProps, GridState> {
  constructor(props: GridProps) {
    super(props);
    this.state = {
      loading: true,
      templates: [] as TemplateJSON[],
    };
  }

  componentDidMount = () => {
    fetchTemplates().then((templates) => {
      this.setState({
        loading: false,
        templates
      });
    });
  }

  render = () => {
    if (this.state.loading) {
      return <Loading />;
    } else {
      return (
        <>
          <Categories />
          <div className="grid">grid</div>
        </>
      );
    }
  }
}
