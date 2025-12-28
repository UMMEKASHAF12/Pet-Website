import { supabase } from "./config.js"

const form = document.getElementById("productForm")

form.addEventListener("submit", async (e) => {
  e.preventDefault()

const product = document.getElementById("product").value
const price = document.getElementById("price").value
const category = document.getElementById("category").value
const description = document.getElementById("description").value
const exchangeable = document.getElementById("exchangeable").checked
const refundable = document.getElementById("refundable").checked

console.log(product, price, category, description, exchangeable, refundable)
})






