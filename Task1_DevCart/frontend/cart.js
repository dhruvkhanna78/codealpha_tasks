// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Get cart container and total element
const container = document.getElementById("cart-container");
const totalCard = document.querySelector("#total-card h2");
let total = 0;

// If cart is empty
if (cart.length === 0) {
  container.innerHTML = "<h4 class='text-center py-5 text-muted'>Your cart is empty.</h4>";
} else {
  cart.forEach(item => {
    fetch(`http://localhost:5000/api/products/${item.id}`)
      .then(res => res.json())
      .then(product => {
        // Creating card
        const card = document.createElement("div");
        card.className = "card p-3 mb-3 d-flex flex-row justify-content-between align-items-center";

        card.innerHTML = `
          <div class="d-flex align-items-center">
            <img src="${product.image}" alt="${product.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; margin-right: 15px;">
            <div>
              <h5 class="mb-1">${product.name}</h5>
              <p class="mb-1 text-muted" style="max-width: 400px;">${product.description}</p>
              <strong>₹${product.price} × ${item.quantity}</strong>
            </div>
          </div>
          <div>
            <button class="btn btn-success btn-sm order-btn me-2" data-id="${item.id}" data-qty="${item.quantity}">Order Now</button>
            <button class="btn btn-danger btn-sm remove-btn" data-id="${item.id}">Remove</button>
          </div>
        `;

        container.appendChild(card);

        // Add to total
        total += product.price * item.quantity;
        totalCard.textContent = `Total: ₹${total}`;
      })
      .catch(err => {
        console.error("Error fetching product:", err);
      });
  });
}

// Remove from cart
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-btn")) {
    const idToRemove = e.target.getAttribute("data-id");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== idToRemove);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  }
});

//Order Now
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("order-btn")) {
    const productId = e.target.getAttribute("data-id");
    const quantity = parseInt(e.target.getAttribute("data-qty")) || 1;

    fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        productId,
        quantity,
        customerName: "Test User",
        address: "123 Test Street"
      })
    })
      .then(res => res.json())
      .then(data => {
        alert("✅ Order placed successfully!");
        console.log("Order:", data);
      })
      .catch(err => {
        console.error("❌ Failed to place order:", err);
        alert("❌ Order failed. Try again.");
      });
  }
});

const orderBtn = document.querySelector("#total-card button");

  orderBtn.addEventListener("click", () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Order logic – You can modify as needed
    alert("Order placed successfully!");

    // Optional: Clear cart after order
    localStorage.removeItem("cart");
    window.location.href = "orders.html"; // or thank you page
  });