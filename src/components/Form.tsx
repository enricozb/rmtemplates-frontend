import React, { useState, ChangeEvent } from "react";

import "../css/Form.css";
import landscape_img from "../img/landscape.png";
import portrait_img from "../img/portrait.png";
import search_img from "../img/search.png";
import close_img from "../img/close-black.svg";

type OrientationButtonProps = {
  landscape: boolean;
  setLandscape: (landscape: boolean) => void;
};

export function OrientationButton(props: OrientationButtonProps) {
  const [landscape, setLandscape] = useState(props.landscape);

  const swapLandscape = () => {
    setLandscape(!landscape);
    props.setLandscape(!landscape);
  };

  return (
    <button className="orientation-button" onClick={swapLandscape}>
      <img
        className="orientation-img"
        alt="Portrait or landscape icon"
        src={props.landscape ? landscape_img : portrait_img}
      />
    </button>
  );
}

type SearchButtonProps = {
  searching: boolean;
  setSearching: (searching: boolean) => void;
  searchText: string;
  setSearchText: (searchText: string) => void;
};

export function SearchButton({
  searching,
  setSearching,
  searchText,
  setSearchText,
}: SearchButtonProps) {
  if (searching) {
    return (
      <>
        <button className="search-button">
          <img
            className="search-img"
            alt="Search filter for templates"
            src={search_img}
          />
        </button>
        <input
          type="text"
          value={searchText}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          className="search-close"
          onClick={() => setSearching(false)}
        >
          <img src={close_img} alt="Button to close searchbar" />
        </button>
      </>
    );
  }

  return (
    <button className="search-button">
      <img
        className="search-img"
        alt="Search filter for templates"
        src={search_img}
        onClick={() => setSearching(true)}
      />
    </button>
  );
}
