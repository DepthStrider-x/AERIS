// DOM Elements
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signUpForm = document.querySelector('.sign-up form');
const signInForm = document.querySelector('.sign-in form');

// Toggle between sign up and sign in
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Sign up form submission
signUpForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;
    
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                name: name,
                email: email,
                password: password
            })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            // Registration successful, show success message
            alert('Registration successful! Please sign in.');
            container.classList.remove("active");
        } else {
            // Registration failed
            alert('Registration failed: ' + result.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration');
    }
});

// Sign in form submission
signInForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                email: email,
                password: password
            })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            // Login successful, save token and redirect to index.html
            localStorage.setItem('authToken', result.token);
            window.location.href = 'index.html';
        } else {
            // Login failed
            alert('Login failed: ' + result.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login');
    }
});