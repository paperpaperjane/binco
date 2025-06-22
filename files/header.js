// profile script
const profileBox = document.getElementById('profileBox');
const profileInfo = document.getElementById('profileInfo');
const profileButton = document.getElementById('profileButton');
const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logoutButton');
const viewprofileButton = document.getElementById('viewprofileButton');
const profilePic = document.getElementById('profile-pic');

    function updateProfile() {
        const loggedIn = localStorage.getItem('username') !== null;
        if (loggedIn) {
            profileInfo.innerHTML = `
                <h2 class="profile-label">Username</h2> ${localStorage.getItem('username')}<br>
                <h2 class="profile-label">Name</h2> ${localStorage.getItem('name')}<br>
                <h2 class="profile-label">Email</h2> ${localStorage.getItem('email')}
                <br>
                `;
            loginButton.style.display = 'none';
            viewprofileButton.style.display = 'block';
            logoutButton.style.display = 'block';
        } else {
            profileInfo.innerHTML = `
                <h1 class="profile-label">Your Binco</h1>
                `;
            loginButton.style.display = 'block';
            viewprofileButton.style.display = 'none';
            logoutButton.style.display = 'none';
        }
        }

    profileButton.addEventListener('click', () => {
    if (profileBox.style.height === '0px' || profileBox.style.height === '') {
        profileBox.style.display = 'block';
        setTimeout(() => {
            profileBox.style.height = profileBox.scrollHeight + 'px';
            profileBox.classList.add('visible');
        }, 10);
    } else {
        profileBox.classList.remove('visible');
        profileBox.style.height = '0px';
        
        setTimeout(() => {
            profileBox.style.display = 'none';
        }, 500);
    }
    updateprofile();
    });

    viewprofileButton.addEventListener('click', () => {
    window.location.href = '../pages/profile.html';
    });

    loginButton.addEventListener('click', () => {
    window.location.href = '../pages/login.html';
    });

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('username');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('profilePic');
        setTimeout(() => {
            profileBox.style.display = 'none';
        }, 500); 
        profileBox.classList.remove('visible');
        profileBox.style.height = '0px';  
        setTimeout(() => {
        updateProfile();
        }, 600) 
    });

    updateProfile();

    
// cart script
const cartBox = document.getElementById('cartBox');
const cartInfo = document.getElementById('cartInfo');
const viewcartButton = document.getElementById('viewcartButton');
const cartButton = document.getElementById('cartButton');

function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length > 0) {
        cartInfo.innerHTML = cart.map(item => `
        <div>
        <hr style="border-color: #fbb304;">
        <p>${item.name}</p>
        <a href="../pages/product.html?item=${item.id}">
        <img src="${item.image}" height="90px">
        </a>
        </div>
        `).join('');
        viewcartButton.style.display = 'block';
    } else {
        cartInfo.innerHTML = `
            <p class="text-high" style="color: #fbb304; font-size: 14px;">No items in cart.</h1>
        `;
        viewcartButton.style.display = 'none';
    }
}

viewcartButton.addEventListener('click', () => {
    window.location.href = '../pages/cart.html';
});

cartButton.addEventListener('click', () => {
    if (cartBox.style.height === '0px' || cartBox.style.height === '') {
        cartBox.style.display = 'block';
        setTimeout(() => {
            cartBox.style.height = cartBox.scrollHeight + 'px';
            cartBox.classList.add('visible');
        }, 10);
    } else {
        cartBox.classList.remove('visible');
        cartBox.style.height = '0px';
        
        setTimeout(() => {
            cartBox.style.display = 'none';
        }, 500);
    }

    updateCart();
});