// Simple Website View System
class WebsiteViewSystem {
    constructor() {
        this.taskCompleted = false;
    }

    init() {
        this.setupSecurityFeatures();
        this.setupWebsiteViewTracking();
    }

    setupSecurityFeatures() {
        // Prevent right-click
        document.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // Prevent text selection
        document.addEventListener('selectstart', (e) => e.preventDefault());
        
        // Prevent keyboard shortcuts for dev tools
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && e.key === 'I') || 
                (e.ctrlKey && e.key === 'u')) {
                e.preventDefault();
            }
        });
    }

    setupWebsiteViewTracking() {
        // Track when iframes are loaded
        const iframes = document.querySelectorAll('.website-box iframe');
        let loadedCount = 0;
        const totalIframes = iframes.length;
        
        iframes.forEach((iframe, index) => {
            iframe.addEventListener('load', () => {
                loadedCount++;
                console.log(`Website ${index + 1} loaded (${loadedCount}/${totalIframes})`);
                
                // Check if all websites are loaded
                if (loadedCount === totalIframes && !this.taskCompleted) {
                    this.completeTask();
                }
            });
            
            // Also track error events
            iframe.addEventListener('error', () => {
                console.log(`Website ${index + 1} failed to load`);
                loadedCount++;
       
            });
        });
        
   
    

    addVibrationEffect(element) {
        let vibrations = 0;
        const vibrateInterval = setInterval(() => {
            if (vibrations < 6) {
                element.style.transform = `translate(-50%, -50%) scale(1) translateX(${vibrations % 2 === 0 ? '2px' : '-2px'})`;
                vibrations++;
            } else {
                clearInterval(vibrateInterval);
                element.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        }, 100);
    }

    redirectToHome() {
        try {
            // Use replace instead of assign for security
            window.location.replace('index.html');
        } catch (error) {
            console.error('Redirect error:', error);
            // Fallback
            window.location.href = 'index.html';
        }
    }
}


        
        // Initialize the website view system
        window.websiteViewSystem = new WebsiteViewSystem();
        window.websiteViewSystem.init();
        
        // Add global error handler
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
        });
        
    } catch (error) {
        console.error('Initialization error:', error);
    }
}

// Fast Load - Start Immediately
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}