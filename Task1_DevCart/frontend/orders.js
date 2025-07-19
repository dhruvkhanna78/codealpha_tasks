document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("orders-list");

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    container.innerHTML = `<p class="text-danger">⚠️ Please login to view your orders.</p>`;
    return;
  }

  fetch("http://localhost:5000/api/orders?userId=" + user._id)
    .then(res => res.json())
    .then(orders => {
      if (!Array.isArray(orders) || orders.length === 0) {
        container.innerHTML = `<p class="text-muted">You have no orders yet.</p>`;
        return;
      }

      orders.forEach(order => {
        const card = document.createElement("div");
        card.className = "order-card";

        card.innerHTML = `
          <img src="${order.productId.image}" alt="${order.productId.name}" />
          <h5>${order.productId.name}</h5>
          <p class="description">${order.productId.description}</p>
          <strong>₹${order.productId.price} x ${order.quantity}</strong>
          <p class="meta">👤 ${order.customerName}</p>
          <p class="meta">📍 ${order.address}</p>
          <p class="meta">🕒 ${new Date(order.createdAt).toLocaleString()}</p>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error("❌ Failed to load orders:", err);
      container.innerHTML = `<p class="text-danger">Something went wrong while fetching your orders.</p>`;
    });
});
