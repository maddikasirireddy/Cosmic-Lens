document.addEventListener("DOMContentLoaded", () => {

  const API_KEY = "7w6pjVtrKZyi50nO2DRl3g7csbQNqpzyrOy891LY";

  async function getAPOD() {
    const date = document.getElementById("datePicker").value;

    let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

    if (date) {
      url += `&date=${date}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();

      document.getElementById("title").textContent = data.title;
      document.getElementById("desc").textContent = data.explanation;
      document.getElementById("img").src = data.url;

    } catch (err) {
      console.log(err);
    }
  }

  document.getElementById("datePicker").addEventListener("change", getAPOD);

  getAPOD();

});

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
const fullBtn = document.getElementById("fullBtn");
const img = document.getElementById("img");

fullBtn.addEventListener("click", () => {
  if (!img.src) return;

  if (img.requestFullscreen) {
    img.requestFullscreen();
  } else if (img.webkitRequestFullscreen) {
    img.webkitRequestFullscreen();
  } else if (img.msRequestFullscreen) {
    img.msRequestFullscreen();
  } else {
    alert("Fullscreen not supported");
  }
});
if (data.media_type === "image") {
  document.getElementById("img").style.display = "block";
  document.getElementById("img").src = data.url;
} else {
  document.getElementById("img").style.display = "none";
}