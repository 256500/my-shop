
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



class SwipeNav {
  constructor(container) {
    this.container = container;
    this.nav = container.querySelector('.swipe-nav');
    if (!this.nav) {
      console.error('Swipe navigation element not found!');
      return;
    }

    // State variables
    this.startX = 0;
    this.scrollLeft = 0;
    this.isDragging = false;
    this.velocity = 0;
    this.animationFrame = null;
    this.lastScrollTime = 0;

    // Event listeners with proper cleanup references
    this.boundHandleStart = this.handleStart.bind(this);
    this.boundHandleMove = this.handleMove.bind(this);
    this.boundHandleEnd = this.handleEnd.bind(this);
    this.boundApplyInertia = this.applyInertia.bind(this);
    this.boundHandleWheel = this.handleWheel.bind(this);

    // Touch events
    this.nav.addEventListener('touchstart', this.boundHandleStart, { passive: false });
    this.nav.addEventListener('touchmove', this.boundHandleMove, { passive: false });
    this.nav.addEventListener('touchend', this.boundHandleEnd);

    // Mouse events
    this.nav.addEventListener('mousedown', this.boundHandleStart);
    document.addEventListener('mousemove', this.boundHandleMove);
    document.addEventListener('mouseup', this.boundHandleEnd);

    // Wheel event
    this.nav.addEventListener('wheel', this.boundHandleWheel, { passive: false });

    // Initialize styles
    this.nav.style.cursor = 'grab';
    this.nav.style.userSelect = 'none';
  }

  // Unified touch/mouse handling
  handleStart(e) {
    const clientX = this.getClientX(e);
    if (clientX === null) return;

    this.startX = clientX;
    this.scrollLeft = this.nav.scrollLeft;
    this.isDragging = true;
    this.velocity = 0;
    this.lastScrollTime = performance.now();
    
    // Visual feedback
    this.nav.style.scrollBehavior = 'auto';
    this.nav.style.cursor = 'grabbing';
    
    // Cancel any ongoing inertia
    cancelAnimationFrame(this.animationFrame);
    
    // Prevent text selection and default touch actions
    e.preventDefault();
  }

  handleMove(e) {
    if (!this.isDragging) return;
    
    const clientX = this.getClientX(e);
    if (clientX === null) return;

    const now = performance.now();
    const deltaTime = now - this.lastScrollTime;
    this.lastScrollTime = now;

    // Calculate movement with time-based velocity
    const walk = (clientX - this.startX) * 1.5;
    const newScrollLeft = this.scrollLeft - walk;
    
    // Update velocity (pixels per millisecond)
    if (deltaTime > 0) {
      this.velocity = (newScrollLeft - this.nav.scrollLeft) / deltaTime;
    }
    
    this.nav.scrollLeft = newScrollLeft;
    e.preventDefault();
  }

  handleEnd() {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    this.nav.style.cursor = 'grab';
    this.nav.style.scrollBehavior = 'smooth';

    // Apply inertia if significant velocity exists
    if (Math.abs(this.velocity) > 0.1) {
      this.animationFrame = requestAnimationFrame(this.boundApplyInertia);
    }
  }

  handleWheel(e) {
    // Only prevent default if scrolling horizontally
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
      return; // Allow vertical page scrolling
    }

    e.preventDefault();
    this.nav.scrollLeft += e.deltaX * 0.5; // Reduce wheel sensitivity
    
    // Smooth wheel inertia
    this.velocity = e.deltaX * 0.1;
    cancelAnimationFrame(this.animationFrame);
    this.animationFrame = requestAnimationFrame(this.boundApplyInertia);
  }

  applyInertia() {
    const now = performance.now();
    const deltaTime = now - this.lastScrollTime;
    this.lastScrollTime = now;

    // Stop inertia if velocity is too small
    if (Math.abs(this.velocity) < 0.1 || deltaTime > 100) {
      this.velocity = 0;
      return;
    }

    // Apply velocity with time-based movement
    const deltaScroll = this.velocity * deltaTime;
    this.nav.scrollLeft += deltaScroll;
    
    // Apply friction
    this.velocity *= Math.pow(0.95, deltaTime / 16);
    
    // Continue animation
    this.animationFrame = requestAnimationFrame(this.boundApplyInertia);
  }

  getClientX(e) {
    // Unified clientX extraction for touch/mouse events
    if (e.clientX !== undefined) return e.clientX;
    if (e.touches?.[0]?.clientX !== undefined) return e.touches[0].clientX;
    console.warn('Could not determine clientX from event:', e);
    return null;
  }

  destroy() {
    // Cleanup event listeners
    this.nav.removeEventListener('touchstart', this.boundHandleStart);
    this.nav.removeEventListener('touchmove', this.boundHandleMove);
    this.nav.removeEventListener('touchend', this.boundHandleEnd);
    this.nav.removeEventListener('mousedown', this.boundHandleStart);
    document.removeEventListener('mousemove', this.boundHandleMove);
    document.removeEventListener('mouseup', this.boundHandleEnd);
    this.nav.removeEventListener('wheel', this.boundHandleWheel);
  }
}


function scrollCategories(direction) {
  const scrollContainer = document.querySelector('.swipe-nav');
  if (!scrollContainer) return;
  
  // Calculate scroll amount (60% of container width)
  const scrollAmount = scrollContainer.clientWidth * 0.6 * direction;
  scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

// Optional: Disable arrows when at scroll limits [nav scroll event]
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.swipe-nav');
  const arrows = document.querySelectorAll('.arrow-btn');
  nav.addEventListener('scroll', () => {
      const atStart = nav.scrollLeft === 0;
      const atEnd = nav.scrollLeft + nav.clientWidth >= nav.scrollWidth - 1;   
      arrows[0].disabled = atStart;
      arrows[1].disabled = atEnd;
  });
});
