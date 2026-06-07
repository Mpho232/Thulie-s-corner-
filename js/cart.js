function renderCart() {
  const container = document.getElementById('cart-table-container');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const products = getProducts();
  let grandTotal = 0;

  container.innerHTML = '';

  if(cart.length === 0) {
    container.innerHTML = `<p class="text-center text-gray-500 py-8">Your cart is currently empty.</p>`;
    document.getElementById('cart-grand-total').innerText = "P0.00";
    return;
  }

  cart.forEach(item => {
    const prod = products.find(p => p.id === item.id);
    if(!prod) return;

    const rowTotal = prod.price * item.quantity;
    grandTotal += rowTotal;

    container.innerHTML += `
      <div class="flex flex-col sm:flex-row items-center justify-between border-b pb-4 gap-4">
        <div class="flex items-center gap-4 w-full sm:w-1/2">
          <img src="${prod.image}" class="w-16 h-16 object-cover rounded" alt="">
          <div>
            <h4 class="font-bold">${prod.name}</h4>
            <p class="text-sm text-gray-500">Unit Price: P${prod.price}</p>
          </div>
        </div>
        <div class="flex items-center justify-between w-full sm:w-1/2">
          <div class="flex items-center border rounded">
            <button onclick="updateQty('${item.id}', ${item.quantity - 1})" class="px-2.5 py-1 bg-gray-100 hover:bg-gray-200">-</button>
            <span class="px-4 font-medium">${item.quantity}</span>
            <button onclick="updateQty('${item.id}', ${item.quantity + 1})" class="px-2.5 py-1 bg-gray-100 hover:bg-gray-200">+</button>
          </div>
          <span class="font-bold text-gray-800">P${rowTotal}</span>
          <button onclick="removeFromCart('${item.id}')" class="text-red-500 hover:text-red-700">🗑️</button>
        </div>
      </div>
    `;
  });

  document.getElementById('cart-grand-total').innerText = `P${grandTotal}`;
}

function updateQty(id, newQty) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find(i => i.id === id);
  const prod = getProducts().find(p => p.id === id);

  if (!item || !prod) return;

  if (newQty <= 0) {
    removeFromCart(id);
    return;
  }
  if (newQty > prod.stock) {
    alert(`Sorry, only ${prod.stock} items are remaining in stock.`);
    return;
  }

  item.quantity = newQty;
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function clearCart() {
  localStorage.removeItem('cart');
  renderCart();
}

// Initial Call
document.addEventListener("DOMContentLoaded", renderCart);

