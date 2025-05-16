/**
 * Animations JavaScript for Birthday Apology Website
 * Handles complex animations and interactive effects
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initFloatingHearts();
    initTextAnimations();
    initParallaxEffect();
    initInteractiveHeart();
    initFancyHearts();
});

/**
 * Initialize fancy hearts animations
 * Creates additional animated hearts dynamically
 */
function initFancyHearts() {
    const heartContainer = document.querySelector('.heart-container');
    
    if (heartContainer) {
        // Create additional bubble hearts
        createAdditionalHearts(heartContainer, 'bubble-heart', 10, '❤️');
        
        // Create additional pixel hearts
        createAdditionalHearts(heartContainer, 'pixel-heart', 8);
        
        // Create additional glitter hearts
        createAdditionalHearts(heartContainer, 'glitter-heart', 6, '❤');
        
        // Create additional pastel hearts
        const pastelColors = ['pink', 'lavender', 'blue', 'mint', 'yellow', 'peach'];
        createAdditionalHearts(heartContainer, 'pastel-heart', 12, '❤', pastelColors);
        
        // Create sparkle effects that follow mouse movement
        document.addEventListener('mousemove', createSparkleOnMove);
    }
}

/**
 * Create additional hearts of a specific type
 * @param {HTMLElement} container - The container to add hearts to
 * @param {string} className - The class name for the heart type
 * @param {number} count - Number of hearts to create
 * @param {string} content - The content of the heart (emoji or empty for pixel hearts)
 * @param {Array} colorClasses - Optional array of color classes for pastel hearts
 */
function createAdditionalHearts(container, className, count, content = '', colorClasses = []) {
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.classList.add(className);
        
        // Set content if provided
        if (content) {
            heart.textContent = content;
        }
        
        // Add color class for pastel hearts
        if (colorClasses.length > 0) {
            const colorClass = colorClasses[Math.floor(Math.random() * colorClasses.length)];
            heart.classList.add(colorClass);
        }
        
        // Set random position and animation delay
        const randomX = Math.random() * 100;
        const randomDelay = Math.random() * 20;
        
        heart.style.left = `${randomX}%`;
        heart.style.animationDelay = `${randomDelay}s`;
        
        // Add custom properties for pastel hearts
        if (className === 'pastel-heart') {
            heart.style.setProperty('--random-x', Math.random().toFixed(2));
            heart.style.setProperty('--random-rotate', `${Math.floor(Math.random() * 360)}deg`);
        }
        
        // Add to container
        container.appendChild(heart);
    }
}

/**
 * Create sparkle effect that follows mouse movement
 * @param {MouseEvent} e - Mouse event
 */
