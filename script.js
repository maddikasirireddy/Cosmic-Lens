document.addEventListener("DOMContentLoaded", () => {

const API_KEY = "KUqJaTchpwr9mOjXBFpJL4Mixy2BlKXa0qwye3Zi";

let apodData = [];

const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");
const toggleBtn = document.getElementById("themeToggle");

// 🚀 FETCH APOD
async function getAPOD() {
  const date = document.getElementById("datePicker").value;

  let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

  if (date) {
    url += `&date=${date}`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();

    apodData = [data]; // always store as array
    render(apodData);

  } catch (err) {
    console.log(err);
  }
}
  
async function getRandomAPOD() {
  let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=10`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    apodData = data; // array of 10
    render(apodData);

  } catch (err) {
    console.log(err);
  }
}

document.getElementById("randomBtn").addEventListener("click", getRandomAPOD);

// 🎨 RENDER
function render(items) {
  const container = document.getElementById("container");
  container.innerHTML = "";

  // 🚀 FILTER OUT BAD DATA FIRST
  const validItems = items.filter(item =>
    item &&
    item.url &&
    (item.media_type === "image" || item.media_type === "video")
  );

  if (validItems.length === 0) {
    container.innerHTML = "<p>No valid space data found 🚀</p>";
    return;
  }

  validItems.forEach(item => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.explanation}</p>
      ${
        item.media_type === "image"
          ? `<img src="${item.url}" width="300"/>`
          : `<iframe src="${item.url}" width="300"></iframe>`
      }
    `;

    container.appendChild(div);
  });
}
// 🔍 SEARCH + FILTER
function updateDisplay() {
  const searchValue = searchInput.value.toLowerCase();
  const filterValue = filterSelect.value;

  const filtered = apodData
    .filter(item =>
      item.title.toLowerCase().includes(searchValue) ||
      item.explanation.toLowerCase().includes(searchValue)
    )
    .filter(item => {
      if (filterValue === "image") return item.media_type === "image";
      if (filterValue === "video") return item.media_type === "video";
      return true;
    });

  render(filtered);
}

// 🎧 EVENTS
searchInput.addEventListener("input", updateDisplay);
filterSelect.addEventListener("change", updateDisplay);
document.getElementById("datePicker").addEventListener("change", getAPOD);

// 🌗 DARK MODE (FIXED)
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    toggleBtn.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  } else {
    toggleBtn.textContent = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  }
});

// 💾 LOAD THEME
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light");
  toggleBtn.textContent = "🌙 Dark Mode";
}

// 🚀 INITIAL LOAD
getAPOD();

});
function goFull() {
  const img = document.getElementById("mainImg");

  if (img) {
    if (img.requestFullscreen) {
      img.requestFullscreen();
    } else {
      alert("Fullscreen not supported");
    }
  }
}