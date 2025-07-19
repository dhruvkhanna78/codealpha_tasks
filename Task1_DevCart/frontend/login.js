document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:5000/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.name);
        document.getElementById("login-msg").textContent = "✅ Login successful!";
        setTimeout(() => window.location.href = "index.html", 1000);
      } else {
        document.getElementById("login-msg").textContent = "❌ Invalid credentials";
      }
    })
    .catch(() => {
      document.getElementById("login-msg").textContent = "❌ Login error";
    });
});
