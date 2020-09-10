import React, { useState, ChangeEvent, DragEvent } from "react";

import { Modal } from "./Modal";

import "../css/Topbar.css";

import question from "../img/question.svg";
import plus from "../img/plus.svg";

function AboutModal() {
  return <p>About</p>;
}

function DragAndDropTemplate(props: { landscape: Boolean }) {
  const [isInside, setIsInside] = useState(false);
  const [file, setFile] = useState(null as File | null);

  const dragHandler = (handler: (e: DragEvent<HTMLDivElement>) => void) => {
    return (e: DragEvent<HTMLDivElement>) => {
      handler(e);
      e.stopPropagation();
      e.preventDefault();
    };
  };

  if (file) {
    const imgRef = React.createRef<HTMLImageElement>();

    const reader = new FileReader();
    reader.onload = () => {
      if (imgRef.current) {
        imgRef.current.src = reader.result as string;
      }
    };
    reader.readAsDataURL(file);

    return (
      <div className="drag-and-drop">
        <img
          alt={`Uploaded template ${file.name}`}
          ref={imgRef}
          className={
            props.landscape ? "template-landscape" : "template-portrait"
          }
        />
      </div>
    );
  }

  return (
    <div className="drag-and-drop">
      <div
        className={`upload-area ${
          props.landscape ? "upload-area-landscape" : ""
        } ${isInside ? "upload-area-drag" : ""}`}
        onDragOver={dragHandler(() => {})}
        onDrop={dragHandler((e) => {
          if (e.dataTransfer.items[0].kind === "file") {
            setFile(e.dataTransfer.files[0]);
          }
          setIsInside(false);
        })}
        onDragEnter={dragHandler(() => setIsInside(true))}
        onDragLeave={dragHandler(() => setIsInside(false))}
      >
        Click to upload a template or drop it here.
      </div>
    </div>
  );
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
      <DragAndDropTemplate landscape={landscape} />
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

        <div className="upload-form-line">
          <button className="upload-form-submit">Upload</button>
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
