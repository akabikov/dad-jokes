const API_URL = "https://icanhazdadjoke.com/";
const API_HEADERS = { Accept: "application/json" };

async function loadData() {
  let response = await fetch(API_URL, {
    headers: API_HEADERS,
  });

  if (response.ok) {
    let { id, joke } = await response.json();
    return { id, text: joke };
  } else {
    throw new Error("Can't load joke");
  }
}

export default loadData;
