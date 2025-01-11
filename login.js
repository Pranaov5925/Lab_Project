document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    console.log('Attempting login with:', username, password); // Debug log

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const { token } = await response.json();
            console.log('Login successful, received token:', token); // Debug log
            localStorage.setItem('authToken', token);
            window.location.href = 'index.html'; // Redirect to the dashboard
        } else {
            console.error('Login failed:', response.status); // Debug log
            document.getElementById('error-message').textContent = 'Invalid credentials. Please try again.';
            document.getElementById('error-message').style.display = 'block';
        }
    } catch (error) {
        console.error('Error during login:', error); // Debug log
        document.getElementById('error-message').textContent = 'An error occurred. Please try again.';
        document.getElementById('error-message').style.display = 'block';
    }
});
