document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal, .reveal-right');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    };
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Counter Animation
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;
    
    const counterCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                hasCounted = true;
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;
                        
                        // Calculate increment
                        const isDecimal = counter.getAttribute('data-target').includes('.');
                        const inc = target / 50; // Speed of counting
                        
                        if (count < target) {
                            if (isDecimal) {
                                counter.innerText = (count + inc).toFixed(1);
                            } else {
                                counter.innerText = Math.ceil(count + inc);
                            }
                            setTimeout(updateCount, 40);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
            }
        });
    };
    
    const counterObserver = new IntersectionObserver(counterCallback, { threshold: 0.5 });
    const statsContainer = document.querySelector('.stats-container');
    
    if (statsContainer) {
        counterObserver.observe(statsContainer);
    }
});
