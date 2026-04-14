let count = 0;
let total = 0;

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  syncFromStorage();
  updateCartUI();
});

/* SYNC FUNCTION (IMPORTANT FIX) */
function syncFromStorage(){
  count = parseInt(localStorage.getItem("cartCount")) || 0;
  total = parseInt(localStorage.getItem("cartTotal")) || 0;
}

/* UPDATE UI */
function updateCartUI(){
  let cartEl = document.getElementById("cart");
  if(cartEl){
    cartEl.innerText = count;
  }
}

/* ➕ ADD */
function add(price){
  syncFromStorage();

  count++;
  total += price;

  localStorage.setItem("cartCount", count);
  localStorage.setItem("cartTotal", total);

  updateCartUI();
}

/* ➖ REMOVE */
function removeItem(price){
  syncFromStorage();

  if(count > 0){
    count--;
    total -= price;

    if(total < 0) total = 0;

    localStorage.setItem("cartCount", count);
    localStorage.setItem("cartTotal", total);

    updateCartUI();
  }
}

/* 🛒 PAYMENT */
function goToPayment(){
  let c = parseInt(localStorage.getItem("cartCount")) || 0;

  if(c === 0){
    alert("Cart is empty 😅");
    return;
  }

  window.location.href = "payment.html";
}

/* 🧭 FILTER */
function filter(type){
  document.querySelectorAll(".card").forEach(card => {
    card.style.display =
      type === "all" || card.classList.contains(type)
        ? "block"
        : "none";
  });
}