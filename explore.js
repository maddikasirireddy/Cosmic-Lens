document.addEventListener("DOMContentLoaded", () => {

  const API_KEY = "7w6pjVtrKZyi50nO2DRl3g7csbQNqpzyrOy891LY";
  let apodData = [];

  const searchInput = document.getElementById("search");
  const filterSelect = document.getElementById("filter");
  const randomBtn = document.getElementById("randomBtn");

  async function getRandomAPOD() {
    let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=10`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      apodData = data;
      render(apodData);

    } catch (err) {
      console.log(err);
    }
  }

  function render(items) {
    const container = document.getElementById("container");
    container.innerHTML = "";

    const validItems = items.filter(item =>
      item && item.url && item.media_type === "image"
    );

    if (validItems.length === 0) {
      container.innerHTML = "<p>No valid space images found 🚀</p>";
      return;
    }

    validItems.forEach(item => {
      const div = document.createElement("div");

      div.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.explanation}</p>
        <img src="${item.url}" width="300" class="space-img" />
        <br>
        <button class="full-btn">🔍 Fullscreen</button>
      `;

      const img = div.querySelector(".space-img");
      const btn = div.querySelector(".full-btn");

      btn.addEventListener("click", () => {
        goFull(img);
      });

      container.appendChild(div);
    });
  }
  function updateDisplay() {
    const searchValue = searchInput.value.toLowerCase();
    const filterValue = filterSelect.value;

    const filtered = apodData
      .filter(item => {
        const title = item.title ? item.title.toLowerCase() : "";
        const desc = item.explanation ? item.explanation.toLowerCase() : "";

        return title.includes(searchValue) || desc.includes(searchValue);
      })
      .filter(item => {
        if (filterValue === "image") return item.media_type === "image";
        if (filterValue === "video") return item.media_type === "video";
        return true;
      });

    render(filtered);
  }
  randomBtn.addEventListener("click", getRandomAPOD);
  searchInput.addEventListener("input", updateDisplay);
  filterSelect.addEventListener("change", updateDisplay);

});
function goFull(element) {
  if (!element) return;

  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else {
    alert("Fullscreen not supported");
  }
}

document.addEventListener("DOMContentLoaded", () => {

  const toggleBtn = document.getElementById("themeToggle");

  if (!toggleBtn) return;

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

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light");
    toggleBtn.textContent = "🌙 Dark Mode";
  } else {
    toggleBtn.textContent = "☀️ Light Mode";
  }

});
