import React from "react";
import { Loading } from "./Loading";
import { RadioButton } from "./Form";
import { Template } from "./Template";

import { fetchTemplates } from "../api";
import { TemplateJSON } from "../types";

import "../css/Grid.css";

function Categories(props: {
  landscape: Boolean;
  setLandscape: (landscape: Boolean) => void;
  selected: string;
  setSelected: (category: string) => void;
}) {
  return (
    <div className="categories">
      <div className="categories-list">
        {
          <div key="orientation" className="category-container">
            <li className="category">
              <RadioButton
                group="orientation"
                label="Portrait"
                defaultChecked={true}
                onTrue={() => props.setLandscape(false)}
              />
              &nbsp; &nbsp;
              <RadioButton
                group="orientation"
                label="Landscape"
                onTrue={() => props.setLandscape(true)}
              />
            </li>
          </div>
        }
        {["All", "Creative", "Grids", "Life/organize", "Lines"].map(
          (category) => (
            <div key={`${category}-div`} className="category-container">
              <li
                key={category}
                className={`category ${
                  category === props.selected ? "selected" : ""
                }`}
                onClick={() => props.setSelected(category)}
              >
                {category}
              </li>
            </div>
          )
        )}
      </div>
    </div>
  );
}

interface GridProps {}
interface GridState {
  loading: Boolean;
  landscape: Boolean;
  category: string;
  templates: TemplateJSON[];
}

export class Grid extends React.Component<GridProps, GridState> {
  constructor(props: GridProps) {
    super(props);
    this.state = {
      loading: true,
      landscape: false,
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

  setLandscape = (landscape: Boolean) => {
    this.setState({ ...this.state, landscape });
  };

  setCategory = (category: string) => {
    this.setState({ ...this.state, category });
  };

  selectedTemplates = () => {
    return this.state.templates.filter(
      (template) =>
        template.landscape === this.state.landscape &&
        (this.state.category === "All" ||
          template.categories.includes(this.state.category))
    );
  };

  render = () => {
    if (this.state.loading) {
      return <Loading />;
    } else {
      return (
        <>
          <Categories
            landscape={this.state.landscape}
            setLandscape={this.setLandscape}
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
