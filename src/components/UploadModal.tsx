import React, { useState, ChangeEvent, DragEvent } from "react";

import "../css/UploadModal.css";

type DragAndDropTemplateProps = {
  landscape: Boolean;
  setFile: (file: File) => void;
};

function DragAndDropTemplate(props: DragAndDropTemplateProps) {
  const [isInside, setIsInside] = useState(false);
  const [file, setLocalFile] = useState(null as File | null);

  const setFile = (file: File) => {
    setLocalFile(file);
    props.setFile(file);
  };

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

  const inputRef = React.createRef<HTMLInputElement>();

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
        onClick={() => inputRef.current?.click()}
      >
        <input
          type="file"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setFile(e.target.files![0]);
          }}
        />
        Click to upload a template or drag and drop here.
      </div>
    </div>
  );
}

export function UploadModal() {
  // form values
  const [file, setFile] = useState(null as File | null);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([] as string[]);
  const [landscape, setLandscape] = useState(false);

  const [error, setError] = useState("");

  const onCategoryChange = (
    e: ChangeEvent<HTMLInputElement>,
    category: string
  ) => {
    if (e.target.checked) {
      setCategories([...categories, category]);
    } else {
      setCategories(categories.filter((c) => c !== category));
    }
  };

  const onSubmit = () => {
    if (!file) {
      setError("No file was uploaded.");
    } else if (name === "") {
      setError("No name was given.");
    } else if (categories.length === 0) {
      setError("Select at least one category.");
    } else {
      setError("");
    }
  };

  return (
    <>
      <DragAndDropTemplate landscape={landscape} setFile={setFile} />
      <div className="upload-form">
        <div className="upload-form-line">
          <p>Name</p>
          <input
            type="text"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
          />
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

        {error && (
          <div className="upload-form-line upload-form-error">{error}</div>
        )}

        <div className="upload-form-line">
          <button className="upload-form-submit" onClick={onSubmit}>
            Upload
          </button>
        </div>
      </div>
    </>
  );
}
