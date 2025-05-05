// Product Data
const products = {
  dress1: {
      title: "Floral Summer Dress with Ruffled Hem",
      price: "Ksh 900.99",
      originalPrice: "Ksh 1,200.99",
      description: "Lightweight cotton dress with beautiful floral pattern and ruffled hem. Perfect for summer days with its breathable fabric and comfortable fit.",
      soldCount: "1.2k+ sold",
      colors: [
          {
              name: "red",
              display: "Red Floral",
              images: [
                  "../images/2001.jpg",
                  "../../images/index-1.jpg",
                  "../images/tester.jpg"
              ]
          },
          {
              name: "blue",
              display: "Blue Floral",
              images: [
                  "../images/dark2.jpg",
                  "../images/dress-blue-front.jpg",
                  "../images/index-004.jpg"
              ]
          }
      ],
      sizes: ["31", "34", "36", "40"]
  },
  dress2: {
      title: "Elegant Evening Dress with Slit",
      price: "Ksh 1,500.99",
      description: "Sophisticated evening dress with thigh-high slit and figure-hugging silhouette. Made from stretchy satin material for a luxurious feel.",
      soldCount: "850+ sold",
      colors: [
          {
              name: "black",
              display: "Black",
              images: [
                  "https://images.unsplash.com/photo-1572804013427-4d7ca7268217",
                  "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
                  "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f"
              ]
          },
          {
              name: "red",
              display: "Ruby Red",
              images: [
                  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b",
                  "https://images.unsplash.com/photo-1551232864-3f0890e580d9",
                  "https://images.unsplash.com/photo-1591047139829-d91aecb6caea"
              ]
          }
      ],
      sizes: ["XS", "S", "M", "L"]
  }
};

// Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('productModal');
  const closeBtn = document.querySelector('.close-modal');
  
  // Open modal when product card is clicked
  document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', function(e) {
          // Don't open if clicking on specific elements
          if (e.target.closest('.product-badge')) return;
          
          const productId = this.dataset.product;
          const product = products[productId];
          
          // Set basic product info
          document.querySelector('.modal-product-title').textContent = product.title;
          document.querySelector('.modal-product-price').textContent = product.price;
          document.querySelector('.modal-product-description').textContent = product.description;
          
          // Create color options
          const colorSwatches = document.querySelector('.color-swatches');
          colorSwatches.innerHTML = '';
          
          product.colors.forEach((color, index) => {
              const swatch = document.createElement('div');
              swatch.className = `color-swatch ${index === 0 ? 'active' : ''}`;
              swatch.dataset.color = color.name;
              swatch.innerHTML = `<img src="${color.images[0]}" alt="${color.display}">`;
              
              swatch.addEventListener('click', function() {
                  // Update active color
                  document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
                  this.classList.add('active');
                  document.querySelector('.selected-color').textContent = color.display;
                  
                  // Update images
                  updateModalImages(color.images);
              });
              
              colorSwatches.appendChild(swatch);
          });
          
          // Initialize with first color
          updateModalImages(product.colors[0].images);
          
          // Size selection
          document.querySelectorAll('.size-option').forEach(option => {
              option.addEventListener('click', function() {
                  document.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
                  this.classList.add('selected');
              });
          });
          
          // Show modal
          modal.style.display = 'block';
          document.body.style.overflow = 'hidden';
      });
  });
  
  // Close modal
  closeBtn.addEventListener('click', closeModal);
  window.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
  });
  
  // Image navigation
  document.querySelector('.prev').addEventListener('click', navigateImages(-1));
  document.querySelector('.next').addEventListener('click', navigateImages(1));
  
  function updateModalImages(images) {
      const mainImg = document.querySelector('.modal-main-image');
      const thumbContainer = document.querySelector('.modal-thumbnails');
      
      // Set main image
      mainImg.src = images[0];
      
      // Create thumbnails
      thumbContainer.innerHTML = '';
      images.forEach((img, index) => {
          const thumb = document.createElement('img');
          thumb.src = img;
          thumb.className = `modal-thumb ${index === 0 ? 'active' : ''}`;
          
          thumb.addEventListener('click', function() {
              mainImg.src = img;
              document.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
              this.classList.add('active');
          });
          
          thumbContainer.appendChild(thumb);
      });
  }
  
  function navigateImages(direction) {
      return function() {
          const thumbs = document.querySelectorAll('.modal-thumb');
          const activeIndex = Array.from(thumbs).findIndex(thumb => thumb.classList.contains('active'));
          let newIndex = activeIndex + direction;
          
          if (newIndex < 0) newIndex = thumbs.length - 1;
          if (newIndex >= thumbs.length) newIndex = 0;
          
          thumbs[newIndex].click(); // Simulate click on thumbnail
      };
  }
  
  function closeModal() {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
  }
});

