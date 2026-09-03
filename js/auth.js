document.getElementById('formLogin').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    // Password tidak divalidasi secara spesifik sesuai permintaan Anda
    
    // Logika penentuan role: 
    // Jika username adalah 'admin' maka role jadi 'admin', selain itu jadi 'user'
    const role = (username.toLowerCase() === 'admin') ? 'admin' : 'user';

    localStorage.setItem('currentUser', username);
    localStorage.setItem('currentRole', role);

    if (role === 'admin') {
        window.location.href = 'admin.html';
    } else {
        window.location.href = 'index.html';
    }
});