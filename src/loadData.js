const API_URL = "https://icanhazdadjoke.com/";
const API_HEADERS = { Accept: "application/json" };

async function loadData() {
  let response = await fetch(API_URL, {
    headers: API_HEADERS,
  });

  if (response.ok) {
    let json = await response.json();
    return json;
  } else {
    throw new Error("Can't load joke");
  }
}

export default loadData;
