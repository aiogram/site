// Enable tooltips and popovers from Bootstrap
document.addEventListener('DOMContentLoaded', function() {
  // Initialize tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Initialize popovers
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  // Parallax effect implementation
  const parallaxHandler = function() {
    const heroSection = document.querySelector('.hero-section');
    const heroImage = document.querySelector('.hero-image');
    const heroShape = document.querySelector('.hero-background-shape');
    const contentSections = document.querySelectorAll('.content-section');
    const featureCards = document.querySelectorAll('.feature-card');
    const badgeItems = document.querySelectorAll('.badge-item');
    const heroButtons = document.querySelector('.hero-buttons');
    let lastScrollY = window.scrollY;
    let ticking = false;

    // Elements to animate with different speeds
    const parallaxElems = [
      { elem: heroSection, speed: 0.05, property: '--scroll-offset' },
      { elem: heroSection, speed: 0.08, property: '--scroll-offset-deep' },
      { elem: heroImage.parentNode, speed: -0.1, transform: true, base: 'translateZ(0px)' },
    ];

    // Sections with parallax backgrounds
    contentSections.forEach(section => {
      if (section.querySelector('.parallax-bg')) {
        parallaxElems.push({
          elem: section.querySelector('.parallax-bg'),
          speed: 0.1,
          transform: true
        });
      }

      // Add before pseudo-element if it has a gradient background
      if (section.classList.contains('bg-gradient')) {
        parallaxElems.push({
          elem: section,
          speed: 0.05,
          property: '--section-offset'
        });
      }
    });

    // Initialize all hero section elements
    if (heroSection) {
      // Make all hero section elements visible immediately
      const heroElements = heroSection.querySelectorAll('.animate-on-scroll');
      heroElements.forEach(function(element) {
        element.classList.add('visible');
      });

      // Add visible class to hero buttons too
      if (heroButtons) {
        heroButtons.classList.add('visible');
        heroButtons.querySelectorAll('.btn').forEach(btn => {
          btn.classList.add('visible');
        });
      }
    }

    // Apply parallax effect on scroll
    const applyParallax = () => {
      lastScrollY = window.scrollY;

      // Apply transforms to parallax elements
      parallaxElems.forEach(item => {
        if (!item.elem) return;

        const scrollOffset = lastScrollY * item.speed;

        if (item.property) {
          // Use CSS custom property
          item.elem.style.setProperty(item.property, `${scrollOffset}px`);
        } else if (item.transform) {
          // Use transform directly
          const baseTransform = item.base || '';
          if (baseTransform) {
            item.elem.style.transform = `${baseTransform} translateY(${scrollOffset}px)`;
          } else {
            item.elem.style.transform = `translateY(${scrollOffset}px)`;
          }
        }
      });

      // Handle feature cards with scroll-based hover effect
      featureCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const centerY = window.innerHeight / 2;
        const cardCenterY = rect.top + rect.height / 2;
        const distance = Math.abs(centerY - cardCenterY);
        const maxDistance = window.innerHeight / 2 + rect.height;
        const proximity = 1 - Math.min(distance / maxDistance, 1);

        if (proximity > 0.7) {
          const liftAmount = (proximity - 0.7) * 20; // Max 6px of lift
          card.style.transform = `translateY(-${liftAmount}px)`;
          card.style.boxShadow = `0 ${10 + liftAmount}px ${20 + liftAmount}px rgba(0, 0, 0, ${0.05 + proximity * 0.05})`;
        } else {
          card.style.transform = '';
          card.style.boxShadow = '';
        }
      });

      // Badge items subtle parallax
      badgeItems.forEach(badge => {
        const rect = badge.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const scrollProgress = 1 - (rect.top / window.innerHeight);
          const translateX = (scrollProgress - 0.5) * 10; // Move max 5px left or right
          badge.style.transform = `translateZ(0) translateX(${translateX}px)`;
        }
      });

      ticking = false;
    };

    // Request animation frame for better performance
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(applyParallax);
        ticking = true;
      }
    };

    // Listen for scroll events
    window.addEventListener('scroll', function() {
      requestTick();

      // Animate on scroll elements
      const animatedElements = document.querySelectorAll('.animate-on-scroll, .scroll-animate-left, .scroll-animate-right, .scroll-animate-fade, .scroll-animate-scale');
      animatedElements.forEach(function(element) {
        if (isElementInViewport(element)) {
          if (element.classList.contains('animate-on-scroll')) {
            element.classList.add('visible');
          } else {
            element.classList.add('scroll-animate-active');
          }
        }
      });

      // Ensure hero buttons always remain visible once shown
      if (heroButtons) {
        heroButtons.classList.add('visible');
        heroButtons.querySelectorAll('.btn').forEach(btn => {
          btn.classList.add('visible');
        });
      }

      // Change navbar background on scroll
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Initialize parallax on page load
    applyParallax();

    // Handle resize events to recalculate parallax values
    window.addEventListener('resize', applyParallax);



      // Logo tilt effect implementation
      const initLogoTiltEffect = function() {
          const logoContainer = document.querySelector('.hero-image-container');
          const logo = document.querySelector('.hero-image');

          if (!logoContainer || !logo) return;

          const maxTiltDegrees = 8; // Reduced maximum tilt angle from 15 to 8 degrees
          const tiltSensitivity = 80; // Increased sensitivity (lower number = more sensitive)

          // Track current tilt state for smoother transitions
          let currentTiltX = 0;
          let currentTiltY = 0;
          const smoothingFactor = 0.25; // Controls how quickly the tilt moves toward target position

          // Detect mouse movement near logo
          document.addEventListener('mousemove', function(e) {
              const containerRect = logoContainer.getBoundingClientRect();
              const containerCenterX = containerRect.left + containerRect.width / 2;
              const containerCenterY = containerRect.top + containerRect.height / 2;

              // Calculate distance from mouse to center of container
              const distanceX = e.clientX - containerCenterX;
              const distanceY = e.clientY - containerCenterY;
              const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

              // Define the area around the logo that triggers the effect
              const detectionRadius = containerRect.width * 1.5;

              // Calculate target tilt angles
              let targetTiltX = 0;
              let targetTiltY = 0;

              if (distance < detectionRadius) {
                  // Calculate tilt using a non-linear curve to enhance effect in central area
                  targetTiltX = -Math.sin(distanceY / tiltSensitivity) * maxTiltDegrees;
                  targetTiltY = Math.sin(distanceX / tiltSensitivity) * maxTiltDegrees;

                  // Smoothly interpolate current tilt toward target tilt
                  currentTiltX += (targetTiltX - currentTiltX) * smoothingFactor;
                  currentTiltY += (targetTiltY - currentTiltY) * smoothingFactor;
              } else {
                  // Return to neutral position when out of range, also with smooth interpolation
                  currentTiltX += (0 - currentTiltX) * smoothingFactor;
                  currentTiltY += (0 - currentTiltY) * smoothingFactor;
              }

              // Apply the tilt effect using CSS transform
              logo.style.transform = `rotateX(${currentTiltX}deg) rotateY(${currentTiltY}deg)`;
          });
      };

      initLogoTiltEffect();
  };

  // Initialize parallax effects
  parallaxHandler();

  // Copy button functionality for code blocks
  const copyButtons = document.querySelectorAll('.copy-button');
  copyButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const codeBlock = this.closest('.code-block').querySelector('code');
      const textToCopy = codeBlock.textContent;

      navigator.clipboard.writeText(textToCopy).then(function() {
        button.classList.add('copied');
        button.innerHTML = '<i class="bi bi-check"></i> Copied!';
        setTimeout(function() {
          button.classList.remove('copied');
          button.innerHTML = '<i class="bi bi-clipboard"></i> Copy';
        }, 2000);
      }, function() {
        button.innerHTML = '<i class="bi bi-exclamation-circle"></i> Error!';
        setTimeout(function() {
          button.innerHTML = '<i class="bi bi-clipboard"></i> Copy';
        }, 2000);
      });
    });
  });

  // Add language label and copy button to code blocks
  const codeBlocks = document.querySelectorAll('pre code');
  codeBlocks.forEach(function(codeBlock) {
    // Skip if already in a code-block container
    if (codeBlock.closest('.code-block')) return;

    const pre = codeBlock.parentNode;
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block shadow-sm';

    // Get language from class
    let language = '';
    codeBlock.classList.forEach(function(className) {
      if (className.startsWith('language-')) {
        language = className.replace('language-', '');
      }
    });

    // Create header
    const header = document.createElement('div');
    header.className = 'code-header';
    header.innerHTML = `<span>${language || 'code'}</span><button class="copy-button"><i class="bi bi-clipboard"></i> Copy</button>`;

    // Replace pre with wrapper
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(header);
    wrapper.appendChild(pre);

    // Add click event to copy button
    const copyButton = header.querySelector('.copy-button');
    copyButton.addEventListener('click', function() {
      const textToCopy = codeBlock.textContent;

      navigator.clipboard.writeText(textToCopy).then(function() {
        copyButton.classList.add('copied');
        copyButton.innerHTML = '<i class="bi bi-check"></i> Copied!';
        setTimeout(function() {
          copyButton.classList.remove('copied');
          copyButton.innerHTML = '<i class="bi bi-clipboard"></i> Copy';
        }, 2000);
      }, function() {
        copyButton.innerHTML = '<i class="bi bi-exclamation-circle"></i> Error!';
        setTimeout(function() {
          copyButton.innerHTML = '<i class="bi bi-clipboard"></i> Copy';
        }, 2000);
      });
    });
  });

  // Helper function to check if an element is in the viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
      rect.bottom >= 0
    );
  }
}); 