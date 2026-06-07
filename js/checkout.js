document.addEventListener("DOMContentLoaded", () => {
  const summaryItems = document.getElementById('summary-items');
  const deliverySelect = document.getElementById('delivery-option');
  
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const products = getProducts();

  if(cart.length === 0) {
     alert("Your cart is empty. Redirecting to store.");
     window.location.href = "products.html";
     return;
  }

  let subtotal = 0;

  function calculateTotals() {
    summaryItems.innerHTML = '';
    subtotal = 0;

    cart.forEach(item => {
      const p = products.find(prod => prod.id === item.id);
      if(!p) return;
      
      const itemTotal = p.price * item.quantity;
      subtotal += itemTotal;

      summaryItems.innerHTML += `
        <div class="flex justify-between text-gray-600">
          <span>${p.name} (x${item.quantity})</span>
          <span>P${itemTotal}</span>
        </div>
      `;
    });

    const selectedDelivery = deliverySelect.options[deliverySelect.selectedIndex];
    const deliveryCost = parseFloat(selectedDelivery.getAttribute('data-cost'));
    const grandTotal = subtotal + deliveryCost;

    document.getElementById('subtotal-val').innerText = `P${subtotal}`;
    document.getElementById('delivery-val').innerText = `P${deliveryCost}`;
    document.getElementById('grand-total-val').innerText = `P${grandTotal}`;
  }

  deliverySelect.addEventListener('change', calculateTotals);
  calculateTotals(); // Initial load run

  // Form Submission
  document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Deduct Stock Quantity globally 
    let allProducts = getProducts();
    cart.forEach(item => {
      let targetProduct = allProducts.find(p => p.id === item.id);
      if(targetProduct) {
        targetProduct.stock = Math.max(0, targetProduct.stock - item.quantity);
      }
    });

    // Save modified arrays back to simulation stack
    saveProducts(allProducts);

    // Simulated Analytics Increment Injection
    let aggregateSales = JSON.parse(localStorage.getItem('analytics_sales')) || 0;
    aggregateSales += cart.reduce((acc, i) => acc + i.quantity, 0);
    localStorage.setItem('analytics_sales', JSON.stringify(aggregateSales));

    alert("Order completed successfully! Thank you for your purchase.");
    localStorage.removeItem('cart'); // Wipe local shopping cart state context
    window.location.href = "products.html";
  });
});

