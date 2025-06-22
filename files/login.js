// login page script
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    localStorage.setItem('username', username);
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);

    window.location.href = '/index.html';
});