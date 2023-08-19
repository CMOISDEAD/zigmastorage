import db from "./lib/main";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
      <h1>ZigmaStorage</h1>
    <div style="margin: 10px">
      <button id="increment">increment</button>
      <button id="decrement">decrement</button>
      <button id="reset">Reset</button>
    </div>
    <button id="delete">delete</button>
  </div>
`;

// solve this, add a way to check this in the library.
const check = () => {
  if (!window.localStorage.getItem("counter")) {
    db.save("counter", 0);
    alert("counter created");
  }
};

const handleIncrement = () => {
  check();
  const value = db.get("counter");
  db.save("counter", value + 1);
};

const handleDecrement = () => {
  check();
  const value = db.get("counter");
  db.save("counter", value - 1);
};

const handleReset = () => {
  check();
  db.save("counter", 0);
};

const handleDelete = () => {
  db.remove("counter");
  alert("counter removed");
};

document
  .getElementById("increment")
  ?.addEventListener("click", handleIncrement);
document
  .getElementById("decrement")
  ?.addEventListener("click", handleDecrement);
document.getElementById("reset")?.addEventListener("click", handleReset);
document.getElementById("delete")?.addEventListener("click", handleDelete);
