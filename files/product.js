// lists
function fetchAndRenderProducts(url, listId, productClass = 'box-product') {
    fetch(url)
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById(listId);
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = productClass;
                productDiv.innerHTML = `
                    <a href="../pages/product.html?item=${product.id}">
                    <img src="${product.image}">
                    </a>
                    <h3 class="text-high">${product.name}</h3>
                    <p class="text-low">${product.shortdesc}</p>
                    <div class="price">₱${product.price}</div>
                    <button class="button" onclick="addToCart(${product.cart})">Add to Cart</button>
                `;
                productList.appendChild(productDiv);
            });
        });
}

fetchAndRenderProducts('../products/home/featured.json', 'featured-list', 'box-product');
fetchAndRenderProducts('../products/home/new.json', 'new-list', 'box-product');
fetchAndRenderProducts('../products/men/picks-men.json', 'men-list', 'closet-product');
fetchAndRenderProducts('../products/women/picks-women.json', 'women-list', 'closet-product');
fetchAndRenderProducts('../products/men/tops-men.json', 'men-tops-list', 'closet-product');
fetchAndRenderProducts('../products/men/bottoms-men.json', 'men-bottoms-list', 'closet-product');
fetchAndRenderProducts('../products/men/accessories-men.json', 'men-accessories-list', 'closet-product');
fetchAndRenderProducts('../products/men/shoes-men.json', 'men-shoes-list', 'closet-product');
fetchAndRenderProducts('../products/women/tops-women.json', 'women-tops-list', 'closet-product');
fetchAndRenderProducts('../products/women/bottoms-women.json', 'women-bottoms-list', 'closet-product');
fetchAndRenderProducts('../products/women/accessories-women.json', 'women-accessories-list', 'closet-product');
fetchAndRenderProducts('../products/women/shoes-women.json', 'women-shoes-list', 'closet-product');

// product view
async function fetchProductById(url, productId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        const product = data.find(item => item.id === productId);
        
        const productContainer = document.getElementById('product-stuff');
        if (product) {
            productContainer.innerHTML = `
                <div class="product-info">
                    <h1 class="product-title">${product.name}</h1>
                    <p class="product-price">₱${product.price}</p>
                    <p class="product-description">${product.description}</p>
                    <br>
                    <div class="product-button">
                    <button class="button" onclick="addToCart(${product.cart})">Buy</button>
                    <button class="button" onclick="addToFave(${product.cart})">Favorite</button>
                    <button class="button back" onclick="goBack()">Back</button>
                    </div>
                    <br>
                </div>
                <img src="${product.image}" class="product-image">
            `;
            document.title = 'Binco - ' + product.name;
        } else {
            productContainer.innerHTML = `<p>Product not found.</p>`;
        }
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const jsonUrl = '../products/apparel.json';
const productId = getQueryParameter('item');
if (productId) {
    fetchProductById(jsonUrl, Number(productId));
} else {
    document.getElementById('product-stuff').innerHTML = '<p>No product specified.</p>';
}