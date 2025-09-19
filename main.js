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
// =========================

// ========================= STORE MENU MODAL (STORE-MENU HTML) =========================

document.addEventListener("DOMContentLoaded", () => {
  const orderButtons = document.querySelectorAll(".order-button");
  const modal = document.getElementById("store-modal");
  const closeBtn = document.querySelector(".store-close-btn");

  // Store data with additional menu items
  const stores = {
    pancit: {
      name: "Pancit Cantonan Ni Juans",
      desc: "₱₱₱ • Pancit • 30-40 min",
      banner: "images/pancit.jpg",
      menu: [
        { name: "Special Pancit", price: "₱120", rating: "⭐ 4.5", desc: "Loaded with toppings, stir-fried to perfection." },
        { name: "Pancit Canton", price: "₱100", rating: "⭐ 4.3", desc: "Classic Filipino-style pancit canton noodles." },
        { name: "Bihon Guisado", price: "₱110", rating: "⭐ 4.4", desc: "Rice noodles with veggies and pork strips." },
        { name: "Lomi", price: "₱130", rating: "⭐ 4.6", desc: "Hot and savory noodle soup topped with egg." }
      ]
    },
    pares: {
      name: "Pares Ni Juan",
      desc: "₱₱₱ • Pares • 30-40 min",
      banner: "images/pares.jpg",
      menu: [
        { name: "Classic Pares", price: "₱90", rating: "⭐ 4.7", desc: "Traditional beef pares with garlic rice." },
        { name: "Spicy Pares", price: "₱95", rating: "⭐ 4.6", desc: "Classic pares with a fiery kick." },
        { name: "Pares Mami", price: "₱100", rating: "⭐ 4.5", desc: "Soup-based pares with noodles." },
        { name: "Pares Silog", price: "₱110", rating: "⭐ 4.4", desc: "Pares served with garlic rice and fried egg." }
      ]
    },
    milktea: {
      name: "Milkteahan with kwelahan",
      desc: "₱₱₱ • Milktea • 30-40 min",
      banner: "images/Milktea.jpg",
      menu: [
        { name: "Classic Milktea", price: "₱80", rating: "⭐ 4.6", desc: "Black tea with creamy milk blend." },
        { name: "Oreo Cheesecake", price: "₱100", rating: "⭐ 4.8", desc: "Sweet cheesecake flavor with Oreo bits." },
        { name: "Wintermelon Milktea", price: "₱90", rating: "⭐ 4.5", desc: "Refreshing wintermelon flavor with pearls." },
        { name: "Matcha Latte", price: "₱110", rating: "⭐ 4.7", desc: "Japanese matcha with creamy milk." }
      ]
    },
    pizzarap: {
      name: "Pizzarap",
      desc: "₱₱₱ • Pizza • 30-40 min",
      banner: "images/pizza.jpg",
      menu: [
        { name: "Pepperoni Pizza", price: "₱350", rating: "⭐ 4.7", desc: "Crispy crust topped with pepperoni slices." },
        { name: "Cheese Overload", price: "₱300", rating: "⭐ 4.5", desc: "Loaded with different kinds of cheese." },
        { name: "Hawaiian Pizza", price: "₱320", rating: "⭐ 4.4", desc: "Pineapple chunks with ham and cheese." },
        { name: "Meat Lovers", price: "₱380", rating: "⭐ 4.8", desc: "Packed with pepperoni, sausage, and bacon." }
      ]
    }
  };

  // Open modal on "Order Now"
  orderButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const storeKey = btn.dataset.store;
      const store = stores[storeKey];

      if (store) {
        document.getElementById("store-modal-name").textContent = store.name;
        document.getElementById("store-modal-desc").textContent = store.desc;
        document.getElementById("store-modal-banner").src = store.banner;

        const menuList = document.getElementById("store-menu-list");
        menuList.innerHTML = ""; // clear old items

        store.menu.forEach(item => {
          const card = document.createElement("div");
          card.classList.add("menu-card");
          card.innerHTML = `
            <div class="menu-info">
              <h4>${item.name}</h4>
              <p class="menu-price">${item.price}</p>
              <p class="menu-rating">${item.rating}</p>
              <p class="menu-desc">${item.desc}</p>
            </div>
            <div class="menu-actions">
              <button class="qty-btn">-</button>
              <span class="qty">1</span>
              <button class="qty-btn">+</button>
              <button class="add-to-cart">Add to Cart</button>
            </div>
          `;
          menuList.appendChild(card);

          // Quantity control
          const qtyDisplay = card.querySelector(".qty");
          const minusBtn = card.querySelectorAll(".qty-btn")[0];
          const plusBtn = card.querySelectorAll(".qty-btn")[1];

          minusBtn.addEventListener("click", () => {
            let current = parseInt(qtyDisplay.textContent);
            if (current > 1) qtyDisplay.textContent = current - 1;
          });

          plusBtn.addEventListener("click", () => {
            let current = parseInt(qtyDisplay.textContent);
            qtyDisplay.textContent = current + 1;
          });
        });

        // Show modal
        modal.classList.add("active");
      }
    });
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  // Close on outside click
  window.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
});

// ========================= END STORE MENU MODAL =========================

// ========================= CHATBOT (ALL PAGES) =========================
document.addEventListener("DOMContentLoaded", () => {
  const chatbotModal = document.querySelector(".chatbot-modal");
  const chatbotButton = document.querySelector("#chatbot-button");
  const chatbotClose = document.querySelector(".chatbot-close");
  const inputField = document.querySelector("#chatbot-input");
  const sendBtn = document.querySelector("#chatbot-send");
  const messagesContainer = document.querySelector(".chatbot-messages");

  // Toggle chatbot
  chatbotButton.addEventListener("click", () => {
    chatbotModal.style.display = "flex";
    chatbotButton.style.display = "none";
  });

  chatbotClose.addEventListener("click", () => {
    chatbotModal.style.display = "none";
    chatbotButton.style.display = "flex";
  });

  // Append messages
  function appendMessage(sender, text) {
    const msg = document.createElement("div");
    msg.classList.add(sender === "user" ? "user-message" : "bot-message");
    msg.innerHTML = text;
    messagesContainer.appendChild(msg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Bot responses
  function botResponse(userMsg) {
    const msg = userMsg.toLowerCase();

    if (msg.includes("hi") || msg.includes("hello")) {
      return "Hello 👋! How can I assist you today?";
    }
    if (msg.includes("order details")) {
      return "📦 You can check your order details in the 'My Orders' section.";
    }
    if (msg.includes("when") && msg.includes("arrive")) {
      return "⏱ Deliveries usually take 30–45 minutes depending on your location in Malolos.";
    }
    if (msg.includes("payment")) {
      return "💳 We accept GCash, Maya, COD (Cash on Delivery), and Debit/Credit Card.";
    }
    if (msg.includes("malolos") || msg.includes("area")) {
      return "🏙 We currently serve Malolos areas including Barasoain, Guinhawa, Mojon, Tikay, and Caniogan.";
    }
    if (msg.includes("track") || msg.includes("delivery")) {
      return "🚚 Please enter your tracking ID or check the 'Track Order' section in your account.";
    }

    return "🤔 I'm not sure about that, but I’ll try to help. Could you clarify?";
  }

  // Send message
  sendBtn.addEventListener("click", () => {
    const userMsg = inputField.value.trim();
    if (!userMsg) return;

    appendMessage("user", userMsg);
    inputField.value = "";

    setTimeout(() => {
      const reply = botResponse(userMsg);
      appendMessage("bot", reply);
    }, 500);
  });

  // Allow Enter key
  inputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendBtn.click();
    }
  });
});
