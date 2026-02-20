let interns = [];

window.onload = displayInterns;

function addIntern() {
  const name = document.getElementById("name").value.trim();
  const role = document.getElementById("role").value.trim();
  const joinedDate = document.getElementById("joinedDate").value;

  if (!name || !role || !joinedDate) {
    alert("Please fill all fields");
    return;
  }

  const intern = {
    id: Date.now(),
    name,
    role,
    joinedDate
  };

  interns.push(intern);
  displayInterns();

  document.getElementById("name").value = "";
  document.getElementById("role").value = "";
  document.getElementById("joinedDate").value = "";
}

function displayInterns() {
  const list = document.getElementById("internList");
  list.innerHTML = "";

  if (interns.length === 0) {
    list.innerHTML = "<p>No interns added yet.</p>";
    return;
  }

  interns.forEach((intern) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${intern.name}</h3>
      <p><strong>Role:</strong> ${intern.role}</p>
      <p><strong>Joined:</strong> ${intern.joinedDate}</p>
      <button onclick="deleteIntern(${intern.id})">Delete</button>
    `;

    list.appendChild(card);
  });
}

function deleteIntern(id) {
  interns = interns.filter(intern => intern.id !== id);
  displayInterns();
}