// Size Guide Data
const sizeGuides = {
    dresses: {
        cm: [
            { size: "S", bust: "82-86", waist: "64-68", hip: "88-92", length: "92" },
            { size: "M", bust: "86-90", waist: "68-72", hip: "92-96", length: "94" },
            { size: "L", bust: "90-94", waist: "72-76", hip: "96-100", length: "96" },
            { size: "XL", bust: "94-98", waist: "76-80", hip: "100-104", length: "98" }
        ],
        inch: [
            { size: "S", bust: "32-34", waist: "25-27", hip: "35-36", length: "36" },
            { size: "M", bust: "34-35", waist: "27-28", hip: "36-38", length: "37" },
            { size: "L", bust: "35-37", waist: "28-30", hip: "38-39", length: "38" },
            { size: "XL", bust: "37-39", waist: "30-31", hip: "39-41", length: "39" }
        ]
    }
};

// Size Guide Functionality
document.querySelectorAll('.size-guide-btn').forEach(btn => {
    btn.addEventListener('click', openSizeGuide);
});

function openSizeGuide() {
    const guide = document.querySelector('.size-guide-popup');
    const tableBody = guide.querySelector('tbody');
    
    // Initialize with CM data
    updateSizeTable('cm');
    
    // Tab switching
    guide.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            guide.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateSizeTable(this.dataset.unit);
        });
    });
    
    // Close button
    guide.querySelector('.close-guide').addEventListener('click', closeSizeGuide);
    
    // Close when clicking outside
    guide.addEventListener('click', function(e) {
        if (e.target === this) closeSizeGuide();
    });
    
    guide.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function updateSizeTable(unit) {
    const tableBody = document.querySelector('.size-table tbody');
    tableBody.innerHTML = '';
    
    sizeGuides.dresses[unit].forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.size}</td>
            <td>${row.bust}</td>
            <td>${row.waist}</td>
            <td>${row.hip}</td>
            <td>${row.length}</td>
        `;
        tableBody.appendChild(tr);
    });
}

function closeSizeGuide() {
    document.querySelector('.size-guide-popup').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Initialize return policy
function initReturnPolicy() {
    const policyPopup = document.getElementById('returnPolicyPopup');
    const policyTabs = policyPopup.querySelectorAll('.policy-tab');
    
    // Tab switching
    policyTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const country = this.dataset.country;
            
            // Update tabs
            policyTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update content
            policyPopup.querySelectorAll('.policy-details').forEach(detail => {
                detail.classList.remove('active');
                if(detail.dataset.country === country) {
                    detail.classList.add('active');
                }
            });
        });
    });
    
    // Close button
    policyPopup.querySelector('.close-policy').addEventListener('click', function() {
        policyPopup.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Open return policy from product page
    document.addEventListener('click', function(e) {
        if(e.target.closest('.return-policy-link')) {
            e.preventDefault();
            policyPopup.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Auto-detect user's country (simplified example)
            detectUserCountry();
        }
    });
}

// Country detection (simplified)
function detectUserCountry() {
    // In a real implementation, use geolocation API or IP detection
    const policyPopup = document.getElementById('returnPolicyPopup');
    policyPopup.querySelector('.policy-tab[data-country="us"]').click(); // Default to US
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initReturnPolicy);