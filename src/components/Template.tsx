import React from "react";
import { TemplateJSON } from "../types";

import "../css/Template.css";

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
        onClick={() => window.open(props.template.url)}
      />
      <div className="template-info">
        <p>
          <span style={{ fontWeight: 600 }}>{props.template.name}</span> -{" "}
          {props.template.author}
        </p>
      </div>
    </div>
  );
}
