document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  document.querySelectorAll("img[data-lightbox]").forEach(img => {
    img.addEventListener("click", () => {
      const src = img.dataset.full || img.currentSrc || img.src;
      const alt = img.alt || "";

      lightboxImg.classList.replace("opacity-100", "opacity-0");
      lightboxImg.src = src;
      lightboxImg.alt = alt;
      lightbox.classList.remove("hidden");

      lightboxImg.onload = () => {
        requestAnimationFrame(() => {
          lightbox.classList.replace("opacity-0", "opacity-100");
          lightboxImg.classList.replace("opacity-0", "opacity-100");
        });
      };
    });
  });

  function closeLightbox() {
    lightbox.classList.replace("opacity-100", "opacity-0");
    lightboxImg.classList.replace("opacity-100", "opacity-0");
    setTimeout(() => {
      lightbox.classList.add("hidden");
      lightboxImg.src = "";
    }, 300);
  }

  lightbox.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !lightbox.classList.contains("hidden")) closeLightbox();
  });
});
