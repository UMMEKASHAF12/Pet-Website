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
            // Check if product has a price range or a single price
            const priceDisplay = product.max_price 
                ? `₹${product.price}.00 – <br> ₹${product.max_price}.00` 
                : `₹${product.price}.00`;

            const productHTML = `
            <div class="col-12 col-md-6 col-lg-3">
                <div class="product-card">
                    ${product.limited ? '<span class="limited-badge">LIMITED</span>' : ''}
                    
                    <div class="img-box">
                        <img src="${product.img_url}" alt="${product.name}">
                    </div>

                    <div class="stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star text-secondary" style="opacity: 0.3;"></i>
                    </div>

                    <h5>${product.product}</h5>

                    <p class="price">
                        ${priceDisplay}
                    </p>

                    <div class="cart-section">
                        <button class="cart-btn">
                            <i class="fa-solid fa-cart-shopping"></i>
                        </button>
                    </div>
                </div>
            </div>`;
            
            // CRITICAL: This line adds the card to your page
            productList.insertAdjacentHTML('beforeend', productHTML);
        });
                
    } catch (error) {
        console.error("Unexpected error:", error);
    }
}

// Call the function after DOM loaded
window.addEventListener("DOMContentLoaded", loadProducts);
