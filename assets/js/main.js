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

  // Copy button functionality
  document.querySelectorAll('.copy-button').forEach(function(button) {
    button.addEventListener('click', function() {
      var preElement = this.closest('.code-block').querySelector('pre');
      var code = preElement.textContent.trim();
      
      navigator.clipboard.writeText(code).then(function() {
        var originalText = button.innerHTML;
        button.innerHTML = '<i class="bi bi-check"></i> Copied!';
        button.classList.add('btn-success');
        button.classList.remove('btn-light');
        
        setTimeout(function() {
          button.innerHTML = originalText;
          button.classList.remove('btn-success');
          button.classList.add('btn-light');
        }, 2000);
      }, function(err) {
        console.error('Failed to copy: ', err);
        button.innerHTML = '<i class="bi bi-exclamation-triangle"></i> Error!';
        button.classList.add('btn-danger');
        button.classList.remove('btn-light');
        
        setTimeout(function() {
          button.innerHTML = '<i class="bi bi-clipboard"></i> Copy';
          button.classList.remove('btn-danger');
          button.classList.add('btn-light');
        }, 2000);
      });
    });
  });

  // Animation on scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 50) {
        element.classList.add('animate__animated', 'animate__fadeInUp');
      }
    });
    
    // Animate hero elements when page loads
    document.querySelectorAll('.hero-section h1, .hero-section .lead, .hero-section .btn').forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 200 * index);
    });
  };

  // Run animation on page load
  animateOnScroll();
  
  // Run animation on scroll
  window.addEventListener('scroll', animateOnScroll);

  // Hero image parallax effect
  const heroImage = document.querySelector('.hero-image');
  if (heroImage) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      if (scrollPosition < 600) {
        heroImage.style.transform = `translateY(${scrollPosition * 0.1}px) rotate(${scrollPosition * 0.02}deg)`;
      }
    });
  }

  // Add code language labels to code blocks
  document.querySelectorAll('pre code:not(.highlight)').forEach(function(codeBlock) {
    if (!codeBlock.closest('.code-block')) {
      const preElement = codeBlock.parentElement;
      const codeBlockWrapper = document.createElement('div');
      codeBlockWrapper.className = 'code-block';
      
      // Create header with language detection
      const headerDiv = document.createElement('div');
      headerDiv.className = 'code-header';
      
      // Try to detect language
      let language = 'code';
      if (codeBlock.className) {
        const classMatch = codeBlock.className.match(/language-(\w+)/);
        if (classMatch) {
          language = classMatch[1];
        }
      }
      
      headerDiv.innerHTML = `<span>${language}</span>`;
      
      // Create copy button
      const copyButton = document.createElement('button');
      copyButton.className = 'btn btn-sm btn-light copy-button';
      copyButton.innerHTML = '<i class="bi bi-clipboard"></i> Copy';
      
      preElement.parentNode.insertBefore(codeBlockWrapper, preElement);
      codeBlockWrapper.appendChild(headerDiv);
      codeBlockWrapper.appendChild(preElement);
      codeBlockWrapper.appendChild(copyButton);
      
      // Add copy functionality to the new button
      copyButton.addEventListener('click', function() {
        navigator.clipboard.writeText(codeBlock.textContent).then(function() {
          var originalText = copyButton.innerHTML;
          copyButton.innerHTML = '<i class="bi bi-check"></i> Copied!';
          copyButton.classList.add('btn-success');
          copyButton.classList.remove('btn-light');
          
          setTimeout(function() {
            copyButton.innerHTML = originalText;
            copyButton.classList.remove('btn-success');
            copyButton.classList.add('btn-light');
          }, 2000);
        }, function(err) {
          console.error('Failed to copy: ', err);
        });
      });
    }
  });

  // Navbar background change on scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
}); 