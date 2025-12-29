import supabase from "./config.js";

const form = document.getElementById("productForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const product = document.getElementById("product").value;
  const price = document.getElementById("price").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const exchangeable = document.getElementById("exchangeable").checked;
  const refundable = document.getElementById("refundable").checked;
  const imageFile = document.getElementById("image").files[0];

  if (!product || !price || !category || !description || !imageFile) {
    alert("Please fill required fields");
    return;
  }

  try {
    const fileName = `${Date.now()}-${imageFile.name}`;

    // Upload image and handle errors
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("Products")
      .upload(fileName, imageFile);

    if (uploadError) {
      console.error("Upload failed:", uploadError.message);
      alert("Image upload failed: " + uploadError.message);
      return; // stop insert if upload failed
    }

    //  Get public URL
    const { data } = supabase.storage
      .from("Products")
      .getPublicUrl(fileName);

    if (!data?.publicUrl) {
      alert("Failed to get image URL");
      return;
    }

    const img_Url = data.publicUrl;
    console.log("Upload Error:", uploadError);
console.log("Image URL:", img_Url);


    // Insert product into table
    const { error } = await supabase.from("Products").insert([
      {
        product,
        price,
        category,
        description,
        img_url: img_Url,
        exchangeable,
        refundable,
      },
    ]);

    if (error) {
      console.error("Insert failed:", error.message);
      alert("Error adding product: " + error.message);
      return;
    }

    alert("Product added successfully!");
    form.reset();
  } catch (error) {
    console.error("Unexpected error:", error.message);
    alert("Unexpected error: " + error.message);
  }
});






