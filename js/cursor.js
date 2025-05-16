/**
 * Custom Heart Cursor JavaScript
 * Creates a heart-shaped cursor with trailing heart emojis
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initHeartCursor();
    
    // Wait a short moment to ensure all other scripts have initialized
    setTimeout(() => {
        enhanceCursorInteractions();
    }, 1000);
});

/**
 * Initialize the heart-shaped cursor and trail effects
 */
function initHeartCursor() {
    // Create cursor elements
    createCursorElements();
    
    // Track mouse movement
    document.addEventListener('mousemove', updateCursorPosition);
    
    // Handle mouse enter/leave events for the document
    document.addEventListener('mouseenter', showCursor);
    document.addEventListener('mouseleave', hideCursor);
    
    // Handle clicks for pulse effect
    document.addEventListener('click', createClickEffect);
    
    // Disable existing mouse trail if present to avoid conflicts
    if (typeof createSparkleOnMove !== 'undefined') {
        document.removeEventListener('mousemove', createSparkleOnMove);
    }
}

/**
 * Create the cursor elements and add them to the DOM
 */
function createCursorElements() {
    // Create main cursor container
    const cursorContainer = document.createElement('div');
    cursorContainer.classList.add('heart-cursor');
    cursorContainer.id = 'heart-cursor';
    
    // Create inner heart element
    const cursorInner = document.createElement('div');
    cursorInner.classList.add('heart-cursor-inner');
    cursorInner.innerHTML = '❤';
    
    // Add to DOM
    cursorContainer.appendChild(cursorInner);
    document.body.appendChild(cursorContainer);
    
    // Initially hide cursor until mouse enters
    cursorContainer.style.opacity = '0';
}

/**
 * Update cursor position based on mouse movement
 * Also creates trailing hearts
 * @param {MouseEvent} e - Mouse event
 */

// Store original createSparkleOnMove function if it exists
if (typeof window.originalCreateSparkleOnMove === 'undefined' &&
    typeof createSparkleOnMove !== 'undefined') {
    window.originalCreateSparkleOnMove = createSparkleOnMove;
}
function updateCursorPosition(e) {
    const cursor = document.getElementById('heart-cursor');
    
    if (cursor) {
        // Update cursor position
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        // Show cursor if hidden
        if (cursor.style.opacity === '0') {
            cursor.style.opacity = '1';
        }
        
        // Create trail effect with throttling
        if (!updateCursorPosition.lastTrail || Date.now() - updateCursorPosition.lastTrail > 100) {
            updateCursorPosition.lastTrail = Date.now();
            createHeartTrail(e.clientX, e.clientY);
        }
    }
}

/**
 * Create a heart trail element at the specified position
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 */
function createHeartTrail(x, y) {
    // Create heart trail element
    const trail = document.createElement('div');
    trail.classList.add('heart-trail');
    
    // Choose a random heart emoji from the collection
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💘', '💝', '💞'];
    const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];
    trail.innerHTML = randomHeart;
    
    // Set position
    trail.style.left = `${x}px`;
    trail.style.top = `${y}px`;
    
    // Add random rotation
    const rotation = Math.random() * 60 - 30; // -30 to 30 degrees
    trail.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
    
    // Add random size variation
    const size = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
    trail.style.fontSize = `${20 * size}px`;
    
    // Add to DOM
    document.body.appendChild(trail);
    
    // Remove after animation completes
    setTimeout(() => {
        if (document.body.contains(trail)) {
            document.body.removeChild(trail);
        }
    }, 1000);
}

/**
 * Create a click effect with multiple hearts bursting outward
 * @param {MouseEvent} e - Mouse event
 */
