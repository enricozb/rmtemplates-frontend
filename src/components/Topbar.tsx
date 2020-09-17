import React, { useState } from "react";
import { Modal } from "./Modal";
import { UploadModal } from "./UploadModal";

import "../css/Topbar.css";

import question from "../img/question.svg";
import plus from "../img/plus.svg";

function AboutModal() {
  return (
    <div className="faq">
      <p>
        <h1>How To Use a Template</h1>
        Refer to{" "}
        <a href="https://remarkablewiki.com/tips/templates">
          reMarkable wiki entry
        </a>{" "}
        on this topic.
      </p>

      <p>
        <h1>Uploading Landscape Templates</h1>
        Landscape templates do not need to be rotated, and should be the same
        orientation as portrait templates, 1404x1872 pixels.
      </p>

      <p>
        <h1>How To Delete a Template</h1>
        Please file an issue to the{" "}
        <a href="https://github.com/enricozb/remarkable-templates">
          remarkable-templates
        </a>{" "}
        github repository with the name and author of the template you wish to
        delete.
      </p>

      <p>
        <h1>Source & Bug Reporting</h1>
        The source code of this site is at the{" "}
        <a href="https://github.com/enricozb/remarkable-templates">
          remarkable-templates
        </a>{" "}
        github repository. Please report any issues or bugs that you may find to
        that repository as well.
      </p>

      <p>
        <h1>Disclaimer</h1>
        This website was made by <a href="https://ezb.io/">
          Enrico Z. Borba
        </a>{" "}
        not by the reMarkable team, and is not affiliated with them in any way.
        The resemblance of this website to the reMarkable companion app and
        tablet UI is deliberate in order to make the experience feel cohesive.
      </p>
    </div>
  );
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
