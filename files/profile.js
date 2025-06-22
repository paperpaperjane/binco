// button scripts
function toggleVisibility(elementId) {
    const sections = document.querySelectorAll('.section');
    const currentSection = document.getElementById(elementId);
    const isActive = currentSection.classList.contains('active');

    sections.forEach(section => {
        section.classList.remove('active');
    });
    if (!isActive) {
        currentSection.classList.add('active');
    }
}

document.getElementById('toggleHistory').addEventListener('click', function () {
    toggleVisibility('history');
});

document.getElementById('toggleFavorites').addEventListener('click', function () {
    toggleVisibility('favorites');
});


// history script
function renderHistory() {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    const historyDiv = document.getElementById('history');
    historyDiv.innerHTML = '';

    if (history.length === 0) {
        historyDiv.innerHTML = '<p>No history found!</p>';
        return;
    } else {
        historyDiv.innerHTML = '<button class="button" id="deleteHistoryButton">Clear History</button>';
    }

    history.forEach((order, orderIndex) => {
        const orderDiv = document.createElement('div');
        orderDiv.className = 'order-history';
        orderDiv.innerHTML = `<h3>Order #${orderIndex + 1} - ${new Date(order.timestamp).toLocaleString()}</h3>`;

        order.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'history-item';
            itemDiv.innerHTML = `
                <div>
                    <strong>${item.name}</strong> - ₱${item.price}
                    <br>
                    <img src="${item.image}" alt="${item.name}">
                </div>`;
            orderDiv.appendChild(itemDiv);
        });

        historyDiv.appendChild(orderDiv);
    });

    const deleteHistoryButton = document.getElementById('deleteHistoryButton');
    if (deleteHistoryButton) {
        deleteHistoryButton.addEventListener('click', clearHistory);
    }
}
document.addEventListener('DOMContentLoaded', renderHistory);

    // clear history
function clearHistory() {
    if (confirm('Hey, you sure you want to clear it? This cannot be undone.')) {
        localStorage.removeItem('history');
        renderHistory();
        alert('Order history deleted successfully.');
    }
}
// favorite script
function renderFave() {
    const fave = JSON.parse(localStorage.getItem('fave')) || [];
    const faveDiv = document.getElementById('favorite');
    faveDiv.innerHTML = '';
    
    fave.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'fav-product';
        itemDiv.innerHTML = `
            <div>
            ${item.name}
            <br>
            <a href="../pages/product.html?item=${item.id}">
            <img src="${item.image}">
            </a>
            <br>
            <button class="button" onclick="removeFromFave(${index}, this)">Remove</button>
            </div>`;
        faveDiv.appendChild(itemDiv);
        });
    
    if (fave.length === 0) {
        faveDiv.innerHTML = '<p>You have no favorites.</p>';
        return;
    } 
    }
    
    // remove fav script
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

// profile script
const username = document.getElementById('username');
const name = document.getElementById('name');
const email = document.getElementById('email');
const profile = document.getElementById('profile');

    function updateProfile() {
        const loggedIn = localStorage.getItem('username') !== null;
        if (loggedIn) {
            profile.innerHTML = `
                <h1>${localStorage.getItem('username')}</h1>
                <p> ${localStorage.getItem('name')}</p>
                <p>${localStorage.getItem('email')}</p>
                `;
        } else {
            profileInfo.innerHTML = `
                <h1 class="profile-label">Your Binco</h1>
                `;
    }}
    updateProfile();

// profile picture
// Function to update the profile picture
function updateProfilePic(src) {
    const profilePic = document.getElementById('profile-pic');
    profilePic.src = src;
    localStorage.setItem('profilePic', src); // Save to localStorage
}

// Load profile picture from localStorage on page load
window.onload = function () {
    const savedPic = localStorage.getItem('profilePic');
    if (savedPic) {
        updateProfilePic(savedPic);
    } else {
        resetProfilePic(); // Set to default if no picture is saved
    }
};

// Function to reset profile picture to default
function resetProfilePic() {
    const profilePic = document.getElementById('profile-pic');
    localStorage.removeItem('profilePic'); // Clear from localStorage
}

// Handle profile picture click
document.getElementById('profile-pic').onclick = function () {
    document.getElementById('file-input').click();
};

// Handle file input change
document.getElementById('file-input').onchange = function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        updateProfilePic(e.target.result); // Update profile picture
    };

    if (file) {
        reader.readAsDataURL(file);
    }
};

// Function to handle logout
function logout() {
    resetProfilePic(); // Reset profile picture on logout
    // Additional logout logic here (e.g., redirect to login page)
}

// Example logout button
document.getElementById('logoutButton').onclick = function () {
    logout();
};