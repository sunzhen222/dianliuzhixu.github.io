const revealNodes = document.querySelectorAll('.reveal');
const backToTop = document.getElementById('backToTop');
const yearEl = document.getElementById('year');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const galleryImages = document.querySelectorAll('.gallery-item img');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

window.addEventListener('load', () => {
  document.body.classList.remove('is-loading');
  document.body.classList.add('is-ready');
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.15,
  }
);

revealNodes.forEach((node) => observer.observe(node));

window.addEventListener('scroll', () => {
  if (window.scrollY > 320) {
    backToTop.classList.add('is-visible');
  } else {
    backToTop.classList.remove('is-visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const closeLightbox = () => {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
};

galleryImages.forEach((img) => {
  img.addEventListener('click', () => {
    const source = img.getAttribute('data-full') || img.src;
    lightboxImg.src = source;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
    closeLightbox();
  }
});
