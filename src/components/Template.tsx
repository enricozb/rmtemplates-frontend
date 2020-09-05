import React from "react";

import "../css/Template.css";

import { TemplateJSON } from "../types";


export function Template(props: { template: TemplateJSON }) {
  return (
    <div className="template">
      <img alt={`${props.template.name} template`} src={props.template.url} />
      <p className="template-name">{props.template.name}</p>
    </div>
  );
}
