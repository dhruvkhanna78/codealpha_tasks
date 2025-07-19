// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// If no ID in URL
if (!productId) {
  document.body.innerHTML = "<h2 style='padding:20px;'>Product not found!</h2>";
  throw new Error("Product ID not found in URL");
}

let currentProduct = null;

// Fetch the single product
fetch(`http://localhost:5000/api/products/${productId}`)
  .then(res => {
    if (!res.ok) throw new Error("Product not found");
    return res.json();
  })
  .then(product => {
    currentProduct = product;

    // Set product details
    document.querySelector(".product-image img").src = product.image;
    document.querySelector(".product-image img").alt = product.name;
    document.querySelector(".product-details h1").textContent = product.name;
    document.querySelector(".product-details p").textContent = product.description;
    document.querySelector(".price").textContent = `₹${product.price}`;

    // Set specs and description
    document.getElementById("spec-brand").textContent = product.brand || "Generic";
    document.getElementById("spec-category").textContent = product.category || "Misc";
    document.getElementById("spec-stock").textContent = product.inStock ? "In Stock" : "Out of Stock";
    document.getElementById("product-desc").textContent = product.description;
  })
  .catch(err => {
    console.error(err);
    document.body.innerHTML = "<h2 style='padding:20px;'>❌ Failed to load product!</h2>";
  });


// ✅ Quantity Controls
const qtySpan = document.getElementById("quantity");
const increaseBtn = document.getElementById("increaseQty");
const decreaseBtn = document.getElementById("decreaseQty");

increaseBtn.addEventListener("click", () => {
  let qty = parseInt(qtySpan.textContent);
  qtySpan.textContent = qty + 1;
});

decreaseBtn.addEventListener("click", () => {
  let qty = parseInt(qtySpan.textContent);
  if (qty > 1) qtySpan.textContent = qty - 1;
});

// ✅ Get selected quantity
function getSelectedQuantity() {
  return parseInt(qtySpan.textContent) || 1;
}

// 🛒 Add to Cart
const cartBtn = document.getElementById("addToCartBtn");

if (cartBtn) {
  cartBtn.addEventListener("click", () => {
    if (!currentProduct) return alert("⏳ Product not loaded yet!");
    const selectedQty = getSelectedQuantity();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(p => p.id === currentProduct._id);

    if (existing) {
      existing.quantity += selectedQty;
    } else {
      cart.push({ id: currentProduct._id, quantity: selectedQty });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`✅ ${selectedQty} item(s) added to cart!`);
  });
}

// 🛒 Buy Now
const buyBtn = document.getElementById("buyBtn");

if (buyBtn) {
  buyBtn.addEventListener("click", () => {
    if (!currentProduct) return alert("⏳ Product not loaded yet!");
    const selectedQty = getSelectedQuantity();

    buyBtn.disabled = true;
    const originalText = buyBtn.textContent;
    buyBtn.textContent = "Placing Order...";

    fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        productId: currentProduct._id,
        quantity: selectedQty,
        customerName: "Test User",
        address: "123 Test Street"
      })
    })
      .then(res => res.json())
      .then(data => {
        alert("Order Placed Successfully!");
        console.log("Order:", data);
        buyBtn.textContent = "Ordered!";
        buyBtn.style.backgroundColor = "#2ecc71";
      })
      .catch(err => {
        console.error("Failed to place order:", err);
        alert("Order failed!");
        buyBtn.textContent = originalText;
      })
      .finally(() => {
        buyBtn.disabled = false;
      });
  });
}

// Recommended Products
fetch("http://localhost:5000/api/products")
  .then(res => res.json())
  .then(products => {
    const filtered = products.filter(p => p._id !== productId);
    const recommended = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);

    const container = document.getElementById("recommended-products");
    recommended.forEach(p => {
      const card = document.createElement("div");
      card.className = "recommended-card";
      card.onclick = () => {
        window.open(`product.html?id=${p._id}`, "_blank"); 
      };

      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" />
        <h4>${p.name}</h4>
        <span>₹${p.price}</span>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Recommended fetch failed:", err);
  });
