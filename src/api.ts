// const endpoint = "https://storage.googleapis.com/remarkable-templates";
const endpoint = "/api";

async function loadFromurls(urls: string[]) {
  const templates = await Promise.all(
    urls.map((url) =>
      fetch(url)
        .then((res) => res.json())
        .then((json) => json)
    )
  );
  templates.sort((t1, t2) => t1.name.localeCompare(t2.name));
  return templates;
}

export function fetchTemplates() {
  return fetch(`${endpoint}/files`, {
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((urls) => loadFromurls(urls));
}

export function uploadFile(
  file: File,
  author: string,
  name: string,
  categories: string[],
  landscape: boolean
) {
  const formData = new FormData();
  formData.append("filedata", file);
  formData.append("author", author);
  formData.append("name", name);
  formData.append("categories", categories.join(","));
  formData.append("landscape", landscape.toString());

  return fetch("/api/upload", {
    method: "POST",
    body: formData,
  }).then((resp) => resp.json());
}
