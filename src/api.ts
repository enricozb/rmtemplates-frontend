// const endpoint = "https://storage.googleapis.com/remarkable-templateshttps://storage.googleapis.com/remarkable-templates";
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
