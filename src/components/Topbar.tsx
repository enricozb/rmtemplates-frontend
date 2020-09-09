import React, { useState, ChangeEvent } from "react";

import { Modal } from "./Modal";

import "../css/Topbar.css";

import question from "../img/question.svg";
import plus from "../img/plus.svg";

function AboutModal() {
  return <p>About</p>;
}

function UploadModal() {
  const [categories, setCategories] = useState(new Set() as Set<string>);

  const onCategoryChange = (
    e: ChangeEvent<HTMLInputElement>,
    category: string
  ) => {
    if (e.target.checked) {
      setCategories(new Set([...Array.from(categories), category]));
    } else {
      setCategories(
        new Set([...Array.from(categories)].filter((cat) => cat !== category))
      );
    }
  };

  const [landscape, setLandscape] = useState(false);

  return (
    <>
      <div className={`upload-area ${landscape ? "upload-area-landscape" : ""}`}>
        Click to upload a template or drop it here.
      </div>
      <div className="upload-form">
        <div className="upload-form-line">
          <p>Name</p>
          <input type="text" />
        </div>
        <div className="upload-form-line">
          <p>Categories</p>
          {["Creative", "Grids", "Life/organize", "Lines"].map(
            (category, i) => (
              <label key={i}>
                <input
                  type="checkbox"
                  name="category"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onCategoryChange(e, category)
                  }
                />
                {category}
              </label>
            )
          )}
        </div>

        <div className="upload-form-line">
          <p>Orientation</p>
          <label>
            <input
              type="radio"
              name="orientation"
              checked={!landscape}
              onChange={() => setLandscape(false)}
            />{" "}
            Portrait
          </label>
          <label>
            <input
              type="radio"
              name="orientation"
              checked={landscape}
              onChange={() => setLandscape(true)}
            />{" "}
            Landscape
          </label>
        </div>
      </div>
    </>
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
