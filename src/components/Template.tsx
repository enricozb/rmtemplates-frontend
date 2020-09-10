import React from "react";

import "../css/Template.css";

import { TemplateJSON } from "../types";

export function Template(props: { template: TemplateJSON }) {
  const imgClassName = props.template.landscape
    ? "template-landscape"
    : "template-portrait";

  return (
    <div className="template">
      <img
        className={imgClassName}
        alt={`template ${props.template.name}`}
        src={props.template.url}
      />
      <p className="template-name">{props.template.name}</p>
    </div>
  );
}
