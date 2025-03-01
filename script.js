document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', function() {
        searchInput.focus();
    });

    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `search-results.html?query=${encodeURIComponent(query)}`;
            }
        }
    });

    // Handle search results display
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    const product = urlParams.get('product');

    if (query) {
        const resultsContainer = document.getElementById('resultsContainer');
        const noResultsMessage = document.getElementById('noResultsMessage');
        const allProducts = [
            { name: 'iPhone 16 Pro', image: 'iphone.jpg', price: '$999' },
            { name: 'MacBook Air M3', image: 'macbook.jpg', price: '$1299' },
            { name: 'Apple Watch Series 10', image: 'applewatch.jpg', price: '$399' },
            { name: 'AirPods Pro', image: 'airpods.jpg', price: '$249' },
            { name: 'iPad Air', image: 'ipadair.jpg', price: '$599' },
            { name: 'PS5 Console', image: 'ps5.jpg', price: '$499' },
            { name: 'HomePod Mini', image: 'homepod.jpg', price: '$99' },
            { name: 'Sony A7 IV', image: 'sony.jpg', price: '$2499' }
        ];

        let found = false;
        resultsContainer.innerHTML = ''; // Clear previous results
        allProducts.forEach(product => {
            if (product.name.toLowerCase().includes(query.toLowerCase())) {
                found = true;
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <span class="new-badge">New</span>
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="price">Price <span>${product.price}</span></p>
                        <button class="buy-now-btn" onclick="window.location.href='product-details.html?product=${encodeURIComponent(product.name)}'">Buy Now</button>
                    </div>
                `;
                resultsContainer.appendChild(productCard);
            }
        });

        if (!found) {
            noResultsMessage.style.display = 'block';
        }
    }

    if (product) {
        const productDetails = {
            'iPhone 16 Pro': { image: 'iphone.jpg', price: '$999', description: 'Experience the latest technology with iPhone 16 Pro.' },
            'MacBook Air M3': { image: 'macbook.jpg', price: '$1299', description: 'Lightweight and powerful, the MacBook Air M3 is perfect for on-the-go productivity.' },
            'Apple Watch Series 10': { image: 'applewatch.jpg', price: '$399', description: 'Stay connected and track your health with the Apple Watch Series 10.' },
            'AirPods Pro': { image: 'airpods.jpg', price: '$249', description: 'Enjoy immersive sound with AirPods Pro.' },
            'iPad Air': { image: 'ipadair.jpg', price: '$599', description: 'Create and entertain with the versatile iPad Air.' },
            'PS5 Console': { image: 'ps5.jpg', price: '$499', description: 'Dive into next-gen gaming with the PS5 Console.' },
            'HomePod Mini': { image: 'homepod.jpg', price: '$99', description: 'Fill your home with rich sound using the HomePod Mini.' },
            'Sony A7 IV': { image: 'sony.jpg', price: '$2499', description: 'Capture stunning photos and videos with the Sony A7 IV.' }
        };

        const selectedProduct = productDetails[product];
        if (selectedProduct) {
            document.getElementById('productName').textContent = product;
            document.getElementById('productImage').src = selectedProduct.image;
            document.getElementById('productImage').alt = product;
            document.getElementById('productPrice').textContent = `Price: ${selectedProduct.price}`;
            document.getElementById('productDescription').textContent = selectedProduct.description;
        }
    }
});
