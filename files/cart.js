// add to cart script
function addToCart(id, name, price, image) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({id, name, price, image});
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart !`);
}

// cart page script
function renderCart() {
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartDiv = document.getElementById('cart');
const totalDiv = document.getElementById('total');
const checkoutButton = document.getElementById('checkoutButton');
cartDiv.innerHTML = '';
totalDiv.innerHTML = '';
let total = 0;

cart.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
        <div>
        ${item.name} - ₱${item.price}
        <br>
        <a href="../pages/product.html?item=${item.id}">
        <img src="${item.image}">
        </a>
        <br>
        <button class="button" onclick="removeFromCart(${index}, this)">Remove</button>
        </div>`;
    cartDiv.appendChild(itemDiv);
    total += item.price;
    });

if (cart.length === 0) {
    cartDiv.innerHTML = '<p>Order our trash first!</p>';
    return;
} 

else {
    totalDiv.innerHTML = `<p>Total: <span style="font-size: 180%; font-weight: 900%;"> ₱${total} </span> </p>`;
}
}

// checkout button script
document.getElementById('checkoutButton').addEventListener('click', function(event) {
const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        event.preventDefault();
        alert('Your cart is empty! Peek on our trash first.');
    } else {
        const confirmation = confirm('Are you sure to proceed to checkout?');

        if (!confirmation) {
            event.preventDefault();
        } else {
            // Save cart to history
            const history = JSON.parse(localStorage.getItem('history')) || [];
            history.push({ items: cart, timestamp: new Date() });
            localStorage.setItem('history', JSON.stringify(history));

            // Clear the cart
            localStorage.removeItem('cart');

            // Redirect to checkout page
            window.location.href = '../pages/checkout.html';
        }
    }
});


// remove button script
function removeFromCart(index, button) {
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const itemDiv = button.parentElement.parentElement;
const itemHeight = itemDiv.offsetHeight;
itemDiv.style.transition = 'none';
itemDiv.style.height = itemHeight + 'px';
itemDiv.style.opacity = '1';
itemDiv.offsetHeight;
itemDiv.style.transition = 'height 0.3s ease, opacity 0.3s ease';
itemDiv.style.height = '0';
itemDiv.style.opacity = '0';

setTimeout(() => {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}, 300);
}

document.addEventListener('DOMContentLoaded', renderCart);

// add to favorites script
function addToFave(id, name, price, image) {
    const fave = JSON.parse(localStorage.getItem('fave')) || [];
    fave.push({id, name, price, image});
    localStorage.setItem('fave', JSON.stringify(fave));
    alert(`${name} added to favorites !`);
}

// remove button script
function removeFromFave(index, button) {
    const fave = JSON.parse(localStorage.getItem('fave')) || [];
    const itemDiv = button.parentElement.parentElement;
    const itemHeight = itemDiv.offsetHeight;
    itemDiv.style.transition = 'none';
    itemDiv.style.height = itemHeight + 'px';
    itemDiv.style.opacity = '1';
    itemDiv.offsetHeight;
    itemDiv.style.transition = 'height 0.3s ease, opacity 0.3s ease';
    itemDiv.style.height = '0';
    itemDiv.style.opacity = '0';
    
    setTimeout(() => {
        fave.splice(index, 1);
        localStorage.setItem('fave', JSON.stringify(fave));
        renderFave();
    }, 300);
    }
    
    document.addEventListener('DOMContentLoaded', renderFave);