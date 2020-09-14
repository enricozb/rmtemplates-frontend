import React, { useState } from "react";
import { Loading } from "./Loading";
import { OrientationButton, SearchButton } from "./Form";
import { Template } from "./Template";

import { fetchTemplates } from "../api";
import { TemplateJSON } from "../types";

import "../css/Grid.css";

function Categories(props: {
  landscape: boolean;
  setLandscape: (landscape: boolean) => void;
  selected: string;
  setSelected: (category: string) => void;
}) {
  const [searching, setSearching] = useState(false);

  if (searching) {
    return (
      <div className="categories">
        <div className="categories-list">
          <div key="search" className="category-container">
            <li className="category">
              <SearchButton searching={searching} setSearching={setSearching} />
            </li>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="categories">
      <div className="categories-list">
        <div
          key="orientation"
          className="category-container"
          onClick={() => props.setLandscape(!props.landscape)}
        >
          <li className="category">
            <OrientationButton
              landscape={props.landscape}
              setLandscape={props.setLandscape}
            />
          </li>
        </div>
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
        <div
          key="search"
          className="category-container"
          onClick={() => setSearching(true)}
        >
          <li className="category">
            <SearchButton searching={searching} setSearching={setSearching} />
          </li>
        </div>
      </div>
    </div>
  );
}

interface GridProps {}
interface GridState {
  loading: boolean;
  landscape: boolean;
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

  setLandscape = (landscape: boolean) => {
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
