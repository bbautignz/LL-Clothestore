const modal = document.getElementById("productModal");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".product-card").forEach(card => {
  card.addEventListener("click", () => {
    document.getElementById("modalImg").src = card.dataset.img;
    document.getElementById("modalTitle").textContent = card.dataset.title;
    document.getElementById("modalPrice").textContent = card.dataset.price;
    document.getElementById("modalSizes").textContent = "Talles: " + card.dataset.sizes;
    document.getElementById("modalStock").textContent = "Stock: " + card.dataset.stock;
    document.getElementById("modalDescription").textContent = card.dataset.description;

    const phone = "5491158604956";
    const message = `Hola, estoy interesado en el producto: ${card.dataset.title} - Precio: ${card.dataset.price}.`;
    document.getElementById("whatsappBtn").href =
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    modal.classList.add("show");
  });
});

// cerrar con la X
closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});

// cerrar tocando el fondo
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});