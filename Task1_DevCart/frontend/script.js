// Fetch and display all products on the homepage
fetch("http://localhost:5000/api/products")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("product-list");

    data.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <strong>₹${product.price}</strong>
        <br />
        <button class="view-btn">View Details</button>
      `;

      //View Details button opens in new tab
      card.querySelector(".view-btn").addEventListener("click", () => {
        window.open(`product.html?id=${product._id}`, "_blank");
      });

      // Add to Cart Icon Button (NO GREEN BG, properly aligned)
      const cartBtn = document.createElement("button");
      cartBtn.className = "cart-icon-btn"; // only this class
      cartBtn.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/128/2838/2838838.png" alt="Cart Icon">`;
      cartBtn.addEventListener("click", () => addToCart(product._id));
      card.appendChild(cartBtn);

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Failed to load products:", err);
  });

// Add to Cart Function (localStorage)
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(p => p.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart!");
}
