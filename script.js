
document.addEventListener('DOMContentLoaded', function() {
  const marquee = document.querySelector('.marquee-content');
  if (marquee) {
    // Duplicate content for seamless looping
    marquee.innerHTML += marquee.innerHTML;
  }
});

// Auto-generate mirrored images for perfect loop
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.marquee-banner-track');
  if (track) {
    const images = track.innerHTML;
    track.innerHTML = images + images; // Duplicate content
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Handle color option clicks
  document.querySelectorAll('.color-option').forEach(colorOption => {
    colorOption.addEventListener('click', function() {
      // Remove active class from all color options
      document.querySelectorAll('.color-option').forEach(opt => {
        opt.classList.remove('active');
      });
      
      // Add active class to clicked option
      this.classList.add('active');
      
      // Update main image and thumbnails
      updateProductImages(this);
    });
  });

  // Initialize first active color option
  const initialColor = document.querySelector('.color-option.active');
  if (initialColor) {
    updateProductImages(initialColor);
  }
});

function updateProductImages(colorElement) {
  const productCard = colorElement.closest('.product-card');
  const mainImage = productCard.querySelector('.main-image');
  const images = JSON.parse(colorElement.dataset.images);
  
  // Update main image (first image in array)
  if (images.length > 0) {
    mainImage.src = images[0];
    mainImage.alt = `Product ${colorElement.dataset.color} view`;
  }
  
  // Create or update thumbnails
  let thumbnailContainer = productCard.querySelector('.thumbnail-container');
  
  if (!thumbnailContainer) {
    thumbnailContainer = document.createElement('div');
    thumbnailContainer.className = 'thumbnail-container';
    productCard.querySelector('.product-image-container').appendChild(thumbnailContainer);
  }
  
  thumbnailContainer.innerHTML = '';
  
  images.forEach(imgSrc => {
    const thumb = document.createElement('img');
    thumb.src = imgSrc;
    thumb.className = 'thumbnail';
    thumb.addEventListener('click', () => {
      mainImage.src = imgSrc;
    });
    thumbnailContainer.appendChild(thumb);
  });
}

 // Back-to-top button
 document.addEventListener('DOMContentLoaded', () => {
  const backToTopButton = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
      backToTopButton.classList.toggle('visible', window.scrollY > 300);
  });

  backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Add slight delay to category cards for animation
  const cards = document.querySelectorAll('.category-card');
  cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
  });
});

// Product Data date 3 may
const products = {
  dress1: {
    name: "Floral Summer Dress",
    price: 19.99,
    totalStock: 15,
    colors: {
      red: {
        stock: 8,
        images: [
          "images/dress-red-front.jpg",
          "images/dress-red-side.jpg",
          "images/dress-red-back.jpg"
        ]
      },
      blue: {
        stock: 3, // Low stock example
        images: [
          "images/dress-blue-front.jpg",
          "images/dress-blue-side.jpg"
        ]
      }
    },
    sizes: {
      S: { stock: 5 },
      M: { stock: 7 },
      L: { stock: 3 }
    }
  }
};

// Initialize Product
function initProduct(productId) {
  const productCard = document.querySelector(`[data-product="${productId}"]`);
  if (!productCard) return;

  // Set up color options
  productCard.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', function() {
      // Update active color
      productCard.querySelectorAll('.color-option').forEach(opt => {
        opt.classList.remove('active');
      });
      this.classList.add('active');
      
      // Update product display
      updateProductDisplay(productId, this.dataset.color);
    });
  });

  // Set up size selector
  const sizeSelector = productCard.querySelector('.size-selector');
  sizeSelector.addEventListener('change', function() {
    updateStockDisplay(productId, 
                     productCard.querySelector('.color-option.active').dataset.color,
                     this.value);
  });

  // Initialize with first color
  updateProductDisplay(productId, 'red');
}

// Update Product Display
function updateProductDisplay(productId, color) {
  const product = products[productId];
  const colorData = product.colors[color];
  const productCard = document.querySelector(`[data-product="${productId}"]`);

  // Update main image
  const mainImage = productCard.querySelector('.main-image');
  mainImage.src = colorData.images[0];
  mainImage.alt = `${product.name} - ${color} color`;

  // Update thumbnails
  const thumbnailContainer = productCard.querySelector('.thumbnail-container');
  thumbnailContainer.innerHTML = '';
  colorData.images.forEach(imgSrc => {
    const thumb = document.createElement('img');
    thumb.src = imgSrc;
    thumb.className = 'thumbnail';
    thumb.addEventListener('click', () => {
      mainImage.src = imgSrc;
    });
    thumbnailContainer.appendChild(thumb);
  });

  // Update stock display
  updateStockDisplay(productId, color);
}

// Update Stock Display
function updateStockDisplay(productId, color, size = '') {
  const product = products[productId];
  const productCard = document.querySelector(`[data-product="${productId}"]`);
  const stockCounter = productCard.querySelector('.stock-counter');
  
  let remainingStock;
  if (size) {
    // Size-specific stock
    remainingStock = product.sizes[34].stock;
  } else {
    // Color-specific stock
    remainingStock = product.colors[color].stock;
  }

  stockCounter.textContent = `${remainingStock} remaining`;
  stockCounter.className = 'stock-counter';
  
  if (remainingStock <= 0) {
    stockCounter.textContent = 'SOLD OUT';
    stockCounter.classList.add('out-of-stock');
    productCard.querySelector('.add-to-cart').disabled = true;
  } else if (remainingStock <= 3) {
    stockCounter.classList.add('very-low');
  } else if (remainingStock <= 5) {
    stockCounter.classList.add('low');
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  initProduct('dress1');
});