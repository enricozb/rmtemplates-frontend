import React, { useState } from "react";
import { Modal } from "./Modal";
import { UploadModal } from "./UploadModal";

import "../css/Topbar.css";

import question from "../img/question.svg";
import plus from "../img/plus.svg";

function AboutModal() {
  return <p>About</p>;
}

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
            <AboutModal />
          </Modal>
        );

      case "upload":
        return (
          <Modal title="Upload Custom Template" onRequestHide={closeModal}>
            <UploadModal />
          </Modal>
        );
    }
  };

  return (
    <>
      {renderModal()}
      <div className="topbar">
        <button className="icon-button" onClick={() => setModal("about")}>
          <img src={question} alt="About button" /> About
        </button>
        Remarkable Templates
        <button className="icon-button" onClick={() => setModal("upload")}>
          Upload <img src={plus} alt="Upload button" />
        </button>
      </div>
    </>
  );
}
