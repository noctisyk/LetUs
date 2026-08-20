document.addEventListener('DOMContentLoaded', function() {
  // 1. SCROLL ANİMASYONLARI
  const elements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  elements.forEach(function(el) { observer.observe(el); });

  // 2. MOBİL MENÜ MANTIĞI
  const menuButton = document.querySelector('.menu-button');
  const siteNav = document.getElementById('site-navigation');

  menuButton.addEventListener('click', function() {
    this.classList.toggle('is-open');
    siteNav.classList.toggle('is-open');
    this.setAttribute('aria-expanded', this.classList.contains('is-open'));
  });

  // 3. TEMA YÖNETİMİ
  const body = document.body;
  const themes = ['theme-default', 'theme-1', 'theme-2', 'theme-3'];
  let currentThemeIndex = parseInt(localStorage.getItem('letus-theme-index')) || 0;

  function applyTheme(index) {
    body.classList.remove('theme-1', 'theme-2', 'theme-3');
    if (index > 0) {
      body.classList.add(themes[index]);
    }
    localStorage.setItem('letus-theme-index', index);
  }

  applyTheme(currentThemeIndex);

  const brandLogo = document.querySelector('.brand-logo');
  if (brandLogo) {
    brandLogo.addEventListener('click', function(e) {
      e.preventDefault(); 
      currentThemeIndex = (currentThemeIndex + 1) % themes.length;
      applyTheme(currentThemeIndex);
    });
  }

  // 4. HİZMET KARTLARI 3D MANYETİK ETKİLEŞİM
  const serviceCards = document.querySelectorAll('.service-card');
  
  // Dokunmatik olmayan (fareli) cihazlarda 3D tilt efektini aktifleştir
  if (window.matchMedia("(pointer: fine)").matches) {
    serviceCards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'none';
        card.style.zIndex = '2';
      });
      
      card.addEventListener('mouseleave', function() {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'; 
        card.style.zIndex = '1';
      });
    });
  }
});