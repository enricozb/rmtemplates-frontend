import React, { useState } from "react";

import { Modal } from "./Modal";

import "../css/Topbar.css";

import question from "../img/question.svg";
import plus from "../img/plus.svg";


export function Topbar() {
  const [modal, setModal] = useState("");

  const closeModal = () => {
    setModal("");
  };

  const renderModal = () => {
    switch (modal) {
      case "":
        return <> </>;

      case "about":
        return (
          <Modal title="About" onRequestHide={closeModal}>
            Testing
          </Modal>
        );

      case "upload":
        return (
          <Modal title="Upload Custom Template" onRequestHide={closeModal}>
            Testing
          </Modal>
        );
    }
  };

  return (
    <>
      {renderModal()}
      <div className="topbar">
        <button className="icon-button" onClick={() => setModal("about")}>
          <img src={question} /> About
        </button>
        Remarkable Templates
        <button className="icon-button" onClick={() => setModal("upload")}>
          Upload <img src={plus} />
        </button>
      </div>
    </>
  );
}
