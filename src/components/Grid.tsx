import React, { useState } from "react";
import { Loading } from "./Loading";
import { Template } from "./Template";

import { fetchTemplates } from "../api";
import { TemplateJSON } from "../types";

import "../css/Grid.css";

function Categories(props: {
  selected: string;
  setSelected: (category: string) => void;
}) {
  return (
    <div className="categories">
      <div className="categories-list">
        {["All", "Creative", "Grids", "Life/organize", "Lines"].map(
          (category) => (
            <li
              key={category}
              className={`category ${
                category === props.selected ? "selected" : ""
              }`}
              onClick={() => props.setSelected(category)}
            >
              {category}
            </li>
          )
        )}
      </div>
    </div>
  );
}

interface GridProps {}
interface GridState {
  loading: Boolean;
  category: string;
  templates: TemplateJSON[];
}

export class Grid extends React.Component<GridProps, GridState> {
  constructor(props: GridProps) {
    super(props);
    this.state = {
      loading: true,
      category: "All",
      templates: [] as TemplateJSON[],
    };
  }

  componentDidMount = () => {
    fetchTemplates().then((templates) => {
      this.setState({
        loading: false,
        templates,
      });
    });
  };

  setCategory = (category: string) => {
    this.setState({ ...this.state, category });
  };

  selectedTemplates = () => {
    return this.state.templates.filter((template) =>
      this.state.category === "All" ||
      template.categories.includes(this.state.category)
    );
  };

  render = () => {
    if (this.state.loading) {
      return <Loading />;
    } else {
      return (
        <>
          <Categories
            selected={this.state.category}
            setSelected={this.setCategory}
          />
          <div className="grid">
            {this.selectedTemplates().map((template) => (
              <Template key={template.url} template={template} />
            ))}
          </div>
        </>
      );
    }
  };
}
