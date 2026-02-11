/**
 * Intel Sustainability Website - Main Script
 * Features: Language detection, RTL support, form validation, accessibility
 */

// ====================
// Language Detection & RTL Support
// ====================

/**
 * Available languages and their configurations
 */
const languages = {
  en: {
    name: 'English',
    dir: 'ltr'
  },
  ar: {
    name: 'العربية',
    dir: 'rtl'
  }
};

/**
 * Translation strings for bilingual support
 */
const translations = {
  en: {
    'brand-name': 'Intel',
    'timeline-title': "Intel's Sustainability Journey",
    'pillars-title': 'Our Sustainability Pillars',
    'subscribe-title': 'Subscribe to our Newsletter',
    'subscribe-desc': "Stay updated on Intel's latest sustainability initiatives and environmental commitments.",
    'email-label': 'Email Address',
    'email-help': "We'll never share your email with anyone else.",
    'email-error': 'Please provide a valid email address.',
    'name-label': 'Full Name',
    'name-placeholder': 'Your name',
    'name-error': 'Please provide your name.',
    'agree-label': "I agree to receive email updates about Intel's sustainability initiatives",
    'agree-error': 'You must agree to continue.',
    'submit-btn': 'Subscribe Now',
    'success-message': 'Thank you for subscribing! Check your email for confirmation.'
  },
  ar: {
    'brand-name': 'إنتل',
    'timeline-title': 'رحلة Intel نحو الاستدامة',
    'pillars-title': 'ركائز الاستدامة لدينا',
    'subscribe-title': 'اشترك في نشرتنا الإخبارية',
    'subscribe-desc': 'ابق على اطلاع بأحدث مبادرات الاستدامة والالتزامات البيئية في Intel.',
    'email-label': 'عنوان البريد الإلكتروني',
    'email-help': 'لن نشارك بريدك الإلكتروني مع أي شخص آخر.',
    'email-error': 'يرجى إدخال عنوان بريد إلكتروني صحيح.',
    'name-label': 'الاسم الكامل',
    'name-placeholder': 'اسمك',
    'name-error': 'يرجى توفير اسمك.',
    'agree-label': 'أوافق على تلقي تحديثات بريد إلكتروني حول مبادرات الاستدامة في Intel',
    'agree-error': 'يجب عليك الموافقة للمتابعة.',
    'submit-btn': 'اشترك الآن',
    'success-message': 'شكراً لاشتراكك! تحقق من بريدك الإلكتروني للتأكيد.'
  }
};

/**
 * Initialize language and RTL settings on page load
 */
document.addEventListener('DOMContentLoaded', function() {
  const savedLanguage = localStorage.getItem('language') || detectBrowserLanguage();
  setLanguage(savedLanguage);
  setupLanguageSelector();
  setupFormValidation();
  setupAccessibility();
});

/**
 * Detect browser language preference
 */
function detectBrowserLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  
  // Check if browser language is Arabic
  if (browserLang.startsWith('ar')) {
    return 'ar';
  }
  
  // Default to English
  return 'en';
}

/**
 * Set language and apply RTL if needed
 */
function setLanguage(lang) {
  if (!languages[lang]) {
    lang = 'en';
  }

  // Update HTML attributes
  document.documentElement.lang = lang;
  document.documentElement.dir = languages[lang].dir;

  // Update page title and descriptions
  updatePageTranslations(lang);

  // Store language preference
  localStorage.setItem('language', lang);

  // Update language selector
  const langSelect = document.getElementById('languageSelect');
  if (langSelect) {
    langSelect.value = lang;
  }

  // Dispatch event for other scripts
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
}

/**
 * Update all translatable content on the page
 */
