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
  
    const { publicUrl, error: urlError } = supabase
      .storage
      .from("Products")
      .getPublicUrl(product.img_url);

    if (urlError) {
      console.error("Error getting public URL:", urlError);
    }

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>
        <img src="${publicUrl}" class="product-img" alt="${product.product}" />
      </td>
      <td>${product.product}</td>
      <td>$${product.price}</td>
    `;

    productsBody.appendChild(tr);
  });
}

loadProducts();
