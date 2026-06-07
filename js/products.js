// Initialization logic
const defaultCategories = ["Electronics", "Fashion", "Home & Living", "Office Supplies", "Groceries", "Accessories"];
const defaultProducts = [
  {
    id: "prod-1",
    sku: "SKU-LPBG-01",
    name: "Laptop Bag",
    category: "Accessories",
    description: "Durable, water-resistant laptop bag with multiple compartments.",
    price: 250,
    stock: 3, // Initialized low to trigger dashboard warnings
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500", "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500"],
    specs: "Fits up to 15.6-inch laptops. Material: Nylon."
  },
  {
    id: "prod-2",
    sku: "SKU-USBC-02",
    name: "USB-C Cable",
    category: "Electronics",
    description: "Fast-charging 2m braided USB-C to USB-C cable.",
    price: 45,
    stock: 2,
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500",
    images: ["https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500"],
    specs: "Length: 2 meters. Power Delivery: Up to 60W."
  }
];

if (!localStorage.getItem('products')) {
  localStorage.setItem('products', JSON.stringify(defaultProducts));
}
if (!localStorage.getItem('categories')) {
  localStorage.setItem('categories', JSON.stringify(defaultCategories));
}

// Getters and Setters
function getProducts() {
  return JSON.parse(localStorage.getItem('products')) || [];
}
function saveProducts(products) {
  localStorage.setItem('products', JSON.stringify(products));
}
function getCategories() {
  return JSON.parse(localStorage.getItem('categories')) || [];
}
function saveCategories(categories) {
  localStorage.setItem('categories', JSON.stringify(categories));
}

