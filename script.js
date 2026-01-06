const startScreen = document.getElementById("start");
const video = document.getElementById("camera");
const viewer = document.getElementById("viewer");
const loader = document.getElementById("loader");

const models = [
  "/models/1.glb",
  "/models/2.glb",
  "/models/Chicken_Strips.glb",
  "/models/Cookie.glb",
  "/models/CupCake.glb",
  "/models/sushi.glb"
];

let index = 0;

/* ---------- MODEL SWITCH ---------- */
function showModel(i) {
  loader.style.display = "flex";
  viewer.classList.add("fade-out");
  viewer.src = models[i];
}

viewer.addEventListener("load", () => {
  loader.style.display = "none";
  viewer.classList.remove("fade-out");
});

/* ---------- NAVIGATION ---------- */
document.getElementById("next").onclick = () => {
  index = (index + 1) % models.length;
  showModel(index);
};

document.getElementById("prev").onclick = () => {
  index = (index - 1 + models.length) % models.length;
  showModel(index);
};

/* ---------- START ---------- */
startScreen.onclick = async () => {
  startScreen.style.display = "none";

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: "environment" } },
      audio: false
    });
    video.srcObject = stream;
  } catch {
    alert("Camera access is required");
  }

  showModel(index);
};

/* ---------- AR ---------- */
document.getElementById("arBtn").onclick = () => {
  viewer.activateAR();
};
