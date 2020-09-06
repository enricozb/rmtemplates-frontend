import React from "react";
import ReactDOM from "react-dom";

import "../css/Modal.css";

import close from "../img/close.svg";

const modal_overlay_container = document.getElementById("modal-overlay-container");

type ModalProps = {
  title: string;
  onRequestHide: () => void;
};

export class Modal extends React.Component<ModalProps> {
  modalDiv: HTMLDivElement;

  constructor(props: ModalProps) {
    super(props);
    this.modalDiv = document.createElement("div");
    this.modalDiv.classList.add("modal");
    modal_overlay_container!.onclick = this.clickOutside;
  }

  componentDidMount = () => {
    modal_overlay_container!.style.display = "flex";
    document
      .getElementById("modal-overlay-container")!
      .appendChild(this.modalDiv);
  };

  componentWillUnmount = () => {
    modal_overlay_container!.style.display = "none";
    document
      .getElementById("modal-overlay-container")!
      .removeChild(this.modalDiv);
  };

  clickOutside = (e: Event) => {
    if (e.target === modal_overlay_container) {
      this.requestHide();
    }
  }

  requestHide = () => {
    this.props.onRequestHide();
  }

  render = () => {
    return ReactDOM.createPortal(
      <>
        <div className="topbar">
          <button className="icon-button" onClick={this.requestHide}>
            <img src={close} />
          </button>
          <div>{this.props.title}</div>
          <button className="icon-button phantom">
            <img src={close} />
          </button>
        </div>
        <div>{this.props.children}</div>
      </>,
      this.modalDiv
    );
  };
}
