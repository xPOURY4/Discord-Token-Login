document.addEventListener('DOMContentLoaded', () => {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Deactivate all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Activate the clicked tab
            button.classList.add('active');
            const tabId = `${button.dataset.tab}-tab`;
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Token login functionality
    const loginForm = document.getElementById('loginForm');
    const tokenInput = document.getElementById('tokenInput');
    const loginButton = document.getElementById('loginButton');
    
    loginForm.addEventListener('submit', async e => {
        e.preventDefault();
        
        const token = tokenInput.value.trim();
        if (!token) return;
        
        try {
            // Show loading state
            loginButton.innerHTML = '<span>Logging in...</span><i class="fas fa-spinner fa-spin"></i>';
            loginButton.disabled = true;
            
            // Remove any previous error messages
            const previousError = document.querySelector('.error-message');
            if (previousError) previousError.remove();
            
            const encoded = encodeURIComponent(btoa(token));
            const tabs = await chrome.tabs.query({});
            const discordTabs = tabs.filter(tab => tab.url && tab.url.includes('discord.com'));
            const url = `https://discord.com?ea88237894878a74e654964255b253dc=${encoded}`;
            
            if (discordTabs.length > 0) {
                await chrome.tabs.update(discordTabs[0].id, { url, active: true });
            } else {
                await chrome.tabs.create({ url, active: true });
            }
            
            window.close();
        } catch (err) {
            console.error('Login error:', err);
            
            // Reset button state
            loginButton.innerHTML = '<span>Login</span><i class="fas fa-sign-in-alt"></i>';
            loginButton.disabled = false;
            
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Something went wrong. Please try again.';
            
            loginForm.appendChild(errorMessage);
            
            // Remove error after 3 seconds
            setTimeout(() => {
                errorMessage.remove();
            }, 3000);
        }
    });
});