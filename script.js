let players = [];
let roles = [];
let assignments = [];
let currentPlayer = 0;
let revealed = false;

function startGame() {
  currentPlayer = 0;
  revealed = false;

  players = document.getElementById("playersInput").value
    .split("\n")
    .map(p => p.trim())
    .filter(p => p !== "");

  const mafia = +document.getElementById("mafiaCount").value;
  const doctor = +document.getElementById("doctorCount").value;
  const detective = +document.getElementById("detectiveCount").value;
  const jester = +document.getElementById("jesterCount").value;
  const zombie = +document.getElementById("zombieCount").value;

  const totalRoles = mafia + doctor + detective + jester + zombie;
  const civilians = players.length - totalRoles;

  if (civilians < 0) {
    alert("Too many roles!");
    return;
  }

  roles = [];
  roles.push(...Array(mafia).fill("Mafia"));
  roles.push(...Array(doctor).fill("Doctor"));
  roles.push(...Array(detective).fill("Detective"));
  roles.push(...Array(jester).fill("Jester"));
  roles.push(...Array(zombie).fill("Zombie"));
  roles.push(...Array(civilians).fill("Civilian"));

  shuffleArray(roles);

  assignments = players.map((p, i) => ({
    name: p,
    role: roles[i]
  }));

  switchScreen("card-screen");
  updateCard();
}

function revealRole() {
  if (revealed) return;

  document.getElementById("roleText").innerText =
    "You are the " + assignments[currentPlayer].role;
  revealed = true;
}

function nextPlayer() {
  revealed = false;
  currentPlayer++;

  if (currentPlayer >= assignments.length) {
    switchScreen("end-screen");
    return;
  }

  updateCard();
}

function updateCard() {
  document.getElementById("playerName").innerText =
    assignments[currentPlayer].name;

  document.getElementById("roleText").innerText = "Tap to reveal role";
}

function revealSpecialRoles() {
  const list = document.getElementById("specialRolesList");
  list.innerHTML = "";

  assignments
    .filter(p => p.role !== "Civilian")
    .forEach(p => {
      const li = document.createElement("li");
      li.textContent = `${p.name} — ${p.role}`;
      list.appendChild(li);
    });
}

function resetGame() {
  currentPlayer = 0;
  revealed = false;
  document.getElementById("specialRolesList").innerHTML = "";
  switchScreen("setup-screen");
}

function switchScreen(id) {
  document.querySelectorAll(".screen")
    .forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
