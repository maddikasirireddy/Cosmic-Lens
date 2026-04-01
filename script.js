const API_KEY = "KUqJaTchpwr9mOjXBFpJL4Mixy2BlKXa0qwye3Zi";

async function getAPOD() {
  const date = document.getElementById("datePicker").value;

  let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
  if (date) {
    url += `&date=${date}`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();

    document.getElementById("title").innerText = data.title;
    document.getElementById("img").src = data.url;
    document.getElementById("desc").innerText = data.explanation;

  } catch (err) {
    console.log("Error:", err);
  }
    const imgEl = document.getElementById("img");

imgEl.classList.remove("fade-in"); 
void imgEl.offsetWidth; // reset animation
imgEl.classList.add("fade-in");
    const simple = await simplifyText(data.explanation);
document.getElementById("desc").innerText = simple;
}
document.getElementById("datePicker").addEventListener("change", () => {
  getAPOD();
});
const hd = document.getElementById("hdToggle").checked;
if (hd) {
  url += "&hd=true";
}
if (data.media_type === "image") {
  document.getElementById("img").src = data.url;
} else {
  document.getElementById("img").style.display = "none";
  document.getElementById("desc").innerText = "This day has a video!";
}
async function simplifyText(text) {
  const res = await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-cnn", {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_HF_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      inputs: text
    })
  });

  const data = await res.json();
  return data[0].summary_text;
}
function goFull() {
  const img = document.getElementById("img");
  img.requestFullscreen();
}


getAPOD();