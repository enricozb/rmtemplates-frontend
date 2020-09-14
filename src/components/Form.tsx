import React, { useState } from "react";

import "../css/Form.css";
import landscape_img from "../img/landscape.png";
import portrait_img from "../img/portrait.png";
import search_img from "../img/search.png";

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
  setSearching: React.Dispatch<React.SetStateAction<boolean>>;
};

export function SearchButton({searching, setSearching}: SearchButtonProps) {
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
        <input type="text" />
        <p className="search-hide" onClick={() => setSearching(false)}>Hide</p>
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
