const modal = document.getElementById("productModal");
const closeBtn = document.querySelector(".close");

const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalSizes = document.getElementById("modalSizes");
const modalStock = document.getElementById("modalStock");
const modalDescription = document.getElementById("modalDescription");
const whatsappBtn = document.getElementById("whatsappBtn");

const PHONE_NUMBER = "5491158604956";

// =======================
// PRODUCT CARDS
// =======================
document.querySelectorAll(".product-card").forEach(card => {
  card.addEventListener("click", () => {

    const title = card.dataset.title;
    const price = card.dataset.price;
    const sizes = card.dataset.sizes;
    const stock = card.dataset.stock;
    const description = card.dataset.description;
    const img = card.dataset.img;

    modalImg.src = img;
    modalTitle.textContent = title;
    modalPrice.textContent = price;
    modalSizes.textContent = sizes;
    modalStock.textContent = stock;
    modalDescription.textContent = description;

    const message = `
Hola! 👋
Quiero comprar:

🧢 Producto: ${title}
💰 Precio: ${price}

Talle:
`;

    whatsappBtn.href = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message.trim())}`;

    modal.classList.add("show");
  });
});

// =======================
// CERRAR MODAL
// =======================
closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});

// =======================
// DROP CARDS (NO TOCO LÓGICA)
// =======================
const dropCards = document.querySelectorAll(".drop-card");
const overlay = document.getElementById("dropOverlay");

if (overlay) {
  dropCards.forEach(card => {
    card.addEventListener("click", () => {
      overlay.classList.add("active");
    });
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("active");
    }
  });
}

const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card, .drop-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    productCards.forEach(card => {
      if (filter === "all" || card.dataset.category === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

const menu = document.querySelector(".category-menu");
const toggle = document.querySelector(".menu-toggle");

toggle.addEventListener("click", (e) => {
  e.stopPropagation();

  const isOpen = menu.classList.toggle("open");
  toggle.classList.toggle("active", isOpen); // 👈 CLAVE

  playClickSound(isOpen ? "open" : "close");
});

document.addEventListener("click", () => {
  menu.classList.remove("open");
  toggle.classList.remove("active");
});

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playClickSound(type = "open") {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.type = "sine";
  osc.frequency.value = type === "open" ? 720 : 420;

  gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.06, audioCtx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.12);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.12);
}

document.querySelectorAll('.social-icon').forEach(icon => {
  let tapped = false;
  const instagramURL = "https://www.instagram.com/ll.clothestore/";

  icon.addEventListener('click', e => {
    // Desktop → navega normal
    if (window.matchMedia('(hover: hover)').matches) {
      window.open(instagramURL, '_blank');
      return;
    }

    // Mobile
    if (!tapped) {
      e.preventDefault();
      e.stopPropagation();

      icon.classList.add('show-tooltip');
      tapped = true;

      setTimeout(() => {
        icon.classList.remove('show-tooltip');
        tapped = false;
      }, 1800);
    } else {
      // Segundo tap → navegar
      window.location.href = instagramURL;
    }
  });
});

document.querySelectorAll('.payment-icon').forEach(icon => {
  let tapped = false;

  icon.addEventListener('click', e => {
    // Desktop → dejar pasar
    if (window.matchMedia('(hover: hover)').matches) return;

    // Mobile
    if (!tapped) {
      e.preventDefault(); // ⛔ evita que navegue
      icon.classList.add('show-tooltip');
      tapped = true;

      setTimeout(() => {
        icon.classList.remove('show-tooltip');
        tapped = false;
      }, 2000);
    }
    // Segundo tap → navega solo
  });
});

function filterShirtsByColor(color) {
  document.querySelectorAll(".product-card").forEach(card => {
    if (
      card.dataset.category === "remeras" &&
      card.dataset.color === color
    ) {
      card.classList.remove("hidden");
    } else{
      card.classList.add("hidden")
    }
    card.classList.remove("hidden");
    card.classList.add("hidden")
    
  });
}

const filterButton = document.querySelectorAll('.filter-btn[data-filter]');
const colorButtons = document.querySelectorAll('.color-btn');
const allFilterButtons = document.querySelectorAll('.filter-btn');

function removeActive() {
  allFilterButtons.forEach(btn => btn.classList.remove("active"));
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    removeActive();
    btn.classList.add("active");

    document.querySelectorAll(".product-card").forEach(card => {
      if (filter === "all" || card.dataset.category === filter) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });

    updateIndicator(filter);
  });
});

colorButtons.forEach(btn => {
  btn.addEventListener("click", e => {
    e.stopPropagation();
  
    const color = btn.dataset.color;

    removeActive();
    btn.classList.add("active");

    document.querySelectorAll(".product-card").forEach(card => {
      if (
  card.dataset.category === "remeras" &&
  card.dataset.color === color
)

    updateIndicator("Remeras", btn.textContent);
  });
});

document.querySelectorAll(".submenu-toggle").forEach(btn => {
  btn.addEventListener("click", e => {
    e.stopPropagation();
    btn.closest(".menu-item").classList.toggle("open");
  });
});

function updateIndicator(category, color = null) {
  const indicator = 
  document.getElementById("indicator-text");

  if (color) {
    indicator.textContent = " → " + color;
  } else {
    indicator.textContent = category;
  }
}