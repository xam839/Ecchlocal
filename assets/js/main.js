/* ===============================================
   Modern Healthcare Website - Enhanced JavaScript
   Apple-Inspired Interactions & Animations
   =============================================== */

(function () {
  'use strict';

  // ===== Navbar Sticky & Toggle =====
  const header = document.querySelector('.navbar-area');
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 50) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }

    // Update scroll progress
    updateScrollProgress();
  });

  // Navbar toggler animation
  if (navbarToggler) {
    navbarToggler.addEventListener('click', function () {
      this.classList.toggle('active');
    });
  }

  // Close navbar on link click (mobile)
  const navLinks = document.querySelectorAll('.page-scroll');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992) {
        navbarToggler.classList.remove('active');
        navbarCollapse.classList.remove('show');
      }
    });
  });

  // ===== Smooth Scroll Navigation =====
  const pageLinks = document.querySelectorAll('.page-scroll');

  pageLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== Active Navigation on Scroll =====
  function onScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        document.querySelectorAll('.page-scroll').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll);

  // ===== Scroll Reveal Animation =====
  function reveal() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    
    reveals.forEach(element => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', reveal);
  reveal(); // Initial check

  // ===== Counter Animation =====
  function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value.toLocaleString('ar-SA');
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const options = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          const target = parseInt(entry.target.getAttribute('data-target'));
          animateCounter(entry.target, 0, target, 2000);
          entry.target.classList.add('counted');
        }
      });
    }, options);

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  // Initialize counters when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounters);
  } else {
    initCounters();
  }

  // ===== Scroll to Top Button =====
  const scrollTop = document.querySelector('.scroll-top');
  
  if (scrollTop) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 300) {
        scrollTop.classList.add('active');
      } else {
        scrollTop.classList.remove('active');
      }
    });

    scrollTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ===== Progress Bar =====
  function updateScrollProgress() {
    const progressWrap = document.querySelector('.progress-wrap');
    const progressPath = document.querySelector('.progress-wrap path');
    
    if (progressWrap && progressPath) {
      const pathLength = progressPath.getTotalLength();
      progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
      progressPath.style.strokeDashoffset = pathLength;

      const scroll = window.pageYOffset;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = pathLength - (scroll * pathLength / height);
      
      progressPath.style.strokeDashoffset = progress;

      if (scroll > 300) {
        progressWrap.classList.add('active');
      } else {
        progressWrap.classList.remove('active');
      }
    }
  }

  const progressWrap = document.querySelector('.progress-wrap');
  if (progressWrap) {
    progressWrap.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ===== Contact Form Handling =====
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      const formMessage = document.querySelector('.form-message');
      const submitBtn = this.querySelector('button[type="submit"]');
      const btnText = submitBtn.querySelector('span');
      const originalText = btnText.textContent;
      
      // Disable button and show loading
      submitBtn.disabled = true;
      btnText.textContent = 'جاري الإرسال...';
      
      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Show success message
        formMessage.className = 'form-message success';
        formMessage.textContent = 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.';
        
        // Re-enable button
        submitBtn.disabled = false;
        btnText.textContent = originalText;
        
        // Hide message after 5 seconds
        setTimeout(() => {
          formMessage.style.display = 'none';
        }, 5000);
      }, 1500);
    });

    // Form validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', function () {
        if (this.value.trim() === '' && this.hasAttribute('required')) {
          this.style.borderColor = '#EF4444';
        } else {
          this.style.borderColor = '';
        }
      });

      input.addEventListener('input', function () {
        if (this.style.borderColor === 'rgb(239, 68, 68)') {
          this.style.borderColor = '';
        }
      });
    });
  }

  // ===== Newsletter Form =====
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      const btn = this.querySelector('button');
      
      // Disable button
      btn.disabled = true;
      btn.style.opacity = '0.6';
      
      // Simulate subscription (replace with actual API call)
      setTimeout(() => {
        alert('شكراً لاشتراكك! سنرسل لك آخر الأخبار قريباً.');
        this.reset();
        btn.disabled = false;
        btn.style.opacity = '1';
      }, 1000);
    });
  });

  // ===== Service Cards Hover Effect =====
  const serviceCards = document.querySelectorAll('.single-news');
  
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });

  // ===== Tabs Enhancement =====
  const tabButtons = document.querySelectorAll('[data-bs-toggle="tab"]');
  
  tabButtons.forEach(button => {
    button.addEventListener('shown.bs.tab', function () {
      // Add animation to tab content
      const target = document.querySelector(this.getAttribute('data-bs-target'));
      if (target) {
        target.style.animation = 'fadeIn 0.5s ease-in-out';
      }
    });
  });

  // ===== Parallax Effect for Hero =====
  window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const heroParticles = document.querySelector('.hero-particles');
    
    if (heroParticles && scrolled < window.innerHeight) {
      heroParticles.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  // ===== Image Lazy Loading Enhancement =====
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
  }

  // ===== Floating Badges Animation =====
  const floatingBadges = document.querySelectorAll('.floating-badge');
  
  floatingBadges.forEach((badge, index) => {
    badge.style.animationDelay = `${index * 0.5}s`;
  });

  // ===== Prevent Default for Empty Links =====
  const emptyLinks = document.querySelectorAll('a[href="#"]');
  
  emptyLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
    });
  });

  // ===== Mobile Menu Close on Outside Click =====
  document.addEventListener('click', function (event) {
    const isClickInside = navbarCollapse?.contains(event.target) || navbarToggler?.contains(event.target);
    
    if (!isClickInside && navbarCollapse?.classList.contains('show')) {
      navbarToggler?.classList.remove('active');
      navbarCollapse?.classList.remove('show');
    }
  });

  // ===== Keyboard Navigation Enhancement =====
  document.addEventListener('keydown', function (e) {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && navbarCollapse?.classList.contains('show')) {
      navbarToggler?.classList.remove('active');
      navbarCollapse?.classList.remove('show');
    }
    
    // Scroll to top on Home key
    if (e.key === 'Home' && e.ctrlKey) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Scroll to bottom on End key
    if (e.key === 'End' && e.ctrlKey) {
      e.preventDefault();
      window.scrollTo({ 
        top: document.documentElement.scrollHeight, 
        behavior: 'smooth' 
      });
    }
  });

  // ===== Add Animation Classes Dynamically =====
  function addAnimationClasses() {
    const elements = {
      'h1, h2, h3': 'fade-in-up',
      '.hero-features': 'fade-in-up delay-3',
      '.feature-item': 'fade-in-up',
      '.stat-item': 'scroll-reveal'
    };

    Object.entries(elements).forEach(([selector, className]) => {
      const items = document.querySelectorAll(selector);
      items.forEach((item, index) => {
        if (!item.classList.contains('fade-in-up') && !item.classList.contains('scroll-reveal')) {
          item.classList.add(...className.split(' '));
          if (className.includes('scroll-reveal')) {
            item.style.transitionDelay = `${index * 0.1}s`;
          }
        }
      });
    });
  }

  // ===== Initialize Everything =====
  function init() {
    // Trigger initial animations
    reveal();
    updateScrollProgress();
    
    // Log initialization
    console.log('🏥 Healthcare Website Initialized');
    console.log('✨ All animations and interactions loaded');
  }

  // Run initialization when DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ===== Performance Optimization =====
  // Debounce scroll events
  let scrollTimeout;
  const originalScrollHandler = window.onscroll;
  
  window.onscroll = function () {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(function () {
      if (typeof originalScrollHandler === 'function') {
        originalScrollHandler();
      }
    });
  };

  // ===== Accessibility Enhancements =====
  // Add aria-labels dynamically
  const buttons = document.querySelectorAll('button:not([aria-label])');
  buttons.forEach(button => {
    if (button.textContent.trim()) {
      button.setAttribute('aria-label', button.textContent.trim());
    }
  });

  // Add alt text warning for images without alt
  const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
  if (imagesWithoutAlt.length > 0) {
    console.warn(`⚠️ ${imagesWithoutAlt.length} images missing alt text`);
  }

  // ===== Care Model Tabs Functionality =====
  function initCareModelTabs() {
    const tabButtons = document.querySelectorAll('.care-tab-btn');
    const tabPanels = document.querySelectorAll('.care-tab-panel');
    
    if (tabButtons.length === 0) return;

    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab');
        
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Hide all tab panels
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        // Show target tab panel
        const targetPanel = document.getElementById(targetTab);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }

  // Initialize care model tabs
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCareModelTabs);
  } else {
    initCareModelTabs();
  }

  // ===== Strategy Cards Interactive Behavior =====
  function initStrategyCards() {
    const strategyCards = document.querySelectorAll('.strategy-card-new');
    
    if (strategyCards.length === 0) return;

    // Apply click behavior on mobile/tablet
    if (window.innerWidth < 992) {
      strategyCards.forEach(card => {
        card.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          
          // Check if this card is already active
          const isActive = this.classList.contains('active');
          
          // Remove active class from all cards
          strategyCards.forEach(c => c.classList.remove('active'));
          
          // Toggle active class on clicked card
          if (!isActive) {
            this.classList.add('active');
          }
        });
      });

      // Close card when clicking outside
      document.addEventListener('click', function (e) {
        if (!e.target.closest('.strategy-card-new')) {
          strategyCards.forEach(c => c.classList.remove('active'));
        }
      });
    }

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Remove all active classes when switching to desktop
        if (window.innerWidth >= 992) {
          strategyCards.forEach(c => c.classList.remove('active'));
        }
        // Re-initialize on resize
        initStrategyCards();
      }, 250);
    });
  }

  // Initialize strategy cards
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStrategyCards);
  } else {
    initStrategyCards();
  }

  // ===== Health Centers Show More Functionality =====
  function initHealthCentersShowMore() {
    const showMoreBtn = document.getElementById('showMoreBtn');
    const hiddenCenters = document.querySelectorAll('.hidden-center');
    
    if (!showMoreBtn || hiddenCenters.length === 0) return;
    
    let isExpanded = false;
    
    showMoreBtn.addEventListener('click', function() {
      isExpanded = !isExpanded;
      
      if (isExpanded) {
        // Show all hidden centers with animation
        hiddenCenters.forEach((center, index) => {
          setTimeout(() => {
            center.classList.add('show');
          }, index * 50); // Stagger the animation
        });
        
        // Update button text and style
        this.classList.add('hide-mode');
        this.querySelector('.btn-text').textContent = 'إخفاء المراكز';
        this.querySelector('.centers-count').textContent = '(إخفاء 24 مركز)';
        
        // Smooth scroll to show the new content
        setTimeout(() => {
          const firstHiddenCenter = document.querySelector('.hidden-center.show');
          if (firstHiddenCenter) {
            firstHiddenCenter.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'nearest' 
            });
          }
        }, 300);
      } else {
        // Hide all centers
        hiddenCenters.forEach(center => {
          center.classList.remove('show');
        });
        
        // Update button text and style
        this.classList.remove('hide-mode');
        this.querySelector('.btn-text').textContent = 'عرض المزيد من المراكز';
        this.querySelector('.centers-count').textContent = '(24 مركز آخر)';
        
        // Scroll back to the button
        this.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    });
  }

  // Initialize health centers show more
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHealthCentersShowMore);
  } else {
    initHealthCentersShowMore();
  }

  // ===== Console Styling (Development) =====
  const styles = [
    'color: #0EA5E9',
    'font-size: 14px',
    'font-weight: bold',
    'padding: 10px'
  ].join(';');

  console.log('%c🚀 Developed with ❤️ for تجمع حفر الباطن الصحي', styles);

})();
