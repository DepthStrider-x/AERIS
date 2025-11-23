// Authentication Check Utility

// Check if user is authenticated
async function checkAuthentication() {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        // No token found, redirect to login
        redirectToLogin();
        return false;
    }
    
    try {
        const response = await fetch('/api/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            // Token is invalid, clear it and redirect to login
            localStorage.removeItem('authToken');
            redirectToLogin();
            return false;
        }
        
        // Token is valid, return user data
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Error checking authentication:', error);
        redirectToLogin();
        return false;
    }
}

// Redirect to login page
function redirectToLogin() {
    window.location.href = 'auth.html';
}

// Initialize authentication check
document.addEventListener('DOMContentLoaded', function() {
    // Only run on protected pages (account.html, settings.html)
    const protectedPages = ['account.html', 'settings.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage)) {
        checkAuthentication();
    }
});