function createSparkleOnMove(e) {
    // Limit the rate of sparkle creation (every 100ms)
    if (!createSparkleOnMove.lastCreated || Date.now() - createSparkleOnMove.lastCreated > 100) {
        createSparkleOnMove.lastCreated = Date.now();
        
        // Create sparkle element
        const sparkle = document.createElement('div');
        sparkle.classList.add('glitter-heart');
        sparkle.textContent = '❤';
        sparkle.style.position = 'fixed';
        sparkle.style.left = `${e.clientX}px`;
        sparkle.style.top = `${e.clientY}px`;
        sparkle.style.fontSize = '1rem';
        sparkle.style.opacity = '0.8';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        
        // Custom animation for mouse sparkles
        sparkle.style.animation = 'none';
        sparkle.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
        
        // Add to body
        document.body.appendChild(sparkle);
        
        // Animate and remove
        setTimeout(() => {
            sparkle.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * -100}px) scale(0.5) rotate(${Math.random() * 360}deg)`;
            sparkle.style.opacity = '0';
            
            setTimeout(() => {
                if (document.body.contains(sparkle)) {
                    document.body.removeChild(sparkle);
                }
            }, 1000);
        }, 10);
    }
}

/**
 * Initialize the interactive heart with particle effects
 */
function initInteractiveHeart() {
    const heartContainer = document.querySelector('.interactive-heart-container');
    const heartParticles = document.querySelector('.heart-particles');
    
    if (heartContainer && heartParticles) {
        // Create initial particles (hidden)
        createHeartParticles(heartParticles, 30);
        
        // Add event listeners
        heartContainer.addEventListener('mouseenter', function() {
            // Activate particles
            activateHeartParticles(heartParticles);
            
            // Create pulse wave effect
            createPulseWave(heartContainer);
        });
        
        // For mobile devices
        heartContainer.addEventListener('touchstart', function(e) {
            e.preventDefault();
            // Activate particles
            activateHeartParticles(heartParticles);
            
            // Create pulse wave effect
            createPulseWave(heartContainer);
        });
    }
}

/**
 * Create heart particles
 * @param {HTMLElement} container - The container for particles
 * @param {number} count - Number of particles to create
 */
function createHeartParticles(container, count) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('heart-particle');
        
        // Random size
        const size = 5 + Math.random() * 10;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random position around the heart
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 20;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        particle.style.left = `calc(50% + ${x}px)`;
        particle.style.top = `calc(50% + ${y}px)`;
        
        // Random color
        const colors = ['#FFD1DC', '#B76E79', '#ff4d6d', '#ff758f'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Add to container
        container.appendChild(particle);
    }
}

/**
 * Activate heart particles animation
 * @param {HTMLElement} container - The container with particles
 */
function activateHeartParticles(container) {
    const particles = container.querySelectorAll('.heart-particle');
    
    particles.forEach((particle, index) => {
        // Reset animation
        particle.style.animation = 'none';
        particle.offsetHeight; // Trigger reflow
        
        // Random direction
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 100;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        // Random duration
        const duration = 0.5 + Math.random() * 1;
        
        // Set animation
        particle.style.animation = `particleBurst ${duration}s ease-out forwards`;
        particle.style.transform = `translate(${x}px, ${y}px)`;
        particle.style.opacity = '0';
        
        // Delay based on index
        particle.style.animationDelay = (index * 0.02) + 's';
    });
    
    // Reset particles after animation completes
    setTimeout(() => {
        particles.forEach(particle => {
            particle.style.animation = 'none';
            particle.style.transform = 'translate(0, 0)';
            particle.style.opacity = '0';
        });
    }, 2000);
}

/**
 * Create pulse wave effect
 * @param {HTMLElement} container - The container for the pulse wave
 */
function createPulseWave(container) {
    const wave = document.createElement('div');
    wave.classList.add('pulse-wave');
    
    container.appendChild(wave);
    
    // Trigger animation
    setTimeout(() => {
        wave.style.transform = 'scale(3)';
        wave.style.opacity = '0';
        
        // Remove after animation
        setTimeout(() => {
            if (container.contains(wave)) {
                container.removeChild(wave);
            }
        }, 1000);
    }, 10);
}

/**
 * Create and animate floating hearts dynamically
 * This adds to the static hearts created in CSS
 */
function initFloatingHearts() {
    const heroSection = document.getElementById('hero');
    const closingSection = document.getElementById('closing');
    
    if (heroSection) {
        createFloatingElements(heroSection, 15, '❤', ['#FFD1DC', '#B76E79']);
    }
    
    if (closingSection) {
        createFloatingElements(closingSection, 10, '❤', ['#FFD1DC', '#B76E79'], true);
    }
}

/**
 * Create floating elements (hearts, sparkles, etc.)
 * @param {HTMLElement} container - The container to add elements to
 * @param {number} count - Number of elements to create
 * @param {string} symbol - The symbol to display (e.g., '❤')
 * @param {Array} colors - Array of colors to use
 * @param {boolean} small - Whether to use smaller elements
 */
function createFloatingElements(container, count, symbol, colors, small = false) {
    const containerRect = container.getBoundingClientRect();
    
    for (let i = 0; i < count; i++) {
        // Create element
        const element = document.createElement('div');
        element.textContent = symbol;
        element.style.position = 'absolute';
        element.style.color = colors[Math.floor(Math.random() * colors.length)];
        element.style.opacity = (0.3 + Math.random() * 0.4).toString();
        element.style.fontSize = small ? (0.5 + Math.random() * 0.5) + 'rem' : (1 + Math.random() * 1.5) + 'rem';
        element.style.pointerEvents = 'none';
        
        // Set initial position
        const posX = Math.random() * containerRect.width;
        const posY = Math.random() * containerRect.height;
        element.style.left = posX + 'px';
        element.style.top = posY + 'px';
        
        // Add to container
        container.querySelector('.floating-hearts').appendChild(element);
        
        // Animate
        animateFloatingElement(element, containerRect);
    }
}

/**
 * Animate a floating element
 * @param {HTMLElement} element - The element to animate
 * @param {DOMRect} containerRect - The container's bounding rectangle
 */
function animateFloatingElement(element, containerRect) {
    // Random duration between 6-12 seconds
    const duration = 6000 + Math.random() * 6000;
    
    // Random vertical distance to travel (50-100% of container height)
    const distance = containerRect.height * (0.5 + Math.random() * 0.5);
    
    // Random horizontal movement (-20px to +20px)
    const horizontalMovement = (Math.random() * 40 - 20);
    
    // Initial position
    const startX = parseFloat(element.style.left);
    const startY = parseFloat(element.style.top);
    
    // Animation start time
    const startTime = Date.now();
    
    // Animate function
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;
        
        if (progress < 1) {
            // Calculate new position
            const newY = startY - (distance * progress);
            const newX = startX + (horizontalMovement * Math.sin(progress * Math.PI * 2));
            
            // Calculate rotation
            const rotation = Math.sin(progress * Math.PI * 4) * 20;
            
            // Calculate opacity (fade out towards the end)
            const opacity = Math.max(0, 0.7 - progress * 0.7);
            
            // Apply new styles
            element.style.transform = `translate(${newX - startX}px, ${newY - startY}px) rotate(${rotation}deg)`;
            element.style.opacity = opacity.toString();
            
            // Continue animation
            requestAnimationFrame(animate);
        } else {
            // Animation complete, remove element
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
            
            // Create a new element to replace this one
            const container = element.parentNode || document.querySelector('.floating-hearts');
            if (container) {
                const newElement = element.cloneNode(true);
                
                // Reset position and opacity
                newElement.style.transform = '';
                newElement.style.opacity = (0.3 + Math.random() * 0.4).toString();
                
                // Set new random position at the bottom
                newElement.style.top = (containerRect.height - 20) + 'px';
                newElement.style.left = (Math.random() * containerRect.width) + 'px';
                
                // Add to container
                container.appendChild(newElement);
                
                // Start new animation
                setTimeout(() => {
                    animateFloatingElement(newElement, containerRect);
                }, Math.random() * 1000);
            }
        }
    }
    
    // Start animation
    requestAnimationFrame(animate);
}

/**
 * Initialize text animations
 * Adds letter-by-letter animation to main title
 */
function initTextAnimations() {
    const mainTitle = document.querySelector('.main-title');
    const subtitle = document.querySelector('.subtitle');
    
    if (mainTitle) {
        animateText(mainTitle);
    }
    
    if (subtitle) {
        // Delay subtitle animation
        setTimeout(() => {
            animateText(subtitle);
        }, 1000);
    }
}

/**
 * Animate text letter by letter
 * @param {HTMLElement} element - The text element to animate
 */
function animateText(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    
    // Create a span for each letter
    for (let i = 0; i < text.length; i++) {
        const letter = document.createElement('span');
        letter.textContent = text[i];
        letter.style.opacity = '0';
        letter.style.display = 'inline-block';
        letter.style.transform = 'translateY(20px)';
        letter.style.transition = `opacity 0.2s ease, transform 0.2s ease`;
        letter.style.transitionDelay = `${i * 0.05}s`;
        
        element.appendChild(letter);
        
        // Trigger animation after a small delay
        setTimeout(() => {
            letter.style.opacity = '1';
            letter.style.transform = 'translateY(0)';
        }, 10);
    }
}

/**
 * Initialize parallax effect on scroll
 * Creates subtle movement of elements based on scroll position
 */
function initParallaxEffect() {
    const sections = document.querySelectorAll('.section');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Check if section is in viewport
            if (scrollPosition > sectionTop - window.innerHeight && 
                scrollPosition < sectionTop + sectionHeight) {
                
                // Calculate parallax value
                const parallaxValue = (scrollPosition - sectionTop) * 0.2;
                
                // Apply parallax effect to different elements
                const title = section.querySelector('.section-title');
                const card = section.querySelector('.message-card, .birthday-card, .closing-card');
                
                if (title) {
                    title.style.transform = `translateY(${parallaxValue * 0.2}px)`;
                }
                
                if (card) {
                    card.style.transform = `translateY(${parallaxValue * 0.1}px)`;
                }
            }
        });
    });
}

/**
 * Add mouse trail effect
 * Creates sparkles that follow the mouse movement
 */
function addMouseTrailEffect() {
    const trailContainer = document.createElement('div');
    trailContainer.style.position = 'fixed';
    trailContainer.style.top = '0';
    trailContainer.style.left = '0';
    trailContainer.style.width = '100%';
    trailContainer.style.height = '100%';
    trailContainer.style.pointerEvents = 'none';
    trailContainer.style.zIndex = '9999';
    document.body.appendChild(trailContainer);
    
    document.addEventListener('mousemove', function(e) {
        // Create sparkle element
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = (e.clientX - 2) + 'px';
        sparkle.style.top = (e.clientY - 2) + 'px';
        sparkle.style.animation = 'sparkle 1s forwards';
        
        // Add to container
        trailContainer.appendChild(sparkle);
        
        // Remove after animation
        setTimeout(() => {
            if (trailContainer.contains(sparkle)) {
                trailContainer.removeChild(sparkle);
            }
        }, 1000);
    });
}

// Uncomment to enable mouse trail effect
// addMouseTrailEffect();