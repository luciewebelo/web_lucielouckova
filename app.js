/**
 * app.js - Základní JavaScript pro interaktivitu a přístupnost
 * lucielouckova.cz
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobilní menu (Hamburger navigation)
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const navMenu = document.querySelector('.nav-menu');
  const navBackdrop = document.querySelector('.nav-backdrop');

  function openMenu() {
    if (!hamburgerBtn || !navMenu) return;
    hamburgerBtn.classList.add('is-active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('is-open');
    if (navBackdrop) navBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!hamburgerBtn || !navMenu) return;
    hamburgerBtn.classList.remove('is-active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-open');
    if (navBackdrop) navBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('is-open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeMenu);
    }

    // Zavření menu klávesou Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeMenu();
        hamburgerBtn.focus();
      }
    });

    // Zavření menu po kliknutí na odkaz v menu
    navMenu.querySelectorAll('.nav-link, .nav-cta-btn').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1200) {
          closeMenu();
        }
      });
    });
  }

  // 2. Jemný scroll efekt pro sticky navbar
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('is-scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // 3. Načtení Google mapy až po kliknutí uživatele (žádné cookies bez souhlasu)
  const btnShowMap = document.getElementById('btn-show-map');
  const mapContainer = document.getElementById('map-container');
  if (btnShowMap && mapContainer) {
    btnShowMap.addEventListener('click', () => {
      mapContainer.innerHTML = '<iframe src="https://www.google.com/maps?q=Banskobystrick%C3%A1+2081%2F9,+160+00+Praha+6-Dejvice&amp;output=embed" class="map-iframe-container" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Google mapa - Banskobystrická 2081/9, Praha 6"></iframe>';
    });
  }

  // 4. Kontaktní formulář: odeslání na pozadí a vlastní potvrzení místo stránky Formspree
  const contactForm = document.querySelector('.contact-form');
  const formSuccess = document.querySelector('.form-success');
  if (contactForm && formSuccess) {
    const formError = contactForm.querySelector('.form-error');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      submitBtn.disabled = true;
      formError.hidden = true;

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { Accept: 'application/json' }
        });
        if (!response.ok) throw new Error('Formspree ' + response.status);

        contactForm.reset();
        contactForm.hidden = true;
        formSuccess.hidden = false;
        formSuccess.focus();
      } catch (error) {
        formError.textContent = 'Zprávu se nepodařilo odeslat. Zkuste to prosím znovu, nebo mi napište e-mail.';
        formError.hidden = false;
      } finally {
        submitBtn.disabled = false;
      }
    });
  }
});
