document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100; // Distance from bottom before revealing

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();
});

// what we do section


    gsap.registerPlugin(ScrollTrigger);

    const section = document.querySelector('.what-we-do');
    const grid = document.querySelector('.services-grid');

    // 1. Header Reveal Animation
    gsap.from(".section-header > *", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
            trigger: ".section-header",
            start: "top 80%"
        }
    });

    // 2. Horizontal Scroll Effect
    // We only want this on Desktop
    if (window.innerWidth > 768) {
        let scrollTween = gsap.to(grid, {
            x: () => -(grid.scrollWidth - window.innerWidth + window.innerWidth * 0.1),
            ease: "none",
            scrollTrigger: {
                trigger: ".what-we-do",
                pin: true,
                scrub: 1,
                end: () => "+=" + grid.scrollWidth,
                // markers: true, // Uncomment to debug
            }
        });

        // 3. Card Entrance Animation (as they enter viewport during horizontal scroll)
        gsap.utils.toArray(".service-card").forEach((card, i) => {
            gsap.from(card, {
                scale: 0.8,
                opacity: 0,
                duration: 0.5,
                scrollTrigger: {
                    trigger: card,
                    containerAnimation: scrollTween, // Essential for horizontal logic
                    start: "left 90%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }

    // 4. Parallax effect for the Title
    gsap.to(".parallax-title", {
        x: 100,
        scrollTrigger: {
            trigger: ".what-we-do",
            scrub: true
        }
    });

    // 5. Mouse move effect on cards (Tilt effect)
    document.querySelectorAll('.card-inner').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            
            const dx = x - xc;
            const dy = y - yc;
            
            gsap.to(card, {
                rotationY: dx / 20,
                rotationX: -dy / 20,
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.5
            });
        });
    });



   // footer

    
   gsap.registerPlugin(ScrollTrigger);

// 1. Entrance Stagger
const contactTL = gsap.timeline({
    scrollTrigger: {
        trigger: ".contact-section",
        start: "top 70%"
    }
});

contactTL
    .from(".contact-content > *", {
        x: -50,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power4.out"
    })
    .from(".form-container", {
        x: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
    }, "-=0.8");

// 2. Form Input Interactions (Micro-motions)
const inputs = document.querySelectorAll('.input-group input, .input-group textarea');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        gsap.to(input.parentElement, { scale: 1.02, duration: 0.3 });
    });
    input.addEventListener('blur', () => {
        gsap.to(input.parentElement, { scale: 1, duration: 0.3 });
    });
});

// 3. Footer Stagger
gsap.from(".footer-grid > *", {
    y: 40,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
        trigger: ".main-footer",
        start: "top 85%"
    }
});

// 4. Parallax BG
gsap.to(".parallax-bg", {
    y: -100,
    rotate: 15,
    scrollTrigger: {
        trigger: ".contact-section",
        scrub: true
    }
});