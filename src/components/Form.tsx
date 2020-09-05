import React from "react";

import "../css/Form.css";

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
