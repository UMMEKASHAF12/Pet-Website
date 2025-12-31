import supabase from "./config.js";

// Function to fetch and display users
const userTableBody = document.getElementById("usersBody");

async function loadUsers() {
const { data, error } = await supabase
  .from('Users')
  .select("*");

  if(error) {
    console.error("Error fetching users:", error);
    return;
  }

userTableBody.innerHTML = "";

 data.forEach((user) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${new Date(user.created_at).toLocaleDateString()}</td>
    `;
    userTableBody.appendChild(tr);
  });
}
// Load users on page load

loadUsers();