function createClickEffect(e) {
    const burstCount = 8; // Number of hearts to burst out
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💘', '💝', '💞'];
    
    for (let i = 0; i < burstCount; i++) {
        // Create heart element
        const heart = document.createElement('div');
        heart.classList.add('heart-trail');
        
        // Random heart emoji
        const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];
        heart.innerHTML = randomHeart;
        
        // Set initial position
        heart.style.left = `${e.clientX}px`;
        heart.style.top = `${e.clientY}px`;
        
        // Random direction
        const angle = (i / burstCount) * Math.PI * 2;
        const distance = 30 + Math.random() * 20;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        // Random size
        const size = 0.8 + Math.random() * 0.6;
        heart.style.fontSize = `${20 * size}px`;
        
        // Add to DOM
        document.body.appendChild(heart);
        
        // Animate
        setTimeout(() => {
            heart.style.transition = `transform 0.8s ease-out, opacity 0.8s ease-out`;
            heart.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${0.5 + Math.random() * 0.5})`;
            heart.style.opacity = '0';
            
            // Remove after animation
            setTimeout(() => {
                if (document.body.contains(heart)) {
                    document.body.removeChild(heart);
                }
            }, 800);
        }, 10);
    }
}

/**
 * Show the cursor when mouse enters the document
 */
function showCursor() {
    const cursor = document.getElementById('heart-cursor');
    if (cursor) {
        cursor.style.opacity = '1';
    }
}

/**
 * Hide the cursor when mouse leaves the document
 */
function hideCursor() {
    const cursor = document.getElementById('heart-cursor');
    if (cursor) {
        cursor.style.opacity = '0';
    }
}

/**
 * Handle special cursor behavior for interactive elements
 * This adds special effects when hovering over buttons, links, etc.
 */
function initSpecialCursorBehavior() {
    // Get all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, .interactive-heart-container, .gift-box, .nav-dot');
    
    interactiveElements.forEach(element => {
        // Mouse enter - make cursor larger
        element.addEventListener('mouseenter', () => {
            const cursor = document.querySelector('.heart-cursor-inner');
            if (cursor) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.3)';
                cursor.style.color = '#ff4d6d'; // Brighter color
            }
        });
        
        // Mouse leave - restore cursor
        element.addEventListener('mouseleave', () => {
            const cursor = document.querySelector('.heart-cursor-inner');
            if (cursor) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.color = 'var(--accent-color)';
            }
        });
    });
}

// Initialize special cursor behavior after a short delay
// This ensures all elements are properly loaded
setTimeout(initSpecialCursorBehavior, 500);

/**
 * Enhance cursor interactions with existing website features
 * This integrates the cursor with the existing animations
 */
function enhanceCursorInteractions() {
    // Enhance interactive heart
    const interactiveHeart = document.querySelector('.interactive-heart-container');
    if (interactiveHeart) {
        interactiveHeart.addEventListener('mouseenter', () => {
            // Create extra hearts around the cursor
            const cursor = document.getElementById('heart-cursor');
            if (cursor) {
                cursor.classList.add('enhanced');
                
                // Create a burst of hearts
                const position = interactiveHeart.getBoundingClientRect();
                const centerX = position.left + position.width / 2;
                const centerY = position.top + position.height / 2;
                
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        createHeartTrail(centerX, centerY);
                    }, i * 100);
                }
            }
        });
        
        interactiveHeart.addEventListener('mouseleave', () => {
            const cursor = document.getElementById('heart-cursor');
            if (cursor) {
                cursor.classList.remove('enhanced');
            }
        });
    }
    
    // Enhance gift box interaction
    const giftBox = document.querySelector('.gift-box');
    if (giftBox) {
        giftBox.addEventListener('mouseenter', () => {
            const cursor = document.querySelector('.heart-cursor-inner');
            if (cursor) {
                cursor.style.color = '#FFC700'; // Gold color
                cursor.style.animation = 'pulse-cursor 0.8s infinite ease-in-out';
            }
        });
        
        giftBox.addEventListener('mouseleave', () => {
            const cursor = document.querySelector('.heart-cursor-inner');
            if (cursor) {
                cursor.style.color = 'var(--accent-color)';
                cursor.style.animation = 'pulse-cursor 1.5s infinite ease-in-out';
            }
        });
    }
    
    // Enhance section navigation
    const navDots = document.querySelectorAll('.nav-dot');
    navDots.forEach(dot => {
        dot.addEventListener('mouseenter', () => {
            const cursor = document.querySelector('.heart-cursor-inner');
            if (cursor) {
                cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
                cursor.style.opacity = '0.8';
            }
        });
        
        dot.addEventListener('mouseleave', () => {
            const cursor = document.querySelector('.heart-cursor-inner');
            if (cursor) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.opacity = '1';
            }
        });
    });
    
    // Override the createSparkleOnMove function to integrate with our cursor
    if (typeof window.originalCreateSparkleOnMove !== 'undefined') {
        window.createSparkleOnMove = function(e) {
            // Call original function with reduced frequency
            if (Math.random() > 0.7) {
                window.originalCreateSparkleOnMove(e);
            }
        };
    }
}