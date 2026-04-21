// Simple Romantic Interactions

document.addEventListener('DOMContentLoaded', () => {
    // Scroll Indicator
    const scrollTop = document.querySelector('.scroll-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollTop.style.opacity = '1';
            scrollTop.style.pointerEvents = 'auto';
        } else {
            scrollTop.style.opacity = '0';
            scrollTop.style.pointerEvents = 'none';
        }
    });

    // Subtle Parallax for blobs
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        document.querySelectorAll('.blob').forEach((blob, index) => {
            const speed = (index + 1) * 20;
            blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // Romantic Quote Shuffle (Optional enhancement)
    const quotes = [
        "I love you not because of who you are, but because of who I am when I am with you.",
        "You are my today and all of my tomorrows.",
        "Loved you yesterday, love you still, always have, always will.",
        "The best thing to hold onto in life is each other."
    ];
    
    let currentQuote = 0;
    const quoteElement = document.querySelector('.quote-text');
    
    if (quoteElement) {
        setInterval(() => {
            gsap.to(quoteElement, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    currentQuote = (currentQuote + 1) % quotes.length;
                    quoteElement.innerText = quotes[currentQuote];
                    gsap.to(quoteElement, { opacity: 1, duration: 0.5 });
                }
            });
        }, 8000);
    }
});