function updatePageTranslations(lang) {
  // Update brand name
  const brandText = document.getElementById('brandText');
  if (brandText) {
    brandText.textContent = translations[lang]['brand-name'];
  }

  // Update dynamic content
  const timelineTitle = document.querySelector('[data-i18n="timeline-title"]');
  if (timelineTitle) {
    timelineTitle.textContent = translations[lang]['timeline-title'];
  }

  const pillarsTitle = document.querySelector('[data-i18n="pillars-title"]');
  if (pillarsTitle) {
    pillarsTitle.textContent = translations[lang]['pillars-title'];
  }

  const subscribeTitle = document.querySelector('[data-i18n="subscribe-title"]');
  if (subscribeTitle) {
    subscribeTitle.textContent = translations[lang]['subscribe-title'];
  }

  const subscribeDesc = document.querySelector('[data-i18n="subscribe-desc"]');
  if (subscribeDesc) {
    subscribeDesc.textContent = translations[lang]['subscribe-desc'];
  }

  // Update form labels and placeholders
  const emailLabel = document.querySelector('label[for="emailInput"]');
  if (emailLabel) {
    emailLabel.textContent = translations[lang]['email-label'];
  }

  const emailInput = document.getElementById('emailInput');
  if (emailInput) {
    emailInput.placeholder = translations[lang]['email-label'];
  }

  const nameLabel = document.querySelector('label[for="nameInput"]');
  if (nameLabel) {
    nameLabel.textContent = translations[lang]['name-label'];
  }

  const nameInput = document.getElementById('nameInput');
  if (nameInput) {
    nameInput.placeholder = translations[lang]['name-placeholder'];
  }

  const agreeLabel = document.querySelector('label[for="agreeCheck"]');
  if (agreeLabel) {
    agreeLabel.textContent = translations[lang]['agree-label'];
  }

  const submitBtn = document.querySelector('#subscriptionForm button[type="submit"]');
  if (submitBtn) {
    submitBtn.innerHTML = '<i class="bi bi-bell"></i> ' + translations[lang]['submit-btn'];
  }
}

/**
 * Setup language selector
 */
function setupLanguageSelector() {
  const languageSelect = document.getElementById('languageSelect');
  
  if (languageSelect) {
    languageSelect.addEventListener('change', function(e) {
      setLanguage(e.target.value);
    });
  }
}

// ====================
// Form Validation & Submission
// ====================

/**
 * Setup form validation using Bootstrap validation classes
 */
function setupFormValidation() {
  const form = document.getElementById('subscriptionForm');
  
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate form
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    // Form is valid - process submission
    processFormSubmission(form);
  });

  // Remove validation styling when user starts typing
  const inputs = form.querySelectorAll('.form-control, .form-select, .form-check-input');
  inputs.forEach(input => {
    input.addEventListener('change', function() {
      form.classList.remove('was-validated');
    });
  });
}

/**
 * Process form submission
 */
function processFormSubmission(form) {
  const email = document.getElementById('emailInput').value;
  const name = document.getElementById('nameInput').value;

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    form.classList.add('was-validated');
    return;
  }

  // Here would be where you'd send data to server
  console.log('Form submitted:', { email, name });

  // Show success message
  showSuccessMessage();

  // Reset form
  form.reset();
  form.classList.remove('was-validated');

  // Reset after 3 seconds
  setTimeout(() => {
    hideSuccessMessage();
  }, 3000);
}

/**
 * Show success message
 */
function showSuccessMessage() {
  const successMsg = document.getElementById('successMessage');
  if (successMsg) {
    const lang = document.documentElement.lang || 'en';
    successMsg.textContent = translations[lang]['success-message'];
    successMsg.style.display = 'block';
    successMsg.setAttribute('role', 'status');
    successMsg.setAttribute('aria-live', 'polite');
  }
}

/**
 * Hide success message
 */
function hideSuccessMessage() {
  const successMsg = document.getElementById('successMessage');
  if (successMsg) {
    successMsg.style.display = 'none';
  }
}

// ====================
// Accessibility Features
// ====================

/**
 * Setup accessibility features
 */
function setupAccessibility() {
  // Add skip to main content link
  addSkipLink();

  // Ensure proper heading hierarchy
  validateHeadingHierarchy();

  // Add ARIA labels to interactive elements
  addARIALabels();

  // Setup keyboard navigation
  setupKeyboardNavigation();
}

