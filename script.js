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
const productCards = document.querySelectorAll(".product-card");

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
// =======================
// revisar esto de arriba, no funciona como debería, no se si es por el cambio de clases o algo, pero no filtra bien
// =======================


const menu = document.querySelector(".category-menu");
const toggle = document.querySelector(".menu-toggle");

// abrir / cerrar menú
toggle.addEventListener("click", (e) => {
  e.stopPropagation();
  menu.classList.toggle("open");
});

// cerrar al tocar afuera
document.addEventListener("click", () => {
  menu.classList.remove("open");
});

// cerrar al elegir categoría
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    menu.classList.remove("open");
  });
});