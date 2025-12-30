import supabase from "./config.js";

const productList = document.getElementById('Products'); // ya shopContainer

async function loadProducts() {
    try {
        const { data, error } = await supabase
            .from('Products') // make sure case matches exactly
            .select('*');

        if (error) {
            console.error("Error fetching products:", error);
            return;
        }

        if (!data || data.length === 0) {
            productList.innerHTML = "<p>No products found.</p>";
            return;
        }

        productList.innerHTML = ""; // clear previous content

        data.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("col-lg-4", "col-md-6", "col-sm-10");
            card.innerHTML = `
                <div class="product-card">
                    <div class="img-box">
                        <img src="${product.img_url}" alt="${product.name}">
                    </div>
                    <h5>${product.name}</h5>
                    <p class="price">₹${product.price}</p>
                    <p>${product.category}</p>
                    <p>${product.description}</p>
                </div>
            `;
            productList.appendChild(card);
        });

    } catch (error) {
        console.error("Unexpected error:", error);
    }
}

// Call the function after DOM loaded
window.addEventListener("DOMContentLoaded", loadProducts);
