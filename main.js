// =========================
// MODAL (INDEX HTML)
// =========================

const modal = document.querySelector('.modal-container');
if (modal) {
  const openBtns = document.querySelectorAll('.details'); 
  const closeBtn = document.querySelector('.close-modal');

  openBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      modal.style.display = 'flex';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();   
      modal.style.display = 'none';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// ========================= // ORDER STATUS (ORDER-STATUS HTML) // =========================

function showOrder(status){
  const sections = ['pending', 'active', 'delivered', 'cancelled'];

  sections.forEach(s => {
    const sectionsEl = document.getElementById(`${s}-section`);
    if (sectionsEl) {
      sectionsEl.style.display = s === status ? 'grid' : 'none';
    }
  });

  const headingEl = document.getElementById('orders-heading');
  const descEl = document.getElementById('orders-desc');
  if (headingEl) headingEl.innerText = `${status.charAt(0).toUpperCase() + status.slice(1)} Orders`;
  if (descEl) descEl.innerText = `Manage ${status} orders`;

  const orderCount = document.querySelectorAll(`#${status}-section .order-card`).length;
  const countEl = document.getElementById('orders-count');
  if (countEl) countEl.innerText = `${orderCount} ${status} orders`;

  sections.forEach(s => {
    const tab = document.getElementById(`tab${s}`);
    if (tab) {
      tab.classList.toggle(`active`, s === status);
    }
  });
}

// =========================
// CAROUSEL (CUSTOMER-CATEGORIES HTML)
// =========================
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const cards = document.querySelectorAll('.carousel-track .category-card');

  if (cards.length === 0) return;

  let currentIndex = 0;

  function getCardWidth() {
    const card = cards[0];
    const style = getComputedStyle(track);
    const gap = parseFloat(style.gap || style.columnGap) || 0;
    return card.offsetWidth + gap;
  }

  function updateCarousel() {
    const cardWidth = getCardWidth();
    const visibleCards = Math.floor(track.parentElement.offsetWidth / cardWidth);
    const maxIndex = cards.length - visibleCards;

    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === cards.length - 1;
  }

nextBtn.addEventListener('click', () => {
  const cardWidth = getCardWidth();
  const visibleCards = Math.floor(track.parentElement.offsetWidth /cardWidth);
  const maxIndex = cards.length - visibleCards;

  if (currentIndex < maxIndex) {
    currentIndex++;
    updateCarousel();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

updateCarousel();
});
