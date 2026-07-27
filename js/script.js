document.addEventListener('DOMContentLoaded', () => {
  
    //  TYPED.JS Hero typing animation
 const typed = new Typed('.multiple-text',  {
    strings: ['Frontend Developer', 'Student', 'Web Developer', 'Gamer', 'Cybersecurity Enthusiast'],
    typeSpeed: 80,
    backSpeed: 80,
    backDelay: 1200,
    loop: true,
 });

  
    //  SCROLL PROGRESS BAR
  const scrollProgress = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgress) {
      scrollProgress.style.width = scrollPercent + '%';
    }
  }

  //  NAVBAR SCROLL EFFECT
  const navbar = document.getElementById('nav-bar');

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  //  BACK TO TOP BUTTON
  const backToTop = document.getElementById('backToTop');
  const heroSection = document.getElementById('home');

  function updateBackToTop() {
    if (!heroSection || !backToTop) return;
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    if (window.scrollY > heroBottom) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  //  ACTIVE NAV SECTION HIGHLIGHTING
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  //  MOBILE HAMBURGER MENU
  const hamburger = document.getElementById('hamburger');
  const navContainer = document.getElementById('navContainer');

  if (hamburger && navContainer) {
    hamburger.addEventListener('click', () => {
      const isOpen = navContainer.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking a nav link
    navContainer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navContainer.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navContainer.contains(e.target) && !hamburger.contains(e.target)) {
        navContainer.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  //  INTERSECTION OBSERVER — Fade-in on scroll
  const fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => fadeObserver.observe(el));
  } else {
    // Fallback: show everything
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  //  CONTACT FORM HANDLER
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Show success message
      if (formSuccess) {
        formSuccess.classList.add('show');
      }

      // Reset form
      contactForm.reset();

      // Hide success message after 4 seconds
      setTimeout(() => {
        if (formSuccess) {
          formSuccess.classList.remove('show');
        }
      }, 4000);
    });
  }

  //  SMOOTH SCROLL FOR ALL ANCHOR LINKS
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  //  COMBINED SCROLL HANDLER
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateScrollProgress();
        updateNavbar();
        updateBackToTop();
        updateActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Run once on load
  updateScrollProgress();
  updateNavbar();
  updateBackToTop();
  updateActiveNav();

});
