import supabase from "./config.js";

let semail = document.getElementById("useremail");
let spassword = document.getElementById("userpassword");
let sname = document.getElementById("username");

// Signup function
async function signup(e) {
  e.preventDefault();

  try {
    if (!sname.value) {
      alert("Please enter your name");
      return;
    }

    if (!semail.value) {
      alert("Please enter your email");
      return;
    }

    if (!spassword.value) {
      alert("Please enter your password");
      return;
    }

    // 1️⃣ Sign up user with Supabase Auth

    const { data, error } = await supabase.auth.signUp({
      email: semail.value,
      password: spassword.value,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;

    // 2️⃣ Insert user into custom table (Users)

    const { error: insertError } = await supabase
      .from("Users")
      .insert({
        id: user.id,          
        name: sname.value,
        email: user.email,
      });

    if (insertError) {
      console.error(insertError.message);
      alert("User created but profile not saved");
      return;
    }

    alert("Signup successful!");
    console.log("User:", user);

  } catch (err) {
    console.error("Error:", err.message);
  }
}
// Form submit
document.querySelector("form").addEventListener("submit", signup);