/**
 * Add skip to main content link
 */
function addSkipLink() {
  if (document.querySelector('.skip-link')) return;

  const skipLink = document.createElement('a');
  skipLink.className = 'skip-link';
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';

  document.body.insertBefore(skipLink, document.body.firstChild);
}

/**
 * Validate heading hierarchy
 */
function validateHeadingHierarchy() {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let lastLevel = 0;

  headings.forEach((heading, index) => {
    const currentLevel = parseInt(heading.tagName.substring(1));
    
    // Check for skipped heading levels
    if (currentLevel - lastLevel > 1 && index > 0) {
      console.warn(`Heading hierarchy issue: jumped from h${lastLevel} to h${currentLevel}`);
    }
    
    lastLevel = currentLevel;
  });
}

/**
 * Add ARIA labels to interactive elements
 */
function addARIALabels() {
  // Add aria-labels to buttons without text
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    if (!button.textContent.trim() && !button.getAttribute('aria-label')) {
      const icon = button.querySelector('i');
      if (icon) {
        button.setAttribute('aria-label', icon.className);
      }
    }
  });

  // Add aria-labels to links without text
  const links = document.querySelectorAll('a[href="#"]');
  links.forEach((link, index) => {
    if (!link.textContent.trim() && !link.getAttribute('aria-label')) {
      link.setAttribute('aria-label', `Link ${index + 1}`);
    }
  });
}

/**
 * Setup keyboard navigation
 */
function setupKeyboardNavigation() {
  // Allow closing modals with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      // Handle any open modals
      const openModals = document.querySelectorAll('.modal.show');
      openModals.forEach(modal => {
        const bsModal = bootstrap.Modal.getInstance(modal);
        if (bsModal) {
          bsModal.hide();
        }
      });
    }
  });

  // Make interactive elements keyboard accessible
  setupCarouselKeyboardNavigation();
}

/**
 * Setup keyboard navigation for carousel
 */
function setupCarouselKeyboardNavigation() {
  const carousels = document.querySelectorAll('.carousel');
  
  carousels.forEach(carousel => {
    const prevBtn = carousel.querySelector('.carousel-control-prev');
    const nextBtn = carousel.querySelector('.carousel-control-next');

    if (prevBtn && nextBtn) {
      carousel.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
          prevBtn.click();
        } else if (e.key === 'ArrowRight') {
          nextBtn.click();
        }
      });
    }
  });
}

// ====================
// Utility Functions
// ====================

/**
 * Log current page state for debugging
 */
function logPageState() {
  console.log('Page Language:', document.documentElement.lang);
  console.log('Page Direction:', document.documentElement.dir);
  console.log('Current Theme:', localStorage.getItem('theme'));
  console.log('Form Status:', document.getElementById('subscriptionForm') ? 'Ready' : 'Not found');
}

/**
 * Handle window resize events for responsive behavior
 */
window.addEventListener('resize', debounce(function() {
  // Could add responsive adjustments here
  console.log('Window resized');
}, 250));

/**
 * Debounce function for performance
 */
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// ====================
// Performance Optimization
// ====================

/**
 * Lazy load images
 */
document.addEventListener('DOMContentLoaded', function() {
  if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
});

// ====================
// Analytics & Tracking
// ====================

/**
 * Track user interactions (placeholder for analytics)
 */
function trackEvent(eventName, eventData) {
  console.log(`Event: ${eventName}`, eventData);
  
  // This is where you'd send data to analytics service
  // Example: if (window.gtag) { gtag('event', eventName, eventData); }
}

// Track form submissions
document.addEventListener('submit', function(e) {
  if (e.target.id === 'subscriptionForm') {
    trackEvent('subscription_form_submitted', {
      timestamp: new Date().toISOString()
    });
  }
});

// Track language changes
window.addEventListener('languageChanged', function(e) {
  trackEvent('language_changed', {
    newLanguage: e.detail.language,
    timestamp: new Date().toISOString()
  });
});

// Log page state on load
console.log('Intel Sustainability Website initialized');
logPageState();
