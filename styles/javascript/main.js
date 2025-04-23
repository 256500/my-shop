// Sample product data
const products = [
    {
        id: 1,
        name: "Vintage Denim Jacket",
        price: 3499,
        image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9",
        colors: ["blue", "black"]
    },
    {
        id: 2,
        name: "Linen Jumpsuit",
        price: 2799,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
        colors: ["beige", "olive"]
    }
];

// Render products
function renderProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', renderProducts);

// Auto-save draft to localStorage
setInterval(() => {
    const projectState = {
        html: document.documentElement.outerHTML,
        products: products
    };
    localStorage.setItem('fashionStoreBackup', JSON.stringify(projectState));
}, 60000); // Backup every minute