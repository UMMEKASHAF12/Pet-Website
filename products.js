import supabase from "./config.js";

const productsBody = document.getElementById("productsBody");

async function loadProducts() {
  const { data: products, error } = await supabase
    .from("Products")
    .select("*");

  if (error) {
    console.error(error);
    return;
  }

  productsBody.innerHTML = "";

  products.forEach((product) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>
        <img src="${product.img_url}" class="product-img" />
      </td>
      <td>${product.product}</td>
      <td>$${product.price}</td>
    `;

    productsBody.appendChild(tr);
  });
}

loadProducts();
console.log(product.img_url);

