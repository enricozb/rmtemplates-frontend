import React, { useState } from "react";

import "../css/Form.css";
import portrait_img from "../img/portrait.png";
import landscape_img from "../img/landscape.png";

type OrientationButtonProps = {
  landscape: Boolean;
  setLandscape: (landscape: Boolean) => void;
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
        src={props.landscape ? landscape_img : portrait_img}
      />
    </button>
  );
}

type RadioButtonProps = {
  defaultChecked?: Boolean;
  group: string;
  label: string;
  onTrue: () => void;
};

export function RadioButton(props: RadioButtonProps) {
  return (
    <label className="radio-input">
      <input
        type="radio"
        defaultChecked={Boolean(props.defaultChecked)}
        name={props.group}
        onChange={props.onTrue}
      />
      <span className="radio-label">{props.label}</span>
    </label>
  );
}
