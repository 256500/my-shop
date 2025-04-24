document.addEventListener('DOMContentLoaded', function() {
    // Color Selection Functionality
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const mainImage = productCard.querySelector('.main-image');
            const imageGallery = productCard.querySelector('.image-gallery');
            const allColorOptions = productCard.querySelectorAll('.color-option');
            
            // Update active state
            allColorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Update images
            const images = JSON.parse(this.getAttribute('data-images'));
            if (images.length > 0) {
                mainImage.src = images[0];
                mainImage.alt = `${this.getAttribute('data-color')} version`;
                
                // Update thumbnails
                imageGallery.innerHTML = '';
                images.forEach((img, index) => {
                    imageGallery.innerHTML += `
                        <img src="${img}" 
                             class="thumbnail" 
                             data-product="${mainImage.dataset.product}"
                             data-img="${index + 1}">
                    `;
                });
            }
        });
        
        // Initialize first color option
        const productCard = option.closest('.product-card');
        if (!productCard.querySelector('.color-option.active')) {
            option.click();
        }
    });
    
    // Modal Gallery Functionality
    const modal = document.getElementById('productModal');
    const modalMainImage = modal.querySelector('.modal-main-image');
    const modalThumbnails = modal.querySelector('.modal-thumbnails');
    const currentImageSpan = modal.querySelector('.current-image');
    const totalImagesSpan = modal.querySelector('.total-images');
    const prevBtn = modal.querySelector('.prev');
    const nextBtn = modal.querySelector('.next');
    
    let currentProduct = null;
    let currentImageIndex = 0;
    let productImages = [];
    
    // Product click handler
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't open modal if clicking on color options or add-to-cart
            if (e.target.closest('.color-option') || e.target.closest('.add-to-cart')) {
                return;
            }
            
            const productId = this.querySelector('.main-image').dataset.product;
            currentProduct = productId;
            currentImageIndex = 0;
            
            // Get all images for this product
            productImages = getAllProductImages(this);
            
            // Update modal
            updateModalContent(this);
            updateModalImages();
            updateImageCounter();
            
            // Show modal
            modal.style.display = 'flex';
        });
    });
    
    function getAllProductImages(productCard) {
        const images = [];
        const activeColor = productCard.querySelector('.color-option.active');
        
        // Get images from active color option
        if (activeColor) {
            const colorImages = JSON.parse(activeColor.getAttribute('data-images') || '[]');
            colorImages.forEach(img => images.push(img));
        }
        
        // Add any additional thumbnails
        const thumbnails = productCard.querySelectorAll('.thumbnail');
        thumbnails.forEach(thumb => {
            if (!images.includes(thumb.src)) {
                images.push(thumb.src);
            }
        });
        
        return images.slice(0, 5); // Limit to 5 images
    }
    
    function updateModalContent(productCard) {
        // Update product info
        modal.querySelector('.modal-product-title').textContent = 
            productCard.querySelector('.product-title').textContent;
        modal.querySelector('.modal-product-price').textContent = 
            productCard.querySelector('.product-price').textContent;
        modal.querySelector('.modal-product-description').textContent = 
            productCard.querySelector('.product-description').textContent;
        modal.querySelector('.star-rating').innerHTML = 
            productCard.querySelector('.star-rating').innerHTML;
        modal.querySelector('.modal-stock-counter').textContent = 
            productCard.querySelector('.stock-counter').textContent;
        
        // Update color options
        const modalColorOptions = modal.querySelector('.color-options');
        modalColorOptions.innerHTML = productCard.querySelector('.color-options').innerHTML;
        
        // Reattach event listeners to modal color options
        modalColorOptions.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', function() {
                const images = JSON.parse(this.getAttribute('data-images'));
                productImages = images.slice(0, 5);
                currentImageIndex = 0;
                updateModalImages();
                updateImageCounter();
                
                // Update active state
                modalColorOptions.querySelectorAll('.color-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    }
    
    function updateModalImages() {
        if (productImages.length > 0) {
            // Set main image
            modalMainImage.src = productImages[currentImageIndex];
            
            // Create thumbnails
            modalThumbnails.innerHTML = '';
            productImages.forEach((img, index) => {
                const thumb = document.createElement('img');
                thumb.src = img;
                thumb.className = `modal-thumb ${index === currentImageIndex ? 'active' : ''}`;
                thumb.addEventListener('click', () => {
                    currentImageIndex = index;
                    updateModalImages();
                    updateImageCounter();
                });
                modalThumbnails.appendChild(thumb);
            });
            
            // Update total images count
            totalImagesSpan.textContent = productImages.length;
        }
    }
    
    function updateImageCounter() {
        currentImageSpan.textContent = currentImageIndex + 1;
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + productImages.length) % productImages.length;
        updateModalImages();
        updateImageCounter();
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % productImages.length;
        updateModalImages();
        updateImageCounter();
    }
    
    // Navigation buttons
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Close modal
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Close when clicking outside modal
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'Escape') {
                modal.style.display = 'none';
            }
        }
    });
});