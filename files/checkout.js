// checkout page script
document.getElementById('checkoutForm').addEventListener('submit', function(event) {
event.preventDefault();

const name = document.getElementById('name').value;
const address = document.getElementById('address').value;
const city = document.getElementById('city').value;
const state = document.getElementById('state').value;
const zip = document.getElementById('zip').value;
const cardNumber = document.getElementById('cardNumber').value;
const expiry = document.getElementById('expiry').value;
const cvv = document.getElementById('cvv').value;

if (!name || !address || !city || !state || !zip || !cardNumber || !expiry || !cvv) {
    alert('Please fill in all fields.');
    return;
}

const confirmation = confirm("Are you sure you want to complete your purchase?");
    if (confirmation) {
        alert(`Thank you, ${name}! Your order has been placed successfully.`);
        localStorage.removeItem('cart');
        window.location.href = '../pages/cart.html';
    } else {
        alert('Your purchase has been canceled.');
    }
});