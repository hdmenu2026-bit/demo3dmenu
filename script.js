const startScreen = document.getElementById("start");
const video = document.getElementById("camera");
const viewer = document.getElementById("viewer");
const loader = document.getElementById("loader");
const foodName = document.getElementById("foodName");
const foodPrice = document.getElementById("foodPrice");

const models = [
  { src: "/models/Chicken_Strips_lt.glb", name: "Chicken Strips", price: "Rs 1,199" },
  { src: "/models/Cookie_big.glb", name: "Chocolate Cookie", price: "Rs 449" },
  { src: "/models/CupCake_big.glb", name: "Vanilla Cupcake", price: "Rs 749" },
  { src: "/models/sushi_big.glb", name: "Sushi Platter", price: "Rs 2,299" }
  { src: "/models/Cookie_lt.glb", name: "Chocolate Cookie", price: "Rs 449" },
  { src: "/models/CupCake_lt.glb", name: "Vanilla Cupcake", price: "Rs 749" },
  { src: "/models/sushi_lt.glb", name: "Sushi Platter", price: "Rs 2,299" }
];

let index = 0;

/* ---------- MODEL SWITCH ---------- */
function showModel(i) {
  loader.style.display = "flex";
  viewer.classList.add("fade-out");

  foodName.textContent = models[i].name;
  foodPrice.textContent = models[i].price;

  viewer.src = models[i].src;
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



