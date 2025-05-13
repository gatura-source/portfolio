/**
 * Form validation for contact form
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous error states
            clearFormErrors();
            
            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            const consent = document.getElementById('consent');
            const formStatus = document.getElementById('formStatus');
            
            // Validate form
            let isValid = true;
            
            // Name validation
            if (!name.value.trim()) {
                displayError(name, 'nameError', 'Please enter your name');
                isValid = false;
            }
            
            // Email validation
            if (!isValidEmail(email.value)) {
                displayError(email, 'emailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Subject validation
            if (!subject.value.trim()) {
                displayError(subject, 'subjectError', 'Please enter a subject');
                isValid = false;
            }
            
            // Message validation
            if (!message.value.trim()) {
                displayError(message, 'messageError', 'Please enter your message');
                isValid = false;
            }
            
            // Consent validation
            if (!consent.checked) {
                displayError(consent, 'consentError', 'You must agree to the privacy policy');
                isValid = false;
            }
            
            // Submit form if valid
            if (isValid) {
                // Show loading state
                const submitBtn = contactForm.querySelector('.btn-submit');
                const originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                // Simulate form submission (replace with actual submission)
                setTimeout(function() {
                    // Hide form
                    contactForm.reset();
                    
                    // Show success message
                    formStatus.innerHTML = '<div class="success-message">Thank you for your message! I will get back to you soon.</div>';
                    
                    // Reset button
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    
                    // Clear success message after 5 seconds
                    setTimeout(function() {
                        formStatus.innerHTML = '';
                    }, 5000);
                }, 1500);
            }
        });
        
        // Add input event listeners to clear errors on type
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('input-error');
                const errorId = this.id + 'Error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.textContent = '';
                }
            });
        });
    }
}

// Helper function to display errors
function displayError(field, errorId, message) {
    field.classList.add('input-error');
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// Helper function to clear form errors
function clearFormErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const inputFields = document.querySelectorAll('.input-error');
    
    errorMessages.forEach(error => {
        error.textContent = '';
    });
    
    inputFields.forEach(field => {
        field.classList.remove('input-error');
    });
}

/**
 * FAQ Accordion
 */
function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            
            header.addEventListener('click', function() {
                // Toggle active class on current item
                item.classList.toggle('active');
                
                // Close other items
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        });
    }
}

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation menu
    initMobileNav();
    
    // Initialize skill bar animations
    initSkillBars();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize contact form validation
    initContactForm();
    
    // Initialize FAQ accordion
    initAccordion();
    
    // Initialize fade-in animations
    initFadeInAnimations();
});
function initMobileNav() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Change menu icon
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // Close menu when clicking on a nav link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    
                    // Reset menu icon
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        });
    }
}

/**
 * Skill Bar Animations
 */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Function to animate skill bars when they come into view
    function animateSkillBars() {
        skillBars.forEach(bar => {
            if (isInViewport(bar) && !bar.classList.contains('animated')) {
                // Get width value from style attribute
                const width = bar.style.width;
                
                // Temporarily set width to 0
                bar.style.width = '0';
                bar.classList.add('animated');
                
                // Animate width to original value
                setTimeout(() => {
                    bar.style.transition = 'width 1s ease-in-out';
                    bar.style.width = width;
                }, 200);
            }
        });
    }
    
    // Check on load
    animateSkillBars();
    
    // Check on scroll
    window.addEventListener('scroll', animateSkillBars);
}

/**
 * Testimonial Slider
 */
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    
    if (slides.length > 0 && dots.length > 0 && prevBtn && nextBtn) {
        let currentIndex = 0;
        
        // Function to show slide at index
        function showSlide(index) {
            // Handle boundaries
            if (index < 0) {
                index = slides.length - 1;
            } else if (index >= slides.length) {
                index = 0;
            }
            
            // Update current index
            currentIndex = index;
            
            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Show current slide
            slides[currentIndex].classList.add('active');
            
            // Update dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            dots[currentIndex].classList.add('active');
        }
        
        // Next slide button
        nextBtn.addEventListener('click', function() {
            showSlide(currentIndex + 1);
        });
        
        // Previous slide button
        prevBtn.addEventListener('click', function() {
            showSlide(currentIndex - 1);
        });
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
            });
        });
        
        // Auto advance slides every 5 seconds
        let slideInterval = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 5000);
        
        // Pause auto-advance on hover
        const testimonialSlider = document.getElementById('testimonialSlider');
        if (testimonialSlider) {
            testimonialSlider.addEventListener('mouseenter', function() {
                clearInterval(slideInterval);
            });
            
            testimonialSlider.addEventListener('mouseleave', function() {
                slideInterval = setInterval(() => {
                    showSlide(currentIndex + 1);
                }, 5000);
            });
        }
    }
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate header height for offset
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                
                // Scroll to element with offset
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Project Hover Effects
 */
document.querySelectorAll('.project-card').forEach(project => {
    project.addEventListener('mouseenter', function() {
        this.querySelector('.project-image img').style.transform = 'scale(1.05)';
    });
    
    project.addEventListener('mouseleave', function() {
        this.querySelector('.project-image img').style.transform = 'scale(1)';
    });
});

/**
 * Intersection Observer for fade-in animations
 */
function initFadeInAnimations() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const sections = document.querySelectorAll('section');
        
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    fadeInObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1
        });
        
        sections.forEach(section => {
            section.classList.add('fade-out');
            fadeInObserver.observe(section);
        });
    }
}

// Initialize fade-in animations
initFadeInAnimations();

/**
 * Form validation for contact form (if present)
 */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        let valid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        // Reset previous error states
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(error => error.remove());
        
        // Validate name
        if (name && name.value.trim() === '') {
            valid = false;
            displayErrorMessage(name, 'Please enter your name');
        }
        
        // Validate email
        if (email && !isValidEmail(email.value)) {
            valid = false;
            displayErrorMessage(email, 'Please enter a valid email address');
        }
        
        // Validate message
        if (message && message.value.trim() === '') {
            valid = false;
            displayErrorMessage(message, 'Please enter your message');
        }
        
        // Submit form if valid
        if (valid) {
            // Here you would normally send the form data to a server
            // For demonstration, we'll just show a success message
            
            // Hide form
            contactForm.style.display = 'none';
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            contactForm.parentNode.appendChild(successMessage);
        }
    });
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to display error messages
function displayErrorMessage(element, message) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    element.parentNode.appendChild(errorMessage);
    element.classList.add('input-error');
}

/**
 * Typing animation for hero section
 */
function initTypingAnimation() {
    const heroText = document.querySelector('.name-highlight');
    
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        
        // Simple typing animation
        let i = 0;
        const typeSpeed = 150; // milliseconds
        
        function typeWriter() {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, typeSpeed);
            }
        }
        
        // Start typing animation after a delay
        setTimeout(typeWriter, 500);
    }
}

// Initialize typing animation
// Uncomment the line below to enable the typing animation effect
initTypingAnimation();