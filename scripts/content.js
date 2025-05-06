// Token parameter in URL
const TOKEN_PARAM = 'ea88237894878a74e654964255b253dc';

// Check for token in URL
const params = new URLSearchParams(window.location.search);
const encoded = params.get(TOKEN_PARAM);

if (encoded) {
    try {
        // Decode the token
        const token = atob(decodeURIComponent(encoded));
        
        // Clear localStorage and store the token
        localStorage.clear();
        localStorage.setItem('token', JSON.stringify(token));
        
        // Clean up URL and redirect to Discord
        window.history.replaceState({}, document.title, '/');
        window.location.replace('https://discord.com/channels/@me');
    } catch (err) {
        console.error('Error processing Discord token:', err);
    }
}