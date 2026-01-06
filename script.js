const startScreen = document.getElementById("start");
const video = document.getElementById("camera");
const viewer = document.getElementById("viewer");
const loader = document.getElementById("loader");
const foodName = document.getElementById("foodName");
const foodPrice = document.getElementById("foodPrice");

const models = [
  { src: "/models/Chicken_Strips.glb", name: "Chicken Strips", price: "$5.49" },
  { src: "/models/Cookie.glb", name: "Chocolate Cookie", price: "$2.99" },
  { src: "/models/CupCake.glb", name: "Vanilla Cupcake", price: "$3.49" },
  { src: "/models/sushi.glb", name: "Sushi Platter", price: "$9.99" }
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

