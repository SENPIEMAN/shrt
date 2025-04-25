document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const urlInput = document.getElementById('url-input');
    const shortenBtn = document.getElementById('shorten-btn');
    const resultContainer = document.getElementById('result-container');
    const loadingContainer = document.getElementById('loading-container');
    const errorContainer = document.getElementById('error-container');
    const errorMessage = document.getElementById('error-message');
    const shortUrlInput = document.getElementById('short-url');
    const originalUrlSpan = document.getElementById('original-url');
    const copyBtn = document.getElementById('copy-btn');
    const newUrlBtn = document.getElementById('new-url-btn');
    const tryAgainBtn = document.getElementById('try-again-btn');

    // Event Listeners
    shortenBtn.addEventListener('click', shortenUrl);
    copyBtn.addEventListener('click', copyToClipboard);
    newUrlBtn.addEventListener('click', resetForm);
    tryAgainBtn.addEventListener('click', resetForm);
    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            shortenUrl();
        }
    });

    // Focus on the URL input when the page loads
    urlInput.focus();

    // Function to shorten URL
    async function shortenUrl() {
        const url = urlInput.value.trim();
        
        if (!url) {
            showError('Please enter a URL');
            return;
        }

        // Show loading state
        showLoading();

        try {
            const response = await fetch('/api/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to shorten URL');
            }

            // Show result
            showResult(data.shortUrl, url);
        } catch (error) {
            showError(error.message);
        }
    }

    // Function to copy shortened URL to clipboard
    function copyToClipboard() {
        shortUrlInput.select();
        document.execCommand('copy');
        
        // Visual feedback for copy
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 1500);
    }

    // Function to reset the form
    function resetForm() {
        urlInput.value = '';
        hideAllContainers();
        urlInput.focus();
    }

    // Function to show loading state
    function showLoading() {
        hideAllContainers();
        loadingContainer.style.display = 'block';
    }

    // Function to show result
    function showResult(shortUrl, originalUrl) {
        hideAllContainers();
        shortUrlInput.value = shortUrl;
        
        // Truncate original URL if it's too long
        if (originalUrl.length > 50) {
            originalUrlSpan.textContent = originalUrl.substring(0, 50) + '...';
        } else {
            originalUrlSpan.textContent = originalUrl;
        }
        
        // Set title attribute to show full URL on hover
        originalUrlSpan.title = originalUrl;
        
        resultContainer.style.display = 'block';
    }

    // Function to show error
    function showError(message) {
        hideAllContainers();
        errorMessage.textContent = message;
        errorContainer.style.display = 'block';
    }

    // Function to hide all containers
    function hideAllContainers() {
        resultContainer.style.display = 'none';
        loadingContainer.style.display = 'none';
        errorContainer.style.display = 'none';
    }
});
