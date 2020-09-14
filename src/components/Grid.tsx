import React, { useState } from "react";
import { Loading } from "./Loading";
import { OrientationButton, SearchButton } from "./Form";
import { Template } from "./Template";

import { fetchTemplates } from "../api";
import { TemplateJSON } from "../types";

import "../css/Grid.css";

import Fuse from "fuse.js";

function Categories(props: {
  landscape: boolean;
  setLandscape: (landscape: boolean) => void;
  selected: string;
  setSelected: (category: string) => void;
  searchText: string;
  setSearchText: (searchText: string) => void;
}) {
  const [searching, setSearching] = useState(false);

  if (searching) {
    return (
      <div className="categories">
        <div className="categories-list">
          <div key="search" className="category-container">
            <li className="category">
              <SearchButton
                searching={searching}
                setSearching={setSearching}
                searchText={props.searchText}
                setSearchText={props.setSearchText}
              />
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
            <SearchButton
              searching={searching}
              setSearching={setSearching}
              searchText={props.searchText}
              setSearchText={props.setSearchText}
            />
          </li>
        </div>
      </div>
    </div>
  );
}

interface GridProps {}
interface GridState {
  searchText: string;
  loading: boolean;
  landscape: boolean;
  category: string;
  templates: TemplateJSON[];
  fuse: Fuse<TemplateJSON>;
}

export class Grid extends React.Component<GridProps, GridState> {
  fuseOptions = {
    keys: ["author", "name"],
  };

  constructor(props: GridProps) {
    super(props);
    this.state = {
      searchText: "",
      loading: true,
      landscape: false,
      category: "All",
      templates: [] as TemplateJSON[],
      fuse: new Fuse([], this.fuseOptions),
    };
  }

  componentDidMount = () => {
    fetchTemplates().then((templates) => {
      this.setState({
        loading: false,
        templates,
        fuse: new Fuse(templates, this.fuseOptions),
      });
    });
  };

  setSearchText = (searchText: string) => {
    this.setState({ ...this.state, searchText });
  };

  setLandscape = (landscape: boolean) => {
    this.setState({ ...this.state, landscape });
  };

  setCategory = (category: string) => {
    this.setState({ ...this.state, category });
  };

  selectedTemplates = () => {
    const fuseResults: TemplateJSON[] = this.state.searchText
      ? this.state.fuse
          .search(this.state.searchText)
          .map((fuseResult) => fuseResult.item)
      : this.state.templates;

    return fuseResults.filter(
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
            searchText={this.state.searchText}
            setSearchText={this.setSearchText}
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
