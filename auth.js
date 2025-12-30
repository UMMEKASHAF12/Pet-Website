import supabase from "./config.js";

// Sign Up Function
let semail = document.getElementById("useremail");
let spassword = document.getElementById("userpassword");
let sname = document.getElementById("username");

async function signup(e) {
  e.preventDefault();

  try {
    if (!semail.value) {
      alert("Please enter your email");
      return;
    }

    if (!spassword.value) {
      alert("Please enter your password");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: semail.value,
      password: spassword.value,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Signup successful!");
    console.log(data);

  } catch (err) {
    console.error("Error:", err.message);
  }
}
document.querySelector("form").addEventListener("submit", signup);